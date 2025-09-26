'use server';

import { 
  generateContentIdeas,
  generateContentPlan,
  generateMarketingStrategy,
  refineContent,
  seoOptimizeContent,
  translateContent,
} from '@/ai';

import {
  BriefSchema,
  type AllContent,
  type Brief,
  type GenerateContentIdeasOutput,
  type GenerateContentPlanOutput,
  type GenerateMarketingStrategyOutput,
  type Project,
  type RefineContentInput,
  type RefineContentOutput,
  type SeoOptimizeContentInput,
  type SeoOptimizeContentOutput,
  type TranslateContentInput,
  type TranslateContentOutput,
} from './types';

import { checkGenerationLimit, saveNewProject, updateProject, getProjectById } from './db-actions';

async function generateAllContent(brief: Brief): Promise<AllContent> {
  const validatedBrief = BriefSchema.safeParse(brief);
  if (!validatedBrief.success) {
    console.error('Brief validation error:', validatedBrief.error.flatten());
    throw new Error(`Неверные данные брифа: ${validatedBrief.error.errors.map((e) => e.message).join(', ')}`);
  }

  const { productName, productDescription, goal, region, platforms, category, toneOfVoice, keywords } = validatedBrief.data;
  const businessDescription = `Продукт: ${productName}. Описание: ${productDescription}. Категория: ${category}. Регион: ${region}`;
  const targetAudience = `Пользователи в ${region}, заинтересованные в ${category}.`;
  const marketingGoals = `Цель: ${goal}. Платформы: ${platforms.join(', ')}.`;

  let strategy: GenerateMarketingStrategyOutput;
  try {
    strategy = await generateMarketingStrategy({ businessDescription, targetAudience, marketingGoals, toneOfVoice, keywords });
  } catch (error) {
    console.error('Error generating marketing strategy:', error);
    throw new Error('Не удалось сгенерировать маркетинговую стратегию.');
  }

  const strategyForNextSteps = {
    targetAudienceAnalysis: strategy.targetAudienceAnalysis,
    keyMessage: strategy.keyMessage,
    platformSuggestions: strategy.platformSuggestions,
  };

  try {
    const [social, contentPlan] = await Promise.all([
      generateContentIdeas({ strategy: strategyForNextSteps, format: 'Instagram Post', toneOfVoice, keywords }),
      generateContentPlan({ strategy: strategyForNextSteps, toneOfVoice, keywords }),
    ]);
    return { strategy, social, contentPlan };
  } catch (error) {
    console.error('Error generating content ideas or plan:', error);
    throw new Error('Не удалось сгенерировать контент-план или идеи.');
  }
}


export async function generateInitialContent(brief: Brief, userId: string, isPro: boolean): Promise<{ content: AllContent; projectId: string }> {
  if (!userId) throw new Error('User is not authenticated.');
  await checkGenerationLimit(userId, isPro);
  const generatedContent = await generateAllContent(brief);
  const newProjectId = await saveNewProject(userId, brief, generatedContent);
  return { content: generatedContent, projectId: newProjectId };
}

export async function updateProjectAction(projectId: string, brief: Brief, userId: string): Promise<Project> {
  if (!userId) throw new Error('User is not authenticated.');
  const projectToUpdate = await getProjectById(projectId);
  if (projectToUpdate?.userId !== userId) {
    throw new Error("You don't have permission to edit this project.");
  }

  const generatedContent = await generateAllContent(brief);
  const updatedProject = await updateProject(projectId, brief, generatedContent);
  return updatedProject;
}

export async function generateContentIdeasAction(brief: Brief, format: 'Instagram Post' | 'Blog Post' | 'Video Idea'): Promise<GenerateContentIdeasOutput> {
  const { productName, productDescription, goal, region, category, toneOfVoice, keywords, platforms } = brief;
  const businessDescription = `Продукт: ${productName}. Описание: ${productDescription}. Категория: ${category}. Регион: ${region}`;
  const targetAudience = `Пользователи в ${region}, заинтересованные в ${category}.`;
  const marketingGoals = `Цель: ${goal}. Платформы: ${platforms.join(', ')}.`;
  
  const strategy = await generateMarketingStrategy({ businessDescription, targetAudience, marketingGoals, toneOfVoice, keywords });
  return generateContentIdeas({
      strategy: {
          targetAudienceAnalysis: strategy.targetAudienceAnalysis,
          keyMessage: strategy.keyMessage,
          platformSuggestions: strategy.platformSuggestions,
      },
      format,
      toneOfVoice,
      keywords,
  });
}

export async function refineContentAction(input: RefineContentInput): Promise<RefineContentOutput> {
  return refineContent(input);
}

export async function translateContentAction(input: TranslateContentInput): Promise<TranslateContentOutput> {
  const { content, targetLanguage } = input;
  const ISO6391 = require('iso-639-1');
  const languageName = ISO6391.getName(targetLanguage);
  if (!languageName) {
    console.warn(`Invalid language code: ${targetLanguage}, returning original content.`);
    return { translatedContent: content };
  }
  const flowInput = { content, targetLanguage: languageName };
  const result = await translateContent(flowInput);
  
  if (typeof result === 'object' && result !== null && 'translatedContent' in result) {
      return result;
  }
  
  return { translatedContent: result as unknown as string };
}


export async function seoOptimizeContentAction(input: SeoOptimizeContentInput): Promise<SeoOptimizeContentOutput> {
  return seoOptimizeContent(input);
}
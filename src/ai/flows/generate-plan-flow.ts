'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { GenerateContentPlanOutput } from '@/lib/types';

const generateContentPlanFlow = ai.defineFlow(
  { name: 'generateContentPlanFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input) => {
    const prompt = ai.definePrompt(
      {
        name: 'generateContentPlanPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are a creative social media manager. Based on the provided marketing strategy, generate a detailed 7-day content plan tailored for a RU/KZ audience. The tone of voice should be {{{toneOfVoice}}}.
        {{#if keywords}}The content must include the following keywords: {{{keywords}}}.{{/if}}
        For each day of the week, provide a theme, a content format (like Post, Story, Reel, etc.), and a concrete idea or draft.
        Marketing Strategy:
        - Target Audience: {{{strategy.targetAudienceAnalysis}}}
        - Key Message: {{{strategy.keyMessage}}}
        - Suggested Platforms: {{{strategy.platformSuggestions}}}
        Tone of Voice: {{{toneOfVoice}}}
        Generate a plan for 7 days.`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return a content plan.');
    return output as GenerateContentPlanOutput;
  }
);

export async function generateContentPlan(input: any): Promise<GenerateContentPlanOutput> {
    return generateContentPlanFlow(input);
}

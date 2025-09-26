import { z } from 'zod';

export const BriefSchema = z.object({
  productName: z
    .string({ required_error: 'Пожалуйста, введите название продукта.' })
    .min(2, { message: 'Название продукта должно содержать не менее 2 символов.' }),
  productDescription: z
    .string({ required_error: 'Пожалуйста, предоставьте описание.' })
    .min(10, { message: 'Описание должно содержать не менее 10 символов.' })
    .max(200, { message: 'Описание не должно превышать 200 символов.' }),
  category: z.string({ required_error: 'Пожалуйста, выберите категорию.' }),
  price: z.string().optional(),
  region: z
    .string()
    .min(2, { message: 'Регион должен содержать не менее 2 символов.' }),
  goal: z.enum(['traffic', 'leads', 'brand']),
  platforms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Вы должны выбрать хотя бы одну платформу.',
  }),
  toneOfVoice: z.string({
    required_error: 'Пожалуйста, выберите тон голоса.',
  }),
  keywords: z.string().optional(),
});

export type Brief = z.infer<typeof BriefSchema>;

export interface GenerateMarketingStrategyOutput {
  targetAudienceAnalysis: string;
  keyMessage: string;
  platformSuggestions: string;
  specialAccommodations?: string;
}

export interface GenerateContentIdeasOutput {
  content: string;
}

export interface DailyContent {
  day: number;
  theme: string;
  format: string;
  idea: string;
}

export interface GenerateContentPlanOutput {
  contentPlan: DailyContent[];
}

export type AllContent = {
  strategy: GenerateMarketingStrategyOutput;
  social: GenerateContentIdeasOutput;
  contentPlan: GenerateContentPlanOutput;
};

export interface Project {
  id: string;
  userId: string;
  createdAt: string; 
  brief: Brief;
  content: AllContent;
}

export interface RefineContentInput {
  originalContent: string;
  instruction: string;
}
export interface RefineContentOutput {
  refinedContent: string;
}

export interface TranslateContentInput {
  content: string;
  targetLanguage: string;
}
export interface TranslateContentOutput {
  translatedContent: string;
}

export interface SeoOptimizeContentInput {
  originalContent: string;
  keywords: string;
}
export interface SeoOptimizeContentOutput {
  optimizedContent: string;
}

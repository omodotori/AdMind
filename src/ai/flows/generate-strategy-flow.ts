'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { GenerateMarketingStrategyOutput } from '@/lib/types';

const generateMarketingStrategyFlow = ai.defineFlow(
  { name: 'generateMarketingStrategyFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input) => {
    const prompt = ai.definePrompt(
      {
        name: 'generateMarketingStrategyPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are an expert marketing strategist. Based on the following information, generate a comprehensive marketing strategy. The tone of voice should be {{{toneOfVoice}}}.
        {{#if keywords}}The content must include the following keywords: {{{keywords}}}.{{/if}}
        Business Description: {{{businessDescription}}}
        Target Audience: {{{targetAudience}}}
        Marketing Goals: {{{marketingGoals}}}
        Tone of Voice: {{{toneOfVoice}}}
        The response should contain target audience analysis, a key message, platform suggestions, and any special accomodations.`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return a marketing strategy.');
    return output as GenerateMarketingStrategyOutput;
  }
);

export async function generateMarketingStrategy(input: any): Promise<GenerateMarketingStrategyOutput> {
    return generateMarketingStrategyFlow(input);
}

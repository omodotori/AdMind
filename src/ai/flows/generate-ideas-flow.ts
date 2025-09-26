'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { GenerateContentIdeasOutput } from '@/lib/types';

const generateContentIdeasFlow = ai.defineFlow(
  { name: 'generateContentIdeasFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input) => {
    const prompt = ai.definePrompt(
      {
        name: 'generateContentIdeasPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are a creative content marketing expert specializing in creating content for RU/KZ audiences. Based on the provided marketing strategy, generate an engaging and relevant content idea for the specified format. The tone of voice should be {{{toneOfVoice}}}.
        {{#if keywords}}The content must include the following keywords: {{{keywords}}}.{{/if}}
        Marketing Strategy:
        - Target Audience: {{{strategy.targetAudienceAnalysis}}}
        - Key Message: {{{strategy.keyMessage}}}
        - Suggested Platforms: {{{strategy.platformSuggestions}}}
        Format: {{{format}}}
        Tone of Voice: {{{toneOfVoice}}}
        Generate the content for the post.`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return content ideas.');
    return output as GenerateContentIdeasOutput;
  }
);

export async function generateContentIdeas(input: any): Promise<GenerateContentIdeasOutput> {
    return generateContentIdeasFlow(input);
}

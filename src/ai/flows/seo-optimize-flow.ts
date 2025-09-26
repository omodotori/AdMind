'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { SeoOptimizeContentOutput, SeoOptimizeContentInput } from '@/lib/types';

const seoOptimizeContentFlow = ai.defineFlow(
  { name: 'seoOptimizeContentFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input: SeoOptimizeContentInput) => {
    const prompt = ai.definePrompt(
      {
        name: 'seoOptimizeContentPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are an SEO expert. Your task is to rewrite the provided text to be optimized for the given keywords.
        Integrate the keywords naturally into the content. Ensure the text remains readable, engaging, and maintains its original meaning.
        Keywords: {{{keywords}}}
        Original Content:
        ---
        {{{originalContent}}}
        ---
        Optimized Content:`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return SEO optimized content.');
    return output as SeoOptimizeContentOutput;
  }
);

export async function seoOptimizeContent(input: SeoOptimizeContentInput): Promise<SeoOptimizeContentOutput> {
    return seoOptimizeContentFlow(input);
}

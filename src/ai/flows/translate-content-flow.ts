'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { TranslateContentOutput, TranslateContentInput } from '@/lib/types';

const translateContentFlow = ai.defineFlow(
  { name: 'translateContentFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input: TranslateContentInput) => {
    const prompt = ai.definePrompt(
      {
        name: 'translateContentPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are an expert translator. Your task is to translate the provided text into {{{targetLanguage}}}.
        If the language code is not recognized, just return the original text.
        Content to translate:
        ---
        {{{content}}}
        ---`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return translated content.');
    // The output from this prompt is a raw string, but our action expects an object.
    const result = { translatedContent: output as string };
    return result as TranslateContentOutput;
  }
);

export async function translateContent(input: TranslateContentInput): Promise<TranslateContentOutput> {
    return translateContentFlow(input);
}

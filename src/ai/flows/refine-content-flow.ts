'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { RefineContentOutput, RefineContentInput } from '@/lib/types';

const refineContentFlow = ai.defineFlow(
  { name: 'refineContentFlow', inputSchema: z.any(), outputSchema: z.any() },
  async (input: RefineContentInput) => {
    const prompt = ai.definePrompt(
      {
        name: 'refineContentPrompt',
        input: { schema: z.any() },
        output: { schema: z.any() },
        prompt: `You are an expert content editor. Your task is to refine the provided text based on the user's instruction.
        Instruction: {{{instruction}}}
        Original Content:
        ---
        {{{originalContent}}}
        ---
        Refined Content:`,
      }
    );
    const { output } = await prompt(input);
    if (!output) throw new Error('AI did not return refined content.');
    return output as RefineContentOutput;
  }
);

export async function refineContent(input: RefineContentInput): Promise<RefineContentOutput> {
    return refineContentFlow(input);
}

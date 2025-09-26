'use server';
/**
 * @fileoverview A simple flow for testing API connectivity.
 *
 * - testApi - A function that takes a query and returns a response from the AI.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});

const testApiFlow = ai.defineFlow(
  {
    name: 'testApiFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async ({ query }) => {
    const llmResponse = await ai.generate({
      prompt: query,
    });
    return { response: llmResponse.text };
  }
);

export async function testApi(input: {
  query: string;
}): Promise<{ response: string }> {
  return testApiFlow(input);
}

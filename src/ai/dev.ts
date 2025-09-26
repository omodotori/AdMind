'use server';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { firebase } from '@genkit-ai/firebase';

// Import flows
import '@/ai/flows/generate-strategy-flow';
import '@/ai/flows/generate-ideas-flow';
import '@/ai/flows/generate-plan-flow';
import '@/ai/flows/refine-content-flow';
import '@/ai/flows/translate-content-flow';
import '@/ai/flows/seo-optimize-flow';


export default genkit({
  plugins: [
    googleAI({ apiKey: process.env.GEMINI_API_KEY }),
    firebase(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

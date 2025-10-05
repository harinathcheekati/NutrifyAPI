import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyCgS1Vk2RDTG36IG3E1OWnv2v5Vhykxhi4",
    }),
  ],
  model: 'googleai/gemini-2.0-flash', // ✅ must include "googleai/" prefix
});

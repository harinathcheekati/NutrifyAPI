'use server';

/**
 * @fileOverview Estimates the calorie count of a food image.
 */

import { ai } from '@/ai/genkit';
import { model } from 'genkit/plugin';
import { z } from 'zod'; // Changed from 'genkit' to 'zod'

const EstimateCaloriesFromImageInputSchema = z.object({
  foodPhotoDataUri: z
    .string()
    .describe(
      "A photo of a food item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EstimateCaloriesFromImageInput = z.infer<
  typeof EstimateCaloriesFromImageInputSchema
>;

const EstimateCaloriesFromImageOutputSchema = z.object({
  estimatedCalories: z
    .number()
    .describe('The estimated calorie count of the food item.'),
  ingredients: z
    .array(z.string())
    .describe('The list of ingredients identified in the food item.'),
  protein: z.number().describe('The estimated protein in grams.'),
  carbs: z.number().describe('The estimated carbohydrates in grams.'),
  sugar: z.number().describe('The estimated sugar in grams.'),
  fiber: z.number().describe('The estimated fiber in grams.'),
  fat: z.number().describe('The estimated fat in grams.'),
  portion: z.string().describe('The estimated portion size in grams.'),
  quantity: z.number().describe('The estimated quantity of the item.'),
});
export type EstimateCaloriesFromImageOutput = z.infer<
  typeof EstimateCaloriesFromImageOutputSchema
>;

export async function estimateCaloriesFromImage(
  input: EstimateCaloriesFromImageInput
): Promise<EstimateCaloriesFromImageOutput> {
  return estimateCaloriesFromImageFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'estimateCaloriesFromImagePrompt',
    input: {
      schema: EstimateCaloriesFromImageInputSchema,
    },
    output: {
      format: 'json',
      schema: EstimateCaloriesFromImageOutputSchema,
    },
  },
  async (input) => {
    // Extract MIME type from data URI
    const mimeTypeMatch = input.foodPhotoDataUri.match(/^data:([^;]+);base64,/);
    const contentType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

    return {
      messages: [
        {
          role: 'user',
          content: [
            {
              text: `You are a nutrition expert. You will be given a photo of a food item.

You will identify the ingredients in the food item, and then estimate the calorie count and other nutritional information.
Return the following information in JSON format:
- estimatedCalories: number
- ingredients: array of strings
- protein: number (grams)
- carbs: number (grams)
- sugar: number (grams)
- fiber: number (grams)
- fat: number (grams)
- portion: string (portion size)
- quantity: number`,
            },
            {
              media: {
                url: input.foodPhotoDataUri,
                contentType: contentType,
              },
            },
          ],
        },
      ],
    };
  }
);

const estimateCaloriesFromImageFlow = ai.defineFlow(
  {
    name: 'estimateCaloriesFromImageFlow',
    inputSchema: EstimateCaloriesFromImageInputSchema,
    outputSchema: EstimateCaloriesFromImageOutputSchema,
  },
  async (input) => {
    const result = await prompt(input);
    if (!result || !result.output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return result.output;
  }
);

// ------------------------------
// OPTIONAL TESTING WITH SDK ONLY
// ------------------------------

// Uncomment if you want to check models directly without Genkit

/*
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  const result = await genAI.listModels();
  console.log(result);
}
listModels();
*/
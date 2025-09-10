'use server';

/**
 * @fileOverview Estimates the calorie count of a food image.
 *
 * - estimateCaloriesFromImage - A function that handles the calorie estimation process.
 * - EstimateCaloriesFromImageInput - The input type for the estimateCaloriesFromImage function.
 * - EstimateCaloriesFromImageOutput - The return type for the estimateCaloriesFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
    .string()
    .describe('The list of ingredients identified in the food item.'),
});
export type EstimateCaloriesFromImageOutput = z.infer<
  typeof EstimateCaloriesFromImageOutputSchema
>;

export async function estimateCaloriesFromImage(
  input: EstimateCaloriesFromImageInput
): Promise<EstimateCaloriesFromImageOutput> {
  return estimateCaloriesFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCaloriesFromImagePrompt',
  input: {schema: EstimateCaloriesFromImageInputSchema},
  output: {schema: EstimateCaloriesFromImageOutputSchema},
  prompt: `You are a nutrition expert. You will be given a photo of a food item.

    You will identify the ingredients in the food item, and then estimate the calorie count.
    Return the calorie count as a number, and list the ingredients.

    Photo: {{media url=foodPhotoDataUri}}

    Respond in JSON format.
    `,
});

const estimateCaloriesFromImageFlow = ai.defineFlow(
  {
    name: 'estimateCaloriesFromImageFlow',
    inputSchema: EstimateCaloriesFromImageInputSchema,
    outputSchema: EstimateCaloriesFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

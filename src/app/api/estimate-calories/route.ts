import { NextResponse } from 'next/server';
import { estimateCaloriesFromImage, type EstimateCaloriesFromImageInput } from '@/ai/flows/estimate-calories-from-image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * @swagger
 * /api/estimate-calories:
 *   post:
 *     summary: Estimate calories from a food image
 *     description: Takes a food image as a data URI and returns an estimated calorie count and a list of ingredients.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodPhotoDataUri:
 *                 type: string
 *                 description: "A photo of a food item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
 *     responses:
 *       200:
 *         description: Successful estimation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estimatedCalories:
 *                   type: number
 *                   description: The estimated calorie count of the food item.
 *                 ingredients:
 *                   type: string
 *                   description: The list of ingredients identified in the food item.
 *                 protein:
 *                   type: number
 *                   description: The estimated protein in grams.
 *                 carbs:
 *                   type: number
 *                   description: The estimated carbohydrates in grams.
 *                 sugar:
 *                   type: number
 *                   description: The estimated sugar in grams.
 *                 fiber:
 *                   type: number
 *                   description: The estimated fiber in grams.
 *                 fat:
 *                   type: number
 *                   description: The estimated fat in grams.
 *                 portion:
 *                   type: string
 *                   description: The estimated portion size in grams.
 *                 quantity:
 *                   type: number
 *                   description: The estimated quantity of the item.
 *       400:
 *         description: Bad Request, missing foodPhotoDataUri
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { foodPhotoDataUri } = body;

    if (!foodPhotoDataUri) {
      return NextResponse.json({ error: 'Missing foodPhotoDataUri' }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        } 
      });
    }

    const input: EstimateCaloriesFromImageInput = { foodPhotoDataUri };
    const result = await estimateCaloriesFromImage(input);

    try {
      await addDoc(collection(db, "estimations"), {
        ...result,
        imageUrl: foodPhotoDataUri,
        createdAt: serverTimestamp()
      });
    } catch (dbError) {
      console.error("Failed to write to Firestore:", dbError);
      // We don't want to fail the request if only the DB write fails
    }


    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

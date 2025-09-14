import { NextResponse } from 'next/server';
import { estimateCaloriesFromImage, type EstimateCaloriesFromImageInput } from '@/ai/flows/estimate-calories-from-image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * @swagger
 * /api/estimate-calories:
 *   post:
 *     summary: Estimate calories from a food image for a logged-in user
 *     description: Takes a food image as a data URI and a userId, returns an estimated calorie count, and saves it to the user's history.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodPhotoDataUri:
 *                 type: string
 *                 description: "A photo of a food item, as a data URI."
 *               userId:
 *                 type: string
 *                 description: "The ID of the logged-in user."
 *     responses:
 *       200:
 *         description: Successful estimation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EstimationResult'
 *       400:
 *         description: Bad Request, missing required fields
 *       500:
 *         description: Internal Server Error
 * components:
 *   schemas:
 *     EstimationResult:
 *       type: object
 *       properties:
 *         estimatedCalories:
 *           type: number
 *         ingredients:
 *           type: string
 *         protein:
 *           type: number
 *         carbs:
 *           type: number
 *         sugar:
 *           type: number
 *         fiber:
 *           type: number
 *         fat:
 *           type: number
 *         portion:
 *           type: string
 *         quantity:
 *           type: number
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { foodPhotoDataUri, userId } = body;

    if (!foodPhotoDataUri || !userId) {
      return NextResponse.json({ error: 'Missing foodPhotoDataUri or userId' }, { 
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
        userId: userId,
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

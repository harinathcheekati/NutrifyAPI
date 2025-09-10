import { NextResponse } from 'next/server';
import { estimateCaloriesFromImage, type EstimateCaloriesFromImageInput } from '@/ai/flows/estimate-calories-from-image';

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

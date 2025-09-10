import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CalorieEye API',
      version: '1.0.0',
      description: 'API for estimating calories from food images.',
    },
    servers: [
      {
        url: '/',
      },
    ],
  },
  apis: ['./src/app/api/estimate-calories/route.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export async function GET() {
  return NextResponse.json(swaggerSpec);
}

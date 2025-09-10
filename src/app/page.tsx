import { CalorieEstimator } from '@/components/calorie-estimator';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center bg-primary/20 p-3 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            CalorieEye API
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            A demonstration of the AI-powered calorie estimation API. Upload a food image to see it in action.
          </p>
        </header>
        <main>
          <CalorieEstimator />
        </main>
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Integrate with your mobile app via the POST endpoint at <code className="font-code bg-muted p-1 rounded-md">/api/estimate-calories</code>. Check out the <Link href="/api-docs" className="underline text-primary">API Documentation</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}

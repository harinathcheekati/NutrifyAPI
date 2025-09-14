"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CalorieEstimator } from '@/components/calorie-estimator';
import { Leaf, History, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';

export default function Home() {
  const { user, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="inline-flex items-center justify-center bg-primary/20 p-3 rounded-full">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
             <div className="flex items-center gap-2">
               <Link href="/history">
                <Button variant="outline" size="icon">
                  <History className="h-6 w-6" />
                  <span className="sr-only">History</span>
                </Button>
              </Link>
              <Button variant="outline" size="icon" onClick={logout}>
                <LogOut className="h-6 w-6" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            CalorieEye
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Welcome, {user.email}! Upload a food image to estimate its calories.
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

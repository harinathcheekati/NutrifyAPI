"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, Flame, Carrot, UtensilsCrossed } from 'lucide-react';

type EstimationResult = {
  estimatedCalories: number;
  ingredients: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function CalorieEstimator() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image to estimate calories.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const response = await fetch('/api/estimate-calories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ foodPhotoDataUri: base64data }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to estimate calories.');
        }

        setResult(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Upload Food Image</CardTitle>
          <CardDescription>Select or drop an image of your meal below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50 transition-colors">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Selected food" width={256} height={256} className="object-contain h-full w-full p-2 rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or JPEG (MAX. 5MB)</p>
                  </div>
                )}
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/png, image/jpeg, image/jpg" ref={fileInputRef} />
              </label>
            </div>
            <Button type="submit" className="w-full mt-4" disabled={!imageFile || isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Flame className="mr-2 h-4 w-4" />}
              Estimate Calories
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>AI-powered nutrition insights.</CardDescription>
        </CardHeader>
        <CardContent className="h-[340px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Analyzing your meal...</p>
            </div>
          ) : result ? (
            <div className="space-y-6 w-full animate-in fade-in duration-500">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Estimated Calories</p>
                <div className="flex items-baseline justify-center gap-2 mt-1">
                  <Flame className="w-8 h-8 text-accent" />
                  <span className="text-6xl font-bold">{result.estimatedCalories}</span>
                  <span className="text-xl text-muted-foreground">kcal</span>
                </div>
              </div>
              <div className="space-y-2">
                 <h3 className="flex items-center gap-2 font-semibold"><Carrot className="w-5 h-5 text-primary" /> Ingredients</h3>
                 <p className="text-sm text-foreground font-code bg-muted/50 p-3 rounded-md max-h-32 overflow-y-auto">{result.ingredients}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <UtensilsCrossed className="w-12 h-12 mb-4" />
              <p>Your calorie estimation will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

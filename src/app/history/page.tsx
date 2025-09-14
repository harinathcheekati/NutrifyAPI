"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, RefreshCw, Flame, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type EstimationHistoryItem = {
  id: string;
  estimatedCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  imageUrl: string;
  createdAt: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<EstimationHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/history");
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description:
          error instanceof Error ? error.message : "Could not fetch history.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold">
                Estimation History
              </h1>
              <p className="text-muted-foreground">
                Your past 50 calorie estimations.
              </p>
            </div>
          </div>
          <Button onClick={fetchHistory} disabled={isLoading} variant="outline">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </header>

        <main>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>
                Browse through your previously analyzed meals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <UtensilsCrossed className="w-12 h-12 mb-4" />
                    <p>No history found.</p>
                    <p className="text-sm">Go back to the homepage to estimate your first meal.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Calories (kcal)</TableHead>
                        <TableHead className="text-right">Protein (g)</TableHead>
                        <TableHead className="text-right">Carbs (g)</TableHead>
                        <TableHead className="text-right">Fat (g)</TableHead>
                        <TableHead className="text-right">Portion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Image
                              src={item.imageUrl}
                              alt="Food item"
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.createdAt ? format(new Date(item.createdAt), "PPpp") : 'N/A'}
                          </TableCell>
                           <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2 font-bold">
                               <Flame className="w-4 h-4 text-accent" />
                               {item.estimatedCalories}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.protein?.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.carbs?.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.fat?.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.portion}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

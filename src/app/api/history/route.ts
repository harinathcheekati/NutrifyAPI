import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export async function GET() {
  try {
    const estimationsRef = collection(db, "estimations");
    const q = query(estimationsRef, orderBy("createdAt", "desc"), limit(50));
    
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore timestamp needs to be converted for JSON serialization
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
      };
    });

    return NextResponse.json(history, {
      headers: {
        'Cache-Control': 'no-store', // Ensure fresh data on every request
      },
    });

  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error }, { status: 500 });
  }
}

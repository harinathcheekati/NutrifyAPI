import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const estimationsRef = collection(db, "estimations");
    const q = query(
        estimationsRef, 
        where("userId", "==", userId), 
        orderBy("createdAt", "desc"), 
        limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || null,
      };
    });

    return NextResponse.json(history, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });

  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ error }, { status: 500 });
  }
}

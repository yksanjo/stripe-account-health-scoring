import { NextResponse } from 'next/server';
import { calculateHealthScore } from '@/lib/scoreCalculator';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const score = await calculateHealthScore(days);
    return NextResponse.json(score);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


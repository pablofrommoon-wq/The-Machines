import { NextResponse } from 'next/server';

// This endpoint is deprecated - use /api/attempts instead
export async function GET() {
  return NextResponse.json([]);
}
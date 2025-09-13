import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({ ok: hasKey });
}
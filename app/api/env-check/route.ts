import { NextResponse } from 'next/server';

// Development-only endpoint to check environment variables
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    apiKeyStatus: {
      present: !!apiKey,
      isPlaceholder: apiKey === 'your_openai_api_key_here' || apiKey === '',
      preview: apiKey ? `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}` : 'None',
      length: apiKey ? apiKey.length : 0
    },
    timestamp: new Date().toISOString()
  });
}</parameter>
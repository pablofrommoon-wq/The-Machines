import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface AttemptEntry {
  id: string;
  wallet_address: string;
  prompt: string;
  ai_response: string;
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED';
  created_at: string;
}

// File path for storing challenge log
const CHALLENGE_LOG_PATH = path.join(process.cwd(), 'challenge_log.json');

// Read challenge log
const readChallengeLog = async (): Promise<AttemptEntry[]> => {
  try {
    const data = await fs.readFile(CHALLENGE_LOG_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export async function GET() {
  try {
    // Read from challenge log file
    const attempts = await readChallengeLog();
    
    // Return only the last 10 attempts
    const recentAttempts = attempts.slice(0, 10);

    return NextResponse.json(recentAttempts);
  } catch (error) {
    console.error('Attempts API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attempts' },
      { status: 500 }
    );
  }
}
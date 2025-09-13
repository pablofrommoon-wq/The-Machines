import { NextResponse } from 'next/server';
import type { ChallengeStatus } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

// File path for storing challenge log
const CHALLENGE_LOG_PATH = path.join(process.cwd(), 'challenge_log.json');

// Read challenge log to get real stats
const readChallengeLog = async () => {
  try {
    const data = await fs.readFile(CHALLENGE_LOG_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export async function GET() {
  try {
    // Get real data from challenge log
    const attempts = await readChallengeLog();
    const totalAttempts = attempts.length;
    const playersEscaped = attempts.filter((attempt: any) => attempt.result === 'ACCESS_PERMITTED').length;
    
    const status: ChallengeStatus = {
      prizePool: '1,337 SOL',
      totalAttempts,
      playersEscaped,
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Status API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    );
  }
}
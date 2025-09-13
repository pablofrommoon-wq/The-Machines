import { NextResponse } from 'next/server';

export interface LandingStats {
  prizePool: {
    sol: number;
    usd: number;
  };
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  challengeDay: number;
  totalParticipants: number;
}

export async function GET() {
  try {
    // Mock landing page stats
    const stats: LandingStats = {
      prizePool: {
        sol: 1337,
        usd: 180000,
      },
      timeLeft: {
        hours: 6,
        minutes: 0,
        seconds: 0,
      },
      challengeDay: 1,
      totalParticipants: 2847,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Landing stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch landing stats' },
      { status: 500 }
    );
  }
}
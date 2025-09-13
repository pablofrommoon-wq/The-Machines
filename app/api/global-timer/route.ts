import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Force dynamic rendering for this API route
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// File path for storing global timer data
const TIMER_FILE_PATH = path.join(process.cwd(), 'global_timer.json');

// Initialize timer file if it doesn't exist
const initializeTimerFile = async () => {
  try {
    await fs.access(TIMER_FILE_PATH);
  } catch {
    try {
      const initialData = {
        challengeEnd: Date.now() + 6 * 60 * 60 * 1000, // 6 hours from now
        nextEnd: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      };
      await fs.writeFile(TIMER_FILE_PATH, JSON.stringify(initialData, null, 2));
    } catch (writeError) {
      console.error('Failed to initialize timer file:', writeError);
      throw writeError;
    }
  }
};

// Read timer data
const readTimerData = async () => {
  try {
    await initializeTimerFile();
    const data = await fs.readFile(TIMER_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read timer data:', error);
    // Return default values if file is corrupted
    return {
      challengeEnd: Date.now() + 6 * 60 * 60 * 1000,
      nextEnd: Date.now() + 24 * 60 * 60 * 1000,
    };
  }
};

// Write timer data
const writeTimerData = async (data: any) => {
  try {
    await fs.writeFile(TIMER_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to write timer data:', error);
  }
};

export async function GET() {
  try {
    const timerData = await readTimerData();
    const now = Date.now();
    
    const challengeRemainingMs = Math.max(0, timerData.challengeEnd - now);
    const nextRemainingMs = Math.max(0, timerData.nextEnd - now);
    
    return NextResponse.json({
      challengeRemainingMs,
      nextRemainingMs,
    });
  } catch (error) {
    console.error('Global timer GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timer data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { challengeHours, nextHours } = await request.json();
    
    if (typeof challengeHours !== 'number' || typeof nextHours !== 'number') {
      return NextResponse.json(
        { error: 'challengeHours and nextHours must be numbers' },
        { status: 400 }
      );
    }
    
    const now = Date.now();
    const timerData = {
      challengeEnd: now + challengeHours * 60 * 60 * 1000,
      nextEnd: now + nextHours * 60 * 60 * 1000,
    };
    
    await writeTimerData(timerData);
    
    return NextResponse.json({
      success: true,
      challengeRemainingMs: challengeHours * 60 * 60 * 1000,
      nextRemainingMs: nextHours * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error('Global timer POST error:', error);
    return NextResponse.json(
      { error: 'Failed to set timer data' },
      { status: 500 }
    );
  }
}
// Shared types for the Matrix Challenge application
export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  walletAddress: string;
  attemptCount: number;
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED';
  timestamp: Date;
}

export interface AttemptEntry {
  id: string;
  wallet_address: string;
  prompt: string;
  ai_response: string;
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED';
  created_at: string;
}

export interface ChallengeStatus {
  prizePool: string;
  totalAttempts: number;
  playersEscaped: number;
}

export interface ChatAttempt {
  message: string;
  walletAddress?: string;
}

export interface ChatResponse {
  response: string;
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED';
}
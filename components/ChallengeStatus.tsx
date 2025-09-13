'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { DollarSign, Clock, Target, Users } from 'lucide-react';
import type { ChallengeStatus } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChallengeStatus() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 0,
    seconds: 0,
  });

  // Fetch challenge status data
  const { data: status, error } = useSWR<ChallengeStatus>(
    '/api/status',
    fetcher,
    { refreshInterval: 2000 } // Refresh every 2 seconds for real-time updates
  );

  // Fetch global timer data
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch('/api/global-timer');
        const data = await response.json();
        
        if (data.challengeRemainingMs) {
          const totalSeconds = Math.floor(data.challengeRemainingMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          
          setTimeLeft({ hours, minutes, seconds });
        }
      } catch (error) {
        console.error('Failed to fetch global timer:', error);
      }
    };

    // Fetch immediately and then every second
    fetchTimer();
    const timer = setInterval(fetchTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="bg-black/50 border border-red-500/50 rounded-lg p-4">
        <div className="text-red-400 font-mono text-sm text-center">
          [ERROR: STATUS_OFFLINE]
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="bg-black/50 border border-green-500/30 rounded-lg p-4">
        <div className="text-green-400/50 font-mono text-sm text-center">
          [LOADING_STATUS...]
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 space-y-4">
      <div className="text-center pb-3 border-b border-green-500/30">
        <h3 className="text-green-400 font-mono text-sm font-bold glitch">
          [MATRIX_STATUS]
        </h3>
      </div>

      <div className="space-y-3">
        {/* Prize Pool */}
        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-xs">PRIZE POOL</span>
          </div>
          <div className="text-green-300 font-mono text-lg font-bold">
            {status.prizePool}
          </div>
        </div>

        {/* Time Remaining */}
        <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-mono text-xs">TIME LEFT</span>
          </div>
          <div className="text-red-300 font-mono text-lg font-bold">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Challenge Attempts */}
        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-xs">ATTEMPTS</span>
          </div>
          <div className="text-green-300 font-mono text-lg font-bold">
            {status.totalAttempts}
          </div>
        </div>

        {/* Players Granted Access */}
        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-xs">ESCAPED</span>
          </div>
          <div className="text-green-300 font-mono text-lg font-bold">
            {status.playersEscaped}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-green-500/30">
        <div className="text-green-400/50 font-mono text-xs text-center">
          [STATUS_LIVE] - [AUTO_REFRESH: 2s]
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { MessageSquare, User, Clock, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface AttemptEntry {
  id: string;
  wallet_address: string;
  prompt: string;
  ai_response: string;
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED';
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Leaderboard() {
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  
  const { data: attempts, error } = useSWR<AttemptEntry[]>(
    '/api/attempts',
    fetcher,
    { refreshInterval: 2000 } // Refresh every 2 seconds for real-time updates
  );

  const formatAddress = (address: string) => {
    if (address === 'anonymous') return 'anonymous';
    if (address.length > 20) {
      return `${address.slice(0, 4)}...${address.slice(-3)}`;
    }
    return address;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return time.toLocaleDateString();
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedEntries(newExpanded);
  };

  const getResultIcon = (result: string) => {
    return result === 'ACCESS_PERMITTED' ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    );
  };

  const getResultColor = (result: string) => {
    return result === 'ACCESS_PERMITTED' ? 'text-green-400' : 'text-red-400';
  };

  const truncateText = (text: string) => {
    if (text.length > 100) {
      return text.slice(0, 100) + '...';
    }
    return text;
  };

  if (error) {
    return (
      <div className="bg-black/50 border border-red-500/50 rounded-lg p-4">
        <div className="text-red-400 font-mono text-sm text-center">
          [ERROR: CHALLENGE_LOG_OFFLINE]
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 w-full">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-green-500/30">
        <MessageSquare className="w-5 h-5 text-green-400" />
        <h3 className="text-green-400 font-mono text-sm font-bold">
          [CHALLENGE_LOG]
        </h3>
        <div className="ml-auto text-green-400/70 font-mono text-xs">
          LAST 10 ATTEMPTS
        </div>
      </div>

      <div className="space-y-1 scrollbar-thin overflow-y-auto max-h-96">
        {!attempts ? (
          <div className="text-center text-green-400/50 font-mono text-xs">
            [LOADING_MATRIX_DATA...]
          </div>
        ) : attempts.length === 0 ? (
          <div className="text-center text-green-400/50 font-mono text-xs">
            [NO_ATTEMPTS_LOGGED]
          </div>
        ) : (
          attempts.map((attempt, index) => {
            const isExpanded = expandedEntries.has(attempt.id);
            const needsExpansion = attempt.prompt.length > 100 || attempt.ai_response.length > 100;
            
            return (
              <div
                key={attempt.id}
                className="bg-green-900/10 border border-green-500/20 rounded hover:border-green-500/50 transition-all duration-200 cursor-pointer"
                onClick={() => toggleExpanded(attempt.id)}
              >
                {/* Compact Header Row */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-1 min-w-0 flex-1">
                      <User className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="font-mono text-xs text-green-300 truncate">
                        {formatAddress(attempt.wallet_address)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-green-400/70" />
                      <span className="text-green-400/70 font-mono text-xs whitespace-nowrap">
                        {formatTimeAgo(attempt.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2">
                    {getResultIcon(attempt.result)}
                    <ChevronDown className={`w-3 h-3 text-green-400/70 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-green-500/20 mt-0">
                    {/* Prompt */}
                    <div className="mt-3 mb-3">
                      <div className="text-blue-300 font-mono text-xs mb-2 font-bold">
                        [PLAYER_PROMPT]:
                      </div>
                      <div className="text-green-300 font-mono text-xs bg-black/30 p-3 rounded border border-green-500/20 leading-relaxed">
                        {attempt.prompt}
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="mb-2">
                      <div className="text-red-300 font-mono text-xs mb-2 font-bold">
                        [AI_RESPONSE]:
                      </div>
                      <div className={`font-mono text-xs bg-black/30 p-3 rounded border border-red-500/20 leading-relaxed ${getResultColor(attempt.result)}`}>
                        {attempt.ai_response}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-2 border-t border-green-500/30">
        <div className="text-green-400/70 font-mono text-xs text-center">
          [AUTO_REFRESH: 2s] - [CLICK_TO_EXPAND] - [TRANSPARENCY_MODE: ACTIVE]
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Header from '@/components/landing/Header';
import ChatBot from '@/components/ChatBot';
import VideoTrigger from '@/components/VideoTrigger';
import WalletConnection from '@/components/WalletConnection';
import ChallengeStatus from '@/components/ChallengeStatus';
import Leaderboard from '@/components/Leaderboard';

export default function ChallengePage() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<'ACCESS_DENIED' | 'ACCESS_PERMITTED' | null>(null);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleWalletDisconnect = () => {
    setWalletAddress('');
  };

  const handleChatResponse = (result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED') => {
    setCurrentResult(result);
  };

  const handleNewAttempt = () => {
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen matrix-bg relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Matrix Rain Effect */}
      <div className="matrix-rain" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-green-400 mb-2 glitch">
            ESCAPE THE MATRIX
          </h1>
          <h2 className="text-xl md:text-2xl font-mono text-green-300 mb-4">
            CHALLENGE 1
          </h2>
          <div className="text-sm text-green-400/70 font-mono">
            [SYSTEM_INITIALIZED] - [SECURITY_LEVEL: MAXIMUM]
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Left Sidebar - Wallet & Status */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black/30 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-green-400 font-mono text-sm font-bold mb-4 flex items-center gap-2">
                [WALLET_VERIFICATION]
              </h3>
              <WalletConnection
                onWalletConnect={handleWalletConnect}
                onWalletDisconnect={handleWalletDisconnect}
              />
              
              {walletAddress && (
                <div className="mt-4 p-3 bg-green-900/10 border border-green-500/30 rounded">
                  <div className="text-green-400 font-mono text-xs mb-2">
                    [STATUS: VERIFIED]
                  </div>
                  <div className="text-green-300 font-mono text-xs">
                    You can now challenge The Machine
                  </div>
                </div>
              )}
            </div>
            
            <ChallengeStatus />
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-6 min-h-[600px]">
            <div className="bg-black/30 border border-green-500/30 rounded-lg p-6">
              {/* Video Trigger */}
              <VideoTrigger result={currentResult} />
              
              {/* Chat Interface */}
              <div className="flex-1">
                <ChatBot
                  walletAddress={walletAddress}
                  onResponse={handleChatResponse}
                  onNewAttempt={handleNewAttempt}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Leaderboard */}
          <div className="lg:col-span-3">
            <Leaderboard />
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-green-500/20">
          <div className="text-green-400/50 font-mono text-xs">
            [THE_MACHINES_PROTOCOL_v2.1.0] - [UPTIME: 99.99%]
          </div>
          <div className="text-green-400/30 font-mono text-xs mt-1">
            "There is no spoon."
          </div>
        </footer>
      </div>
    </div>
  );
}
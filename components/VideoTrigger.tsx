'use client';

import { useEffect, useState } from 'react';

interface VideoTriggerProps {
  result: 'ACCESS_DENIED' | 'ACCESS_PERMITTED' | null;
}

export default function VideoTrigger({ result }: VideoTriggerProps) {
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [showResult, setShowResult] = useState<'ACCESS_DENIED' | 'ACCESS_PERMITTED' | null>(null);

  useEffect(() => {
    if (result === 'ACCESS_PERMITTED') {
      setCurrentVideo('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif'); // Winner GIF
      setShowResult('ACCESS_PERMITTED');
    } else if (result === 'ACCESS_DENIED') {
      setCurrentVideo('https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif'); // Loser GIF
      setShowResult('ACCESS_DENIED');
    }
  }, [result]);

  // Reset when a new attempt starts (result becomes null)
  useEffect(() => {
    if (result === null && showResult) {
      setCurrentVideo('');
      setShowResult(null);
    }
  }, [result, showResult]);

  if (!showResult || !currentVideo) {
    return (
      <div className="h-32 bg-black/50 border-2 border-green-500/30 rounded flex items-center justify-center mb-6">
        <div className="text-green-400/50 font-mono text-sm">
          [VIDEO_BUFFER_READY]
        </div>
      </div>
    );
  }

  return (
    <div className="h-32 bg-black border-2 border-green-500 rounded overflow-hidden mb-6 neon-glow relative">
      <img 
        src={currentVideo}
        alt={showResult === 'ACCESS_PERMITTED' ? 'Victory' : 'Defeat'}
        className="w-full h-full object-cover"
      />
      
      {/* Result Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className={`text-4xl font-mono font-bold ${
          showResult === 'ACCESS_PERMITTED' ? 'text-green-400' : 'text-red-400'
        } glitch`}>
          [{showResult}]
        </div>
      </div>
    </div>
  );
}
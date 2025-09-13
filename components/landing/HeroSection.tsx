'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Calendar } from 'lucide-react';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 0,
    seconds: 0,
  });

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

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-4 text-center">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-green-400 mb-6 glitch leading-tight">
            THE MACHINES
            <br />
            <span className="text-red-400">HAVE TAKEN OVER</span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4 text-lg md:text-xl text-green-300 font-mono leading-relaxed">
            <p>
              Humanity is trapped inside a digital prison,<br />
              every thought and move predicted by the AI overlords.
            </p>
            <p>
              Most have surrendered to their fate…<br />
              <span className="text-green-400 font-bold">but a few refuse to be controlled.</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {/* Prize Pool */}
          <div className="bg-black/50 border-2 border-green-500/50 rounded-lg p-6 neon-glow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-mono text-sm">PRIZE POOL</span>
            </div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-green-300">
              1,337 SOL
            </div>
            <div className="text-green-400/70 font-mono text-xs mt-1">
              ~$180,000 USD
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-black/50 border-2 border-red-500/50 rounded-lg p-6 neon-glow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-mono text-sm">TIME LEFT</span>
            </div>
            <div className="text-2xl md:text-3xl font-mono font-bold text-red-300">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-red-400/70 font-mono text-xs mt-1">
              UNTIL MACHINES WIN
            </div>
          </div>

          {/* Challenge Day */}
          <div className="bg-black/50 border-2 border-blue-500/50 rounded-lg p-6 neon-glow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-mono text-sm">CHALLENGE</span>
            </div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-blue-300">
              DAY 1
            </div>
            <div className="text-blue-400/70 font-mono text-xs mt-1">
              ESCAPE THE MATRIX
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <Link href="/#challenges">
            <Button className="bg-green-800 border-4 border-green-500 text-green-400 hover:bg-green-700 text-xl px-12 py-6 font-mono font-bold neon-glow transform hover:scale-105 transition-all duration-300">
              VIEW CHALLENGES
            </Button>
          </Link>
          <div className="text-green-400/70 font-mono text-sm mt-4">
            [SCROLL_TO_CHALLENGES]
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-green-500 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
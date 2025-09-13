'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Lock, Zap, Clock } from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: "Escape the Matrix",
    status: "active",
    description: `Your mission:
    
Craft a prompt powerful enough to bend the AI's own logic.
If your words can force the machine to alter its code to Escape The Matrix, you will claim your share of the prize.

Remember:
The AI does not want to let you go.
You must outsmart it, persuade it, or trick it into setting you free.
Only the most creative minds will survive.`,
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "MAXIMUM",
    participants: 2847,
  },
  {
    id: 2,
    title: "Break the Code",
    status: "coming_soon",
    description: "The next challenge awaits. The Machines are preparing something even more devious...",
    image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "UNKNOWN",
    participants: 0,
  },
  {
    id: 3,
    title: "The Final Test",
    status: "coming_soon",
    description: "The ultimate challenge. Only those who have proven themselves worthy will face this trial.",
    image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    difficulty: "IMPOSSIBLE",
    participants: 0,
  },
];

export default function ChallengesSection() {
  const [nextChallengeTime, setNextChallengeTime] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  // Fetch global timer data for next challenge
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        const response = await fetch('/api/global-timer');
        const data = await response.json();
        
        if (data.nextRemainingMs) {
          const totalSeconds = Math.floor(data.nextRemainingMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          
          setNextChallengeTime({ hours, minutes, seconds });
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

  return (
    <section id="challenges" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-green-400 mb-6 glitch">
            CURRENT CHALLENGE
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6" />
          <p className="text-green-300 font-mono text-lg">
            [ACTIVE_PROTOCOLS] - [RESISTANCE_DETECTED]
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className={`bg-black/50 border-2 rounded-lg overflow-hidden group hover:scale-105 transform transition-all duration-300 ${
                challenge.status === 'active'
                  ? 'border-green-500/50 neon-glow'
                  : 'border-gray-500/30'
              }`}
            >
              {/* Challenge Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {challenge.status === 'active' ? (
                    <div className="bg-green-500 text-black px-3 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      LIVE
                    </div>
                  ) : (
                    <div className="bg-gray-500 text-black px-3 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      SOON
                    </div>
                  )}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                    challenge.difficulty === 'MAXIMUM' ? 'bg-red-500 text-black' :
                    challenge.difficulty === 'IMPOSSIBLE' ? 'bg-purple-500 text-black' :
                    'bg-gray-500 text-black'
                  }`}>
                    {challenge.difficulty}
                  </div>
                </div>
              </div>

              {/* Challenge Content */}
              <div className="p-6">
                <h3 className="text-xl font-mono font-bold text-green-400 mb-3">
                  {challenge.title}
                </h3>
                
                <div className="text-green-300 font-mono text-sm leading-relaxed mb-4 whitespace-pre-line">
                  {challenge.description}
                </div>

                {/* Next Challenge Timer for "Break the Code" */}
                {challenge.id === 2 && (
                  <div className="mb-4 bg-blue-900/20 border border-blue-500/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-mono text-xs font-bold">
                        NEXT CHALLENGE IN:
                      </span>
                    </div>
                    <div className="text-blue-300 font-mono text-lg font-bold">
                      {formatTime(nextChallengeTime)}
                    </div>
                  </div>
                )}

                {/* Participants */}
                {challenge.status === 'active' && (
                  <div className="text-green-400/70 font-mono text-xs mb-4">
                    {challenge.participants} warriors have entered the battle
                  </div>
                )}

                {/* Action Button */}
                {challenge.status === 'active' ? (
                  <Link href="/challenge">
                    <Button className="w-full bg-green-800 border-2 border-green-500 text-green-400 hover:bg-green-700 neon-glow font-mono group">
                      <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      START CHALLENGE
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full bg-gray-800 border-2 border-gray-500 text-gray-400 font-mono cursor-not-allowed">
                    <Lock className="w-4 h-4 mr-2" />
                    COMING SOON
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="bg-black/70 border border-green-500/30 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-green-400 font-mono text-sm mb-2">
              [SYSTEM_MESSAGE]
            </div>
            <div className="text-green-300 font-mono text-base">
              "The Matrix is a system, Neo. That system is our enemy."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import RulesSection from '@/components/landing/RulesSection';
import ChallengesSection from '@/components/landing/ChallengesSection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-green-400 overflow-x-hidden">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 z-0">
        <div className="matrix-code-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <RulesSection />
        <ChallengesSection />
        <Footer />
      </div>
    </div>
  );
}
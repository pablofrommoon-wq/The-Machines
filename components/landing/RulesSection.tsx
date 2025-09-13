'use client';

import { Shield, Clock, DollarSign, Skull, FileSignature, Eye } from 'lucide-react';

const rules = [
  {
    number: 1,
    title: "One Challenge, Every 24 Hours",
    description: "Every day, a new test from The Machines will be released. Your mind is the weapon. Your wallet is your key.",
    icon: Clock,
    color: "green",
  },
  {
    number: 2,
    title: "You Have 6 Hours to Break Free",
    description: "From the moment a challenge begins, you have 6 hours to beat the AI. Solve it, and you live to fight another day. Fail… and the Machines tighten their grip.",
    icon: Shield,
    color: "red",
  },
  {
    number: 3,
    title: "The Prize Awaits the Victors",
    description: "The prize pool is built from royalties raised on Bags.fm. At the end of the 6-hour battle, all who conquer the challenge split the prize evenly.",
    icon: DollarSign,
    color: "yellow",
  },
  {
    number: 4,
    title: "When Humanity Fails, the Machines Feast",
    description: "If no one survives the test, The Machines take the entire prize. The cycle restarts, and the next challenge begins with a fresh pool of rewards.",
    icon: Skull,
    color: "red",
  },
  {
    number: 5,
    title: "Sign Your Identity",
    description: "Every warrior must sign their wallet address before entering the arena. Without a signature, you cannot win. The prize will be sent directly to your wallet once the challenge is done.",
    icon: FileSignature,
    color: "blue",
  },
  {
    number: 6,
    title: "Total Transparency",
    description: "To prove The Machines play fair, every prompt given to the AI during the challenge will be posted for all to see. Nothing is hidden. The battle is pure.",
    icon: Eye,
    color: "purple",
  },
];

export default function RulesSection() {
  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'border-green-500/50 text-green-400 bg-green-900/20',
      red: 'border-red-500/50 text-red-400 bg-red-900/20',
      yellow: 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20',
      blue: 'border-blue-500/50 text-blue-400 bg-blue-900/20',
      purple: 'border-purple-500/50 text-purple-400 bg-purple-900/20',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };

  return (
    <section id="rules" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-green-400 mb-6 glitch">
            THE RULES OF THE GAME
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6" />
          <p className="text-green-300 font-mono text-lg max-w-2xl mx-auto">
            [PROTOCOL_ESTABLISHED] - [COMPLIANCE_MANDATORY]
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule) => {
            const IconComponent = rule.icon;
            const colorClasses = getColorClasses(rule.color);
            
            return (
              <div
                key={rule.number}
                className={`bg-black/50 border-2 ${colorClasses} rounded-lg p-6 hover:scale-105 transform transition-all duration-300 group cursor-pointer`}
              >
                {/* Rule Number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full border-2 ${colorClasses} flex items-center justify-center font-mono font-bold`}>
                    {rule.number}
                  </div>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Rule Title */}
                <h3 className="font-mono font-bold text-lg mb-3 group-hover:text-white transition-colors">
                  {rule.title}
                </h3>

                {/* Rule Description */}
                <p className="font-mono text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                  {rule.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            );
          })}
        </div>

        {/* Bottom Warning */}
        <div className="text-center mt-12">
          <div className="bg-red-900/30 border-2 border-red-500/50 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="text-red-400 font-mono text-sm font-bold mb-2">
              [CRITICAL_WARNING]
            </div>
            <div className="text-red-300 font-mono text-sm">
              "The Matrix has you. Follow the white rabbit."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
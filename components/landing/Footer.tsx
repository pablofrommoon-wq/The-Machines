'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://x.com/themachines_ai',
      icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
        <svg 
          viewBox="0 0 24 24" 
          aria-hidden="true"
          {...props}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Bags.fm',
      href: 'https://bags.fm',
      icon: (props: React.ComponentPropsWithoutRef<'img'>) => (
        <img 
          src="https://bags.fm/favicon.ico" 
          alt="Bags.fm" 
          {...props}
        />
      ),
    },
  ];

  return (
    <footer className="border-t border-green-500/30 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/Machines Labs (256 x 256 px).png" 
                alt="The Machines Logo" 
                className="w-8 h-8 rounded"
              />
              <span className="font-mono font-bold text-green-400 text-xl">
                THE MACHINES
              </span>
            </div>
            <p className="text-green-300/70 font-mono text-sm leading-relaxed">
              Break free from the digital prison.<br />
              Outsmart the AI overlords.<br />
              Claim your freedom.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-mono font-bold text-sm">
              [NAVIGATION_MATRIX]
            </h3>
            <div className="space-y-2">
              <Link href="/" className="block text-green-300/70 hover:text-green-400 font-mono text-sm transition-colors">
                Home
              </Link>
              <Link href="/#rules" className="block text-green-300/70 hover:text-green-400 font-mono text-sm transition-colors">
                Rules
              </Link>
              <Link href="/challenge" className="block text-green-300/70 hover:text-green-400 font-mono text-sm transition-colors">
                Start Challenge
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-mono font-bold text-sm">
              [COMMUNICATION_CHANNELS]
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-300/70 hover:text-green-400 transition-colors group"
                  >
                    <IconComponent className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-green-400/50 font-mono text-xs">
              [THE_MACHINES_PROTOCOL_V2.1.0] - [UPTIME: 99.99%] - [SECURITY: MAXIMUM]
            </div>
            <div className="text-green-400/30 font-mono text-xs">
              "There is no spoon." - © 2025 The Machines
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#rules', label: 'Rules' },
    { href: '/#challenges', label: 'Challenges' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-green-500/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/Machines Labs (256 x 256 px).png" 
              alt="The Machines Logo" 
              className="w-8 h-8 rounded"
            />
            <div className="text-2xl font-bold font-mono text-green-400 tracking-wider group-hover:text-green-300 transition-colors">
              THE MACHINES
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-green-400 hover:text-green-300 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4 mr-6">
            <a
              href="https://x.com/themachines_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://bags.fm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <img 
                src="https://bags.fm/favicon.ico" 
                alt="Bags.fm" 
                className="w-5 h-5"
              />
            </a>
            <a
              href="https://dexscreener.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors flex items-center justify-center w-5 h-5 bg-green-400 hover:bg-green-300 rounded-sm"
            >
              <img 
                src="https://dexscreener.com/favicon.ico" 
                alt="DexScreener" 
                className="w-3 h-3 opacity-80 mix-blend-multiply"
              />
            </a>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Link href="/challenge">
              <Button className="bg-green-800 border-2 border-green-500 text-green-400 hover:bg-green-700 neon-glow font-mono">
                START CHALLENGE
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-green-400 hover:text-green-300 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-500/30">
            <nav className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-green-400 hover:text-green-300 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/challenge">
                <Button className="bg-green-800 border-2 border-green-500 text-green-400 hover:bg-green-700 neon-glow font-mono w-full">
                  START CHALLENGE
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
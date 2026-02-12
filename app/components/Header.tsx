'use client';

import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';

const LOGO = '/assets/smartweave-logo.png';
const navItems = [
  { name: 'Usługi', href: '#services' },
  { name: 'Jak działamy', href: '#how-we-work' },
  { name: 'Realizacje', href: '#portfolio' },
  { name: 'Kontakt', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    e.preventDefault();
    scrollToSection(item.href);
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          backdropFilter: 'blur(12px)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'border-b border-slate-800/50' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center group"
              >
                <Image
                  src={LOGO}
                  alt="SmartWeave"
                  width={160}
                  height={32}
                  className="h-8 w-auto max-w-[160px] sm:max-w-[180px] object-contain object-left group-hover:scale-105 transition-transform"
                />
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-slate-300 hover:text-white transition-colors group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block"
            >
              <Button variant="primary" onClick={() => scrollToSection('#contact')}>
                Rozpocznij Projekt
              </Button>
            </motion.div>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-[73px] left-0 right-0 z-40 md:hidden"
      >
        <div className="mx-4 mt-2 p-6 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  x: mobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={(e) => handleNavClick(e, item)}
                className="text-slate-300 hover:text-white py-2 px-4 rounded-lg hover:bg-slate-800/50 transition-all"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: mobileMenuOpen ? 1 : 0,
                y: mobileMenuOpen ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
              className="pt-4 border-t border-slate-800"
            >
              <Button variant="primary" fullWidth onClick={() => scrollToSection('#contact')}>
                Rozpocznij Projekt
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden
        />
      )}
    </>
  );
}

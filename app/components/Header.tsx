'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/Button';
import { USLUGI_DISPLAY_ORDER } from '@/lib/services';

const LOGO = '/assets/smartweave-logo-ai.png';

const USLUGI_DROPDOWN_NAMES: Record<(typeof USLUGI_DISPLAY_ORDER)[number], string> = {
  automatyzacja: 'Automatyzacja procesów biznesowych',
  'agenci-ai': 'Agenci AI',
  strony: 'Strony internetowe',
  branding: 'Logo i identyfikacja wizualna',
};

const uslugiDropdownItems = USLUGI_DISPLAY_ORDER.map((slug) => ({
  name: USLUGI_DROPDOWN_NAMES[slug],
  href: `/uslugi/${slug}` as const,
}));

const realizacjeDropdownItems = [
  { name: 'Projekty', href: '/realizacje' },
  { name: 'Automatyzacja procesów', href: '/realizacje/automatyzacja' },
];

const navItems = [
  { name: 'Usługi', href: '#services', dropdown: 'uslugi' as const },
  { name: 'Jak działamy', href: '#how-we-work' },
  { name: 'Realizacje', href: '/realizacje', dropdown: 'realizacje' as const },
  { name: 'E-booki', href: '/e-booki' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uslugiDropdownOpen, setUslugiDropdownOpen] = useState(false);
  const [realizacjeDropdownOpen, setRealizacjeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const realizacjeDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setUslugiDropdownOpen(false);
      }
      if (realizacjeDropdownRef.current && !realizacjeDropdownRef.current.contains(target)) {
        setRealizacjeDropdownOpen(false);
      }
    };
    if (uslugiDropdownOpen || realizacjeDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [uslugiDropdownOpen, realizacjeDropdownOpen]);

  // 🔥 smooth scroll function
  const scrollToSection = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // 🔥 handle clicks (works everywhere)
  const handleNavClick = (
    e: React.MouseEvent,
    item: (typeof navItems)[0]
  ) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();

      if (pathname === '/') {
        scrollToSection(item.href);
      } else {
        router.push(`/${item.href}`);
      }

      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  // 🔥 auto-scroll after redirect with hash
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        scrollToSection(hash);
      }, 100); // small delay for layout render
    }
  }, [pathname]);

  return (
    <>
      {/* HEADER */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-card rounded-none border-x-0 border-t-0 ${
          mobileMenuOpen ? 'border-b border-white/10' : ''
        }`}
        style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" title="SmartWeave - strona główna">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center group"
              >
                <Image
                  src={LOGO}
                  alt="SmartWeave"
                  width={140}
                  height={36}
                  priority
                  className="h-8 sm:h-9 w-auto max-h-10 group-hover:opacity-90 transition-opacity"
                />
              </motion.div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) =>
                item.dropdown === 'uslugi' ? (
                  <div key={item.name} ref={dropdownRef} className="relative">
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setUslugiDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 text-zinc-400 hover:text-[#d8f17b] transition-colors cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${uslugiDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                      {uslugiDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] py-2 rounded-xl border border-white/10 bg-[var(--bg-graphite-card)] backdrop-blur-xl shadow-xl z-50"
                        >
                          {uslugiDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setUslugiDropdownOpen(false)}
                              className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-[#d8f17b] hover:bg-white/5 transition-colors first:rounded-t-xl whitespace-nowrap"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.dropdown === 'realizacje' ? (
                  <div key={item.name} ref={realizacjeDropdownRef} className="relative">
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setRealizacjeDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 text-zinc-400 hover:text-[#d8f17b] transition-colors cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${realizacjeDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                      {realizacjeDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[200px] py-2 rounded-xl border border-white/10 bg-[var(--bg-graphite-card)] backdrop-blur-xl shadow-xl z-50"
                        >
                          {realizacjeDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setRealizacjeDropdownOpen(false)}
                              className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-[#d8f17b] hover:bg-white/5 transition-colors first:rounded-t-xl"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.href.startsWith('/') ? (
                  <Link key={item.name} href={item.href}>
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative text-zinc-400 hover:text-[#d8f17b] transition-colors group cursor-pointer"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative text-zinc-400 hover:text-[#d8f17b] transition-colors group cursor-pointer"
                  >
                    {item.name}
                  </motion.a>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="primary"
                onClick={(e) =>
                  handleNavClick(e as React.MouseEvent<HTMLButtonElement>, { name: 'Kontakt', href: '#contact' })
                }
              >
                Rozpocznij Projekt
              </Button>
              <Link href="/e-booki" className="text-zinc-400 hover:text-[#d8f17b] transition-colors p-2 rounded-lg hover:bg-white/5" title="E-booki" aria-label="E-booki"><ShoppingCart className="w-4 h-4" /></Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15 rounded-full text-zinc-300 hover:text-[#d8f17b] hover:border-[#d8f17b]/30 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-40 md:hidden">
          <div className="mx-4 mt-2 p-6 rounded-2xl border border-white/10" style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}>
            <nav className="flex flex-col gap-4">
              <div>
                <span className="block text-zinc-500 text-sm font-medium py-2 px-4">Usługi</span>
                {uslugiDropdownItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-zinc-300 hover:text-[#d8f17b] py-2 px-4 pl-6 rounded-lg transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              <div>
                <span className="block text-zinc-500 text-sm font-medium py-2 px-4">Realizacje</span>
                {realizacjeDropdownItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-zinc-300 hover:text-[#d8f17b] py-2 px-4 pl-6 rounded-lg transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              {navItems.filter((i) => !i.dropdown).map((item) =>
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="block text-zinc-300 hover:text-[#d8f17b] py-2 px-4 rounded-lg transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-zinc-300 hover:text-[#d8f17b] py-2 px-4 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                )
              )}

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <Link href="/e-booki" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center text-zinc-400 hover:text-[#d8f17b] p-3 rounded-lg border border-white/15 hover:bg-white/5 transition-colors" aria-label="E-booki"><ShoppingCart className="w-5 h-5" /></Link>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={(e) =>
                    handleNavClick(e as React.MouseEvent<HTMLButtonElement>, { name: 'Kontakt', href: '#contact' })
                  }
                >
                  Rozpocznij Projekt
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

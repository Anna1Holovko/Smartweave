'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/Button';
import { USLUGI_DISPLAY_ORDER } from '@/lib/services';

const LOGO = '/assets/smartweave-logo.png';

const USLUGI_DROPDOWN_NAMES: Record<(typeof USLUGI_DISPLAY_ORDER)[number], string> = {
  automatyzacja: 'Automatyzacja procesów biznesowych z wykorzystaniem AI',
  strony: 'Strony internetowe',
  branding: 'Logo i identyfikacja wizualna',
  'e-ksiazki': 'E-booki',
};

const uslugiDropdownItems = USLUGI_DISPLAY_ORDER.map((slug) => ({
  name: USLUGI_DROPDOWN_NAMES[slug],
  href: `/uslugi/${slug}` as const,
}));

const navItems = [
  { name: 'Usługi', href: '#services' },
  { name: 'Jak działamy', href: '#how-we-work' },
  { name: 'Realizacje', href: '/realizacje' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uslugiDropdownOpen, setUslugiDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUslugiDropdownOpen(false);
      }
    };
    if (uslugiDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [uslugiDropdownOpen]);

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
        style={{
          backgroundColor: 'rgba(2, 6, 23, 0.6)',
          backdropFilter: 'blur(12px)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'border-b border-slate-800/50' : ''
        }`}
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
                  width={120}
                  height={32}
                  priority
                  className="h-8 w-auto group-hover:scale-105 transition-transform"
                />
              </motion.div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) =>
                item.name === 'Usługi' ? (
                  <div key={item.name} ref={dropdownRef} className="relative">
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setUslugiDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
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
                          className="absolute top-full left-0 mt-2 min-w-[220px] py-2 rounded-xl border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-xl z-50"
                        >
                          {uslugiDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setUslugiDropdownOpen(false)}
                              className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors first:rounded-t-xl"
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
                      className="relative text-slate-300 hover:text-white transition-colors group cursor-pointer"
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
                    className="relative text-slate-300 hover:text-white transition-colors group cursor-pointer"
                  >
                    {item.name}
                  </motion.a>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button
                variant="primary"
                onClick={(e) =>
                  handleNavClick(e as React.MouseEvent<HTMLButtonElement>, { name: 'Kontakt', href: '#contact' })
                }
              >
                Rozpocznij Projekt
              </Button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-700 rounded-full"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-40 md:hidden">
          <div className="mx-4 mt-2 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <nav className="flex flex-col gap-4">
              <div>
                <span className="block text-slate-400 text-sm font-medium py-2 px-4">Usługi</span>
                {uslugiDropdownItems.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-slate-300 hover:text-white py-2 px-4 pl-6 rounded-lg"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              {navItems.filter((i) => i.name !== 'Usługi').map((item) =>
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="block text-slate-300 hover:text-white py-2 px-4 rounded-lg">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="text-slate-300 hover:text-white py-2 px-4 rounded-lg"
                  >
                    {item.name}
                  </a>
                )
              )}

              <div className="pt-4 border-t border-slate-800">
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

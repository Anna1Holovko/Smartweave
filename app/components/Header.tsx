'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { USLUGI_DISPLAY_ORDER } from '@/lib/services';

const LOGO = '/assets/smartweave-logo.png';

const USLUGI_DROPDOWN_NAMES: Record<(typeof USLUGI_DISPLAY_ORDER)[number], string> = {
  automatyzacja: 'Automatyzacja procesów biznesowych',
  strony: 'Strony internetowe',
  branding: 'Logo i identyfikacja wizualna',
};

const uslugiDropdownItems = USLUGI_DISPLAY_ORDER.map((slug) => ({
  name: USLUGI_DROPDOWN_NAMES[slug],
  href: `/uslugi/${slug}` as const,
}));

const realizacjeDropdownItems = [
  { name: 'Projekty', href: '/realizacje' },
  { name: 'E-booki', href: '/e-booki' },
];

const navItems = [
  { name: 'Usługi', href: '#services', dropdown: 'uslugi' as const },
  { name: 'Jak działamy', href: '#how-we-work' },
  { name: 'Realizacje', href: '/realizacje', dropdown: 'realizacje' as const },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uslugiOpen, setUslugiOpen] = useState(false);
  const [realizacjeOpen, setRealizacjeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const realizacjeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setUslugiOpen(false);
      if (realizacjeRef.current && !realizacjeRef.current.contains(target)) setRealizacjeOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onNavClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      pathname === '/' ? scrollTo(item.href) : router.push(`/${item.href}`);
      setMobileMenuOpen(false);
    } else setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => scrollTo(window.location.hash), 100);
    }
  }, [pathname]);

  const navLinkClass =
    'text-[var(--text-sm)] font-medium text-white/80 hover:text-white transition-colors duration-300';
  const dropdownPanelClass =
    'absolute top-full left-0 mt-3 min-w-[200px] py-2 rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl z-50';

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
        style={{ top: 'var(--top-banner-height, 0)' }}
      >
        <div
          className="w-full max-w-[var(--container)] mx-auto flex items-center justify-between px-6 md:px-10"
          style={{ height: 'var(--s64)' }}
        >
          <Link
            href="/"
            title="SmartWeave - strona główna"
            className="flex items-center shrink-0"
          >
            <Image
              src={LOGO}
              alt="SmartWeave"
              width={120}
              height={32}
              priority
              className="h-[32px] w-auto opacity-95 hover:opacity-100 transition-opacity"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) =>
              item.dropdown === 'uslugi' ? (
                <div key={item.name} ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setUslugiOpen((v) => !v);
                      setRealizacjeOpen(false);
                    }}
                    className={`${navLinkClass} flex items-center gap-1`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${uslugiOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {uslugiOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className={dropdownPanelClass}
                      >
                        {uslugiDropdownItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setUslugiOpen(false)}
                            className="block px-5 py-2.5 text-[var(--text-sm)] text-gray-700 hover:text-black hover:bg-black/5 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.dropdown === 'realizacje' ? (
                <div key={item.name} ref={realizacjeRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setRealizacjeOpen((v) => !v);
                      setUslugiOpen(false);
                    }}
                    className={`${navLinkClass} flex items-center gap-1`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${realizacjeOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {realizacjeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className={dropdownPanelClass}
                      >
                        {realizacjeDropdownItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setRealizacjeOpen(false)}
                            className="block px-5 py-2.5 text-[var(--text-sm)] text-gray-700 hover:text-black hover:bg-black/5 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.href.startsWith('/') ? (
                <Link key={item.name} href={item.href} className={navLinkClass}>
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item)}
                  className={navLinkClass}
                >
                  {item.name}
                </a>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/e-booki"
              className="inline-flex items-center justify-center text-white/80 hover:text-white transition-colors p-2 rounded-[var(--radius-md)] hover:bg-white/10"
              title="E-booki"
              aria-label="E-booki"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center font-medium text-white/80 hover:text-white transition-colors"
              style={{ padding: 'var(--s8) var(--s16)', fontSize: 'var(--text-sm)' }}
            >
              Blog
            </Link>
            <a
              href="/#contact"
              onClick={(e) =>
                onNavClick(e as unknown as React.MouseEvent, { name: 'Kontakt', href: '#contact' })
              }
              className="inline-flex items-center justify-center gap-2 font-semibold text-white rounded-[var(--radius-md)] border border-white/40 bg-transparent hover:bg-white/10 transition-colors uppercase tracking-[var(--tracking-wide)]"
              style={{ padding: 'var(--s8) var(--s24)', fontSize: 'var(--text-sm)' }}
            >
              Rozpocznij projekt
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-0.5" aria-hidden>
                  <path d="M2 2l6 3-6 3V2z" fill="currentColor" />
                </svg>
              </span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[var(--radius-md)] border border-white/20 text-white"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-40 md:hidden bg-[var(--bg-hero)]/95 backdrop-blur-xl border-b border-white/[0.05]"
            style={{ top: 'calc(var(--top-banner-height, 0px) + var(--s64))' }}
          >
            <nav
              className="w-full max-w-[var(--container)] mx-auto flex flex-col px-6 py-6"
              style={{ gap: 'var(--s8)' }}
            >
              <div
                className="text-[var(--text-xs)] font-semibold uppercase tracking-wider text-white/60 mb-1"
                style={{ paddingLeft: 'var(--s8)' }}
              >
                Usługi
              </div>
              {uslugiDropdownItems.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-white hover:text-white/80 transition-colors"
                  style={{ paddingLeft: 'var(--s24)' }}
                >
                  {sub.name}
                </Link>
              ))}
              <div
                className="text-[var(--text-xs)] font-semibold uppercase tracking-wider text-white/60 mt-4 mb-1"
                style={{ paddingLeft: 'var(--s8)' }}
              >
                Realizacje
              </div>
              {realizacjeDropdownItems.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-white hover:text-white/80 transition-colors"
                  style={{ paddingLeft: 'var(--s24)' }}
                >
                  {sub.name}
                </Link>
              ))}
              {navItems
                .filter((i) => !i.dropdown)
                .map((item) =>
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 text-white hover:text-white/80 transition-colors"
                      style={{ paddingLeft: 'var(--s24)' }}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => onNavClick(e, item)}
                      className="py-3 text-white hover:text-white/80 transition-colors"
                      style={{ paddingLeft: 'var(--s24)' }}
                    >
                      {item.name}
                    </a>
                  )
                )}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-3">
                <Link
                  href="/e-booki"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center text-white p-3 rounded-[var(--radius-md)] border border-white/20 hover:bg-white/10"
                  aria-label="E-booki"
                >
                  <ShoppingCart className="w-5 h-5" aria-hidden />
                </Link>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    onNavClick(e as unknown as React.MouseEvent, { name: 'Kontakt', href: '#contact' });
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 text-center font-semibold text-white rounded-[var(--radius-md)] bg-black border border-white/20 py-3 uppercase tracking-[var(--tracking-wide)]"
                >
                  Rozpocznij projekt
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { CART_UPDATE_EVENT, CART_OPEN_DRAWER_EVENT, getCartCount } from '@/lib/cart';
import { CartDrawer } from './CartDrawer';

function useCartCount(): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const read = () => setCount(getCartCount());
    read();
    window.addEventListener(CART_UPDATE_EVENT, read);
    return () => window.removeEventListener(CART_UPDATE_EVENT, read);
  }, []);
  return count;
}
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
  chatboty: 'Chatboty',
  'aplikacje-webowe': 'Aplikacje webowe',
};

const uslugiDropdownItems = USLUGI_DISPLAY_ORDER.map((slug) => ({
  name: USLUGI_DROPDOWN_NAMES[slug],
  href: slug === 'agenci-ai' ? '/agenci-ai' : `/uslugi/${slug}`,
}));

const realizacjeDropdownItems = [
  { name: 'Strony Internetowe', href: '/realizacje' },
  { name: 'Automatyzacja procesów', href: '/realizacje/automatyzacja' },
  { name: 'Chatboty', href: '/realizacje/chatboty' },
  { name: 'Aplikacje webowe', href: '/realizacje/aplikacje-webowe' },
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
  const [mobileUslugiExpanded, setMobileUslugiExpanded] = useState(false);
  const [mobileRealizacjeExpanded, setMobileRealizacjeExpanded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [uslugiDropdownOpen, setUslugiDropdownOpen] = useState(false);
  const [realizacjeDropdownOpen, setRealizacjeDropdownOpen] = useState(false);
  const cartCount = useCartCount();
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

  useEffect(() => {
    const openDrawer = () => setCartOpen(true);
    window.addEventListener(CART_OPEN_DRAWER_EVENT, openDrawer);
    return () => window.removeEventListener(CART_OPEN_DRAWER_EVENT, openDrawer);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileUslugiExpanded(false);
    setMobileRealizacjeExpanded(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

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

      closeMobileMenu();
    } else {
      closeMobileMenu();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-none border-x-0 border-t-0 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] ${
          mobileMenuOpen ? 'border-b border-[var(--border-soft)]' : 'border-b border-[var(--border-subtle)]'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(18,21,29,0.92) 0%, rgba(12,14,20,0.88) 100%)',
          backdropFilter: 'blur(20px) saturate(1.15)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.15)',
        }}
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
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) =>
                item.dropdown === 'uslugi' ? (
                  <div key={item.name} ref={dropdownRef} className="relative">
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => {
                        setRealizacjeDropdownOpen(false);
                        setUslugiDropdownOpen((v) => !v);
                      }}
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
                          className="absolute top-full left-0 mt-2 min-w-[220px] py-2 rounded-xl border border-[var(--border-subtle)] shadow-2xl z-50"
                          style={{
                            background: 'rgba(12, 14, 20, 0.92)',
                            backdropFilter: 'blur(64px) saturate(1.15)',
                            WebkitBackdropFilter: 'blur(64px) saturate(1.15)',
                          }}
                        >
                          {uslugiDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setUslugiDropdownOpen(false);
                                setRealizacjeDropdownOpen(false);
                              }}
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
                      onClick={() => {
                        setUslugiDropdownOpen(false);
                        setRealizacjeDropdownOpen((v) => !v);
                      }}
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
                          className="absolute top-full left-0 mt-2 min-w-[200px] py-2 rounded-xl border border-[var(--border-subtle)] shadow-2xl z-50"
                          style={{
                            background: 'rgba(12, 14, 20, 0.92)',
                            backdropFilter: 'blur(64px) saturate(1.15)',
                            WebkitBackdropFilter: 'blur(64px) saturate(1.15)',
                          }}
                        >
                          {realizacjeDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setUslugiDropdownOpen(false);
                                setRealizacjeDropdownOpen(false);
                              }}
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
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="primary"
                onClick={(e) =>
                  handleNavClick(e as React.MouseEvent<HTMLButtonElement>, { name: 'Kontakt', href: '#contact' })
                }
              >
                Rozpocznij Projekt
              </Button>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative text-zinc-400 hover:text-[#d8f17b] transition-colors p-2 rounded-lg hover:bg-white/5"
                title="Koszyk"
                aria-label={cartCount > 0 ? `Otwórz koszyk, ${cartCount} pozycji` : 'Otwórz koszyk'}
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent text-[#0e0e0e] text-xs font-bold px-1">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() =>
                setMobileMenuOpen((wasOpen) => {
                  if (wasOpen) {
                    setMobileUslugiExpanded(false);
                    setMobileRealizacjeExpanded(false);
                  }
                  return !wasOpen;
                })
              }
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15 rounded-full text-zinc-300 hover:text-[#d8f17b] hover:border-[#d8f17b]/30 transition-colors"
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

      {/* MOBILE MENU: backdrop + scrollable panel, accordion for Usługi / Realizacje */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              key="mobile-menu-backdrop"
              type="button"
              aria-label="Zamknij menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-0 bottom-0 top-14 z-[38] bg-black/55 backdrop-blur-[2px] lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              key="mobile-menu-panel"
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu nawigacji"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 z-[45] flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] shadow-2xl lg:hidden"
              style={{
                top: 'max(4rem, calc(env(safe-area-inset-top, 0px) + 3.25rem))',
                bottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
                background: 'rgba(12, 14, 20, 0.96)',
                backdropFilter: 'blur(64px) saturate(1.15)',
                WebkitBackdropFilter: 'blur(64px) saturate(1.15)',
              }}
            >
              {/* Single scroll surface: whole drawer (nav + actions) on short screens */}
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 touch-pan-y [-webkit-overflow-scrolling:touch] sm:px-5 sm:py-5">
                <nav className="flex flex-col" aria-label="Menu główne">
                  <div className="border-b border-white/[0.08]">
                    <button
                      type="button"
                      className="flex w-full min-h-[48px] items-center justify-between gap-3 py-3 text-left text-base font-medium text-zinc-300 transition-colors hover:text-[#d8f17b]"
                      onClick={() => {
                        setMobileUslugiExpanded((v) => !v);
                        setMobileRealizacjeExpanded(false);
                      }}
                      aria-expanded={mobileUslugiExpanded}
                    >
                      Usługi
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${mobileUslugiExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileUslugiExpanded && (
                      <div className="space-y-0 pb-3">
                        {uslugiDropdownItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={closeMobileMenu}
                            className="flex min-h-[44px] items-center border-l border-white/10 py-2.5 pl-4 text-sm text-zinc-400 transition-colors hover:text-[#d8f17b]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-b border-white/[0.08]">
                    <button
                      type="button"
                      className="flex w-full min-h-[48px] items-center justify-between gap-3 py-3 text-left text-base font-medium text-zinc-300 transition-colors hover:text-[#d8f17b]"
                      onClick={() => {
                        setMobileRealizacjeExpanded((v) => !v);
                        setMobileUslugiExpanded(false);
                      }}
                      aria-expanded={mobileRealizacjeExpanded}
                    >
                      Realizacje
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${mobileRealizacjeExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileRealizacjeExpanded && (
                      <div className="space-y-0 pb-3">
                        {realizacjeDropdownItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={closeMobileMenu}
                            className="flex min-h-[44px] items-center border-l border-white/10 py-2.5 pl-4 text-sm text-zinc-400 transition-colors hover:text-[#d8f17b]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {navItems.filter((i) => !i.dropdown).map((item) =>
                    item.href.startsWith('/') ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex min-h-[48px] items-center border-b border-white/[0.08] py-3 text-base font-medium text-zinc-300 transition-colors last:border-b-0 hover:text-[#d8f17b]"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                        className="flex min-h-[48px] items-center border-b border-white/[0.08] py-3 text-base font-medium text-zinc-300 transition-colors last:border-b-0 hover:text-[#d8f17b]"
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </nav>

                <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      setCartOpen(true);
                    }}
                    className="relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center self-start rounded-xl border border-white/15 p-3 text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#d8f17b]"
                    aria-label={cartCount > 0 ? `Otwórz koszyk, ${cartCount} pozycji` : 'Otwórz koszyk'}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute right-1.5 top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-[#0e0e0e]">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <Button
                    variant="primary"
                    fullWidth
                    className="sm:flex-1"
                    onClick={(e) =>
                      handleNavClick(e as React.MouseEvent<HTMLButtonElement>, { name: 'Kontakt', href: '#contact' })
                    }
                  >
                    Rozpocznij Projekt
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

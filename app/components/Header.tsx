'use client';

import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/Button';

const LOGO = '/assets/smartweave-logo.png';

const navItems = [
  { name: 'Usługi', href: '#services' },
  { name: 'Jak działamy', href: '#how-we-work' },
  { name: 'Realizacje', href: '/realizacje' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontakt', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
            <Link href="/" title="SmartWeave – strona główna">
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
                item.href.startsWith('/') ? (
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
                  handleNavClick(e as any, { name: '', href: '#contact' })
                }
              >
                Rozpocznij Projekt
              </Button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center border border-slate-700 rounded-lg"
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
              {navItems.map((item) =>
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
                    handleNavClick(e as any, { name: '', href: '#contact' })
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

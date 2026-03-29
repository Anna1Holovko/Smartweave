import Link from 'next/link';
import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import { SERVICES_ORDER_LABEL } from '@/lib/site';

const LOGO = '/assets/smartweave-logo-ai.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[var(--border-subtle)] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(12,14,20,0.97) 0%, rgba(6,7,11,1) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent"
        aria-hidden
      />
      <div className="relative z-[1] max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <Image
              src={LOGO}
              alt="SmartWeave"
              width={140}
              height={36}
              sizes="140px"
              priority
              className="h-8 sm:h-9 w-auto max-h-10 mb-4"
            />

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-3">
              {SERVICES_ORDER_LABEL}
            </p>
            <nav aria-label="Automatyzacja procesów i marketing" className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm mb-4">
              <Link href="/automatyzacja-ai-dla-firm" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                Automatyzacja procesów dla firm
              </Link>
              <Link href="/ai-w-marketingu-i-sprzedazy" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                AI w marketingu i sprzedaży
              </Link>
              <Link href="/e-booki" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                E-booki
              </Link>
            </nav>
            <p className="text-xs sm:text-sm text-zinc-500">
              © {currentYear} SmartWeave. Wszystkie prawa zastrzeżone.
            </p>
          </div>

          <address className="not-italic">
            <h3 className="text-base sm:text-lg font-semibold text-[#e4e4e7] mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-zinc-400" aria-label="Dane kontaktowe">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d8f17b] flex-shrink-0" aria-hidden />
                <a
                  href="https://maps.app.goo.gl/xQ72zRziawDf4Eub9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d8f17b] transition-colors"
                  title="Zobacz na mapie"
                >
                  Legnicka 16, 53-673 Wrocław, Polska
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d8f17b] flex-shrink-0" aria-hidden />
                <a
                  href="mailto:hello@smartweave.pl"
                  className="hover:text-[#d8f17b] transition-colors"
                  title="Napisz do SmartWeave"
                >
                  hello@smartweave.pl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#d8f17b] flex-shrink-0" aria-hidden />
                <a
                  href="https://www.linkedin.com/company/smartweave-pl/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d8f17b] transition-colors"
                  title="SmartWeave na LinkedIn"
                >
                  SmartWeave
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#d8f17b] flex-shrink-0" aria-hidden />
                <a
                  href="https://www.instagram.com/smart.weave?igsh=MTZ6eWhpZTh6b2hocw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d8f17b] transition-colors"
                  title="SmartWeave na Instagramie"
                >
                  @smart.weave
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </footer>
  );
}

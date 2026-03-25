import Link from 'next/link';
import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

const LOGO = '/assets/smartweave-logo-ai.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-white/10 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
      style={{
        background: 'var(--bg-graphite-card)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
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
              Automatyzacja AI i procesów • Agenci AI • Strony www • Branding
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-3 max-w-md">
              Łączymy identyfikację wizualną z automatyzacją AI i nowoczesnymi systemami cyfrowymi.
            </p>
            <nav aria-label="Automatyzacja AI i marketing" className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm mb-4">
              <Link href="/automatyzacja-ai-dla-firm" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                Automatyzacja AI dla firm
              </Link>
              <Link href="/ai-w-marketingu-i-sprzedazy" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                AI w marketingu i sprzedaży
              </Link>
              <Link href="/automatyzacja-ai/wroclaw" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                Wrocław
              </Link>
              <Link href="/automatyzacja-ai/warszawa" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                Warszawa
              </Link>
              <Link href="/automatyzacja-ai/krakow" className="text-zinc-500 hover:text-[#d8f17b] transition-colors">
                Kraków
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
                  href="https://www.linkedin.com/in/smart-weave-72995a3b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d8f17b] transition-colors"
                  title="SmartWeave na LinkedIn"
                >
                  Smart Weave
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

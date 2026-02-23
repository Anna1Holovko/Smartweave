import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LOGO = '/assets/smartweave-logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-purple-950/30 to-slate-950 border-t border-slate-800/50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div>
            {/* Logo — same settings as Header */}
            <Image
              src={LOGO}
              alt="SmartWeave"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="h-8 w-auto mb-4"
            />

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3">
              Tworzymy nowoczesne strony i automatyzujemy procesy.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              © {currentYear} SmartWeave. Wszystkie prawa zastrzeżone.
            </p>
          </div>

          <address className="not-italic">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-400" aria-label="Dane kontaktowe">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" aria-hidden />
                <span>Legnicka 48, 54-430 Wrocław, Polska</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" aria-hidden />
                <a
                  href="mailto:hello@smartweave.com"
                  className="hover:text-purple-400 transition-colors"
                  title="Napisz do SmartWeave"
                >
                  hello@smartweave.com
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </footer>
  );
}

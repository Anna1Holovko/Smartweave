'use client';

import { Mail } from 'lucide-react';

const logo = '/smartweave-v1/assets/logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-purple-950/30 to-slate-950 border-t border-slate-800/50 py-6 sm:py-8 px-4 sm:px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="SmartWeave"
              className="h-8 sm:h-10 w-auto mb-4"
            />
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-3">
              Tworzymy nowoczesne strony i automatyzujemy procesy.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              © {currentYear} SmartWeave. Wszystkie prawa zastrzeżone.
            </p>
          </div>

          {/* Contact - Left aligned */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:hello@smartweave.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  hello@smartweave.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const steps = [
  'Nowy lead',
  'Airtable (baza leadów)',
  'Automatyzacja workflow',
  'Analiza AI (lead scoring)',
  'Sprawdzenie duplikatów (telefon)',
  'Aktualizacja / utworzenie kontaktu',
  'HubSpot CRM (kontakt + zadanie sprzedażowe)',
  'Generowanie podsumowania i skryptu rozmowy',
  'Dashboard monitorujący proces',
];

export function ArchitectureFlow() {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#d8f17b]/20 via-[#d8f17b]/40 to-[#d8f17b]/20" />

      <div className="relative flex flex-col items-center gap-0">
        {steps.map((label, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="relative flex flex-col items-center w-full"
          >
            <div
              className="relative z-10 w-full max-w-sm rounded-xl px-4 py-3 border border-white/10 text-center transition-all duration-200 hover:border-[#d8f17b]/30 hover:shadow-[0_0_24px_var(--accent-muted)]"
              style={{ background: 'var(--bg-graphite-card)', backdropFilter: 'blur(16px)' }}
            >
              <span className="text-[#e4e4e7] font-medium text-sm sm:text-base">{label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ChevronDown className="w-5 h-5 text-[#d8f17b]/60" aria-hidden />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

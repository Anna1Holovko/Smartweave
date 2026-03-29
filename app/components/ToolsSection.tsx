'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { BrandMarkIcon } from './BrandMarkIcon';

const tools = [
  { name: 'Figma', logo: '/assets/tools/figma.png' },
  { name: 'Cursor', logo: '/assets/tools/cursor.png' },
  { name: 'Google Sheets', logo: '/assets/tools/google-sheets.png' },
  { name: 'Gmail', logo: '/assets/tools/gmail.png' },
  { name: 'Google Drive', logo: '/assets/tools/google-drive.png' },
  { name: 'Airtable', logo: '/assets/tools/airtable.png' },
  { name: 'Twilio', logo: '/assets/tools/twilio.png' },
  { name: 'PDF.co', logo: '/assets/tools/pdfco.png' },
  { name: 'Slack', logo: '/assets/tools/slack.png' },
  { name: 'HubSpot', logo: '/assets/tools/hubspot.png' },
  { name: 'PostgreSQL', logo: '/assets/tools/postgresql.png' },
  { name: 'QuickBooks', logo: '/assets/tools/quickbooks.png' },
  { name: 'Bubble', logo: '/assets/tools/bubble.png' },
  { name: 'SendPulse', logo: '/assets/tools/sendpulse.png' },
  { name: 'Make', logo: '/assets/tools/make.png' },
  { name: 'n8n', logo: '/assets/tools/n8n.png' },
  { name: 'ElevenLabs', logo: '/assets/tools/elevenlabs.png' },
  { name: 'BigQuery', logo: '/assets/tools/bigquery.png' },
  { name: 'Looker Studio', logo: '/assets/tools/looker-studio.png' },
];

export function ToolsSection() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="relative py-10 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-graphite)]" />
      <div className="relative z-10 max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-4 text-[#d8f17b] text-xs sm:text-sm font-medium uppercase tracking-wider"
          >
            <BrandMarkIcon />
            Nasze Narzędzia
          </motion.div>
          <motion.h2
            id="tools-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#e4e4e7] mb-4 sm:mb-6 px-4"
          >
            Używamy narzędzi,{' '}
            <span className="text-[#d8f17b]">
              które działają
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-zinc-400 max-w-[80ch] mb-12"
          >
            Sprawdzone aplikacje i integracje. Ty dostajesz gotowy efekt - bez stresu
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--bg-graphite)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--bg-graphite)] to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-hidden py-8">
            <motion.div
              animate={{ x: ['0%', '-25%'] }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'linear' },
              }}
              className="flex gap-16 sm:gap-20 md:gap-24 pr-16 sm:pr-20 md:pr-24 w-max"
            >
              {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className="flex-shrink-0 flex flex-row items-center justify-center gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="relative h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={40}
                      height={40}
                      unoptimized={false}
                      className="opacity-80 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 object-contain p-1"
                    />
                  </div>
                  <span className="text-zinc-400 group-hover:text-[#d8f17b] font-medium text-sm sm:text-base whitespace-nowrap transition-colors duration-300">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

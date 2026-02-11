'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const tools = [
  { name: 'Figma', logo: '/assets/4680d4bfeaaa035e59431abad1f6e8df338068bc.png', external: false },
  { name: 'Cursor', logo: '/assets/63577b90243f42742e55175922f8674339decbad.png', external: false },
  { name: 'Google Sheets', logo: 'https://logo.clearbit.com/google.com', external: true },
  { name: 'Gmail', logo: 'https://logo.clearbit.com/google.com', external: true },
  { name: 'Google Drive', logo: 'https://logo.clearbit.com/google.com', external: true },
  { name: 'Airtable', logo: 'https://logo.clearbit.com/airtable.com', external: true },
  { name: 'Twilio', logo: 'https://logo.clearbit.com/twilio.com', external: true },
  { name: 'PDF.co', logo: 'https://logo.clearbit.com/pdf.co', external: true },
  { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com', external: true },
  { name: 'HubSpot', logo: 'https://logo.clearbit.com/hubspot.com', external: true },
  { name: 'PostgreSQL', logo: 'https://logo.clearbit.com/postgresql.org', external: true },
  { name: 'QuickBooks', logo: 'https://logo.clearbit.com/quickbooks.intuit.com', external: true },
  { name: 'Bubble', logo: 'https://logo.clearbit.com/bubble.io', external: true },
  { name: 'SendPulse', logo: 'https://logo.clearbit.com/sendpulse.com', external: true },
  { name: 'Make', logo: 'https://logo.clearbit.com/make.com', external: true },
  { name: 'n8n', logo: 'https://logo.clearbit.com/n8n.io', external: true },
  { name: 'ElevenLabs', logo: 'https://logo.clearbit.com/elevenlabs.io', external: true },
  { name: 'BigQuery', logo: 'https://logo.clearbit.com/cloud.google.com', external: true },
];

export function ToolsSection() {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full"
          >
            <span className="text-purple-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Nasze Narzędzia
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Używamy narzędzi,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              które działają
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-4 mb-12"
          >
            Opieramy się na sprawdzonych aplikacjach i integracjach, a Ty dostajesz gotowy efekt. Bez stresu.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div className="flex overflow-hidden py-8">
            <motion.div
              animate={{ x: [0, -100 * tools.length] }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' },
              }}
              className="flex gap-16 sm:gap-20 md:gap-24 pr-16 sm:pr-20 md:pr-24"
            >
              {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className="flex-shrink-0 flex flex-row items-center justify-center gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="relative h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 flex items-center justify-center">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={48}
                      height={48}
                      unoptimized={tool.external}
                      className="opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 object-contain max-h-8 sm:max-h-10 md:max-h-12 w-auto"
                    />
                  </div>
                  <span className="text-slate-400 group-hover:text-white font-medium text-sm sm:text-base whitespace-nowrap transition-colors duration-300">
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

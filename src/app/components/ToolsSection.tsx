import { motion } from 'motion/react';
import figmaLogo from 'figma:asset/4680d4bfeaaa035e59431abad1f6e8df338068bc.png';
import cursorLogo from 'figma:asset/63577b90243f42742e55175922f8674339decbad.png';

const tools = [
  {
    name: 'Figma',
    logo: figmaLogo,
  },
  {
    name: 'Cursor',
    logo: cursorLogo,
  },
];

export function ToolsSection() {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
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
            Mamy swoje sprawdzone metody, a Ty po prostu dostajesz gotowy efekt. Bez stresu.
          </motion.p>
        </div>

        {/* Infinite scrolling logos marquee */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex overflow-hidden py-8">
            <motion.div
              animate={{
                x: [0, -100 * tools.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-16 sm:gap-20 md:gap-24 pr-16 sm:pr-20 md:pr-24"
            >
              {/* Render logos multiple times for seamless loop */}
              {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex flex-row items-center justify-center gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-8 sm:h-10 md:h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
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

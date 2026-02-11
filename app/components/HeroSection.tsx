'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const phrases = [
'odzyskać czas',
'uprościć pracę',
'zredukować chaos',
'uniknąć błędów',
'zyskać spokój',
];

export function HeroSection() {
const [index, setIndex] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setIndex((prev) => (prev + 1) % phrases.length);
}, 3000);

```
return () => clearInterval(interval);
```

}, []);

return ( <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
{/* Background */} <div className="absolute inset-0 bg-[#0f0a1a]" />

```
  {/* Visible grid */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
        'linear-gradient(rgba(168,85,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />

  {/* Glow */}
  <div className="absolute w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[140px]" />

  {/* Content */}
  <div className="relative z-10 text-center max-w-4xl">
    <h1 className="text-white font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight">
      Pomożemy Ci
    </h1>

    <div className="relative h-[1.2em] flex justify-center my-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute font-bold text-transparent bg-clip-text"
          style={{
            backgroundImage:
              'linear-gradient(to right, #60A5FA, #A78BFA, #F472B6)',
            fontSize: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>

    <h1 className="text-white font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight">
      w codziennej pracy
    </h1>
  </div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-7 h-11 rounded-full border border-purple-400/60 flex items-start justify-center p-1"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1.5 h-2 rounded-full bg-purple-300"
      />
    </motion.div>
  </motion.div>
</section>
```

);
}

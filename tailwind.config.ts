import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: '#d8f17b',
        'graphite': {
          DEFAULT: '#0d0d0f',
          elevated: '#141416',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
        'accent-glow': '0 0 40px rgba(216, 241, 123, 0.2)',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      padding: {
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
};
export default config;

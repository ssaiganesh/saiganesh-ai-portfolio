import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0d1220',
        panel: '#111827',
        accent: '#22d3ee',
        accentSoft: '#0ea5e9',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(14, 165, 233, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;

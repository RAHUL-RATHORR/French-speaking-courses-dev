import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'french-blue': '#002654',
        'french-white': '#ffffff',
        'french-red': '#ce1126',
        'accent-blue': '#0066cc',
        'light-blue': '#f0f6ff',
        'dark-blue': '#001433',
      },
      boxShadow: {
        'french-sm': '0 1px 3px rgba(0, 38, 84, 0.1), 0 1px 2px rgba(0, 38, 84, 0.06)',
        'french-md': '0 4px 6px -1px rgba(0, 38, 84, 0.1), 0 2px 4px -1px rgba(0, 38, 84, 0.06)',
        'french-lg': '0 10px 15px -3px rgba(0, 38, 84, 0.1), 0 4px 6px -2px rgba(0, 38, 84, 0.05)',
        'french-xl': '0 20px 25px -5px rgba(0, 38, 84, 0.1), 0 10px 10px -5px rgba(0, 38, 84, 0.04)',
        'french-2xl': '0 25px 50px -12px rgba(0, 38, 84, 0.25)',
      },
      backgroundImage: {
        'french-gradient': 'linear-gradient(135deg, #002654 0%, #ffffff 50%, #ce1126 100%)',
        'french-gradient-horizontal': 'linear-gradient(90deg, #002654 33%, #ffffff 33% 66%, #ce1126 66%)',
        'hero-gradient': 'linear-gradient(135deg, #002654 0%, #0066cc 100%)',
        'hero-gradient-enhanced': 'linear-gradient(135deg, #001433 0%, #002654 25%, #0066cc 75%, #ce1126 100%)',
        'red-accent-gradient': 'linear-gradient(135deg, #ce1126 0%, #ff4757 100%)',
        'blue-accent-gradient': 'linear-gradient(135deg, #0066cc 0%, #3742fa 100%)',
      },
      animation: {
        'french-wave': 'french-wave 3s ease-in-out infinite',
      },
      keyframes: {
        'french-wave': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;

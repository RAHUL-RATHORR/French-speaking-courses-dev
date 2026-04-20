/**
 * Application Theme Configuration
 * This file contains theme constants for consistent styling across the application
 */

export const colors = {
  // Primary French flag colors
  french: {
    blue: '#002654',
    white: '#ffffff',
    red: '#ce1126',
  },
  // Accent colors
  accent: {
    blue: {
      light: '#f0f6ff',
      medium: '#0066cc',
      dark: '#001433',
    },
    red: {
      light: '#ff4757',
      medium: '#ce1126',
      dark: '#b8001f',
    }
  },
  // UI colors
  ui: {
    background: '#ffffff',
    foreground: '#1a1a1a',
    card: {
      background: '#ffffff',
      border: '#f0f0f0',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      tertiary: '#999999',
    }
  },
  // Level colors for courses
  level: {
    beginner: {
      background: '#4ade80', // green-500
      text: '#ffffff',
    },
    intermediate: {
      background: '#002654', // french-blue
      text: '#ffffff',
    },
    advanced: {
      background: '#ce1126', // french-red
      text: '#ffffff',
    },
    default: {
      background: '#6b7280', // gray-500
      text: '#ffffff',
    },
  }
};

export const gradients = {
  frenchFlag: 'linear-gradient(90deg, #002654 33%, #ffffff 33% 66%, #ce1126 66%)',
  frenchFlagDiagonal: 'linear-gradient(135deg, #002654 0%, #ffffff 50%, #ce1126 100%)',
  heroPrimary: 'linear-gradient(135deg, #002654 0%, #0066cc 100%)',
  heroEnhanced: 'linear-gradient(135deg, #001433 0%, #002654 25%, #0066cc 75%, #ce1126 100%)',
  redAccent: 'linear-gradient(135deg, #ce1126 0%, #ff4757 100%)',
  blueAccent: 'linear-gradient(135deg, #0066cc 0%, #3742fa 100%)',
  buttonHover: 'linear-gradient(135deg, #ce1126 0%, #ff4757 100%)',
  scrollbar: 'linear-gradient(180deg, #002654 0%, #ce1126 100%)',
  scrollbarHover: 'linear-gradient(180deg, #001433 0%, #b8001f 100%)',
};

export const animations = {
  hover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 50px -12px rgba(0, 38, 84, 0.25), 0 0 0 1px rgba(0, 38, 84, 0.05)',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease',
  },
  frenchWave: {
    keyframes: `
      @keyframes french-wave {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
      }
    `,
    animation: 'french-wave 3s ease-in-out infinite',
  },
  linkHover: {
    transition: 'all 0.3s ease',
    underline: {
      bottom: 0,
      left: 0,
      width: '0%',
      height: '0.5px',
      background: '#002654',
      transition: 'width 0.3s ease',
      hover: {
        width: '100%',
      },
    },
  },
};

export const shadows = {
  sm: '0 1px 3px rgba(0, 38, 84, 0.1), 0 1px 2px rgba(0, 38, 84, 0.06)',
  md: '0 4px 6px -1px rgba(0, 38, 84, 0.1), 0 2px 4px -1px rgba(0, 38, 84, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 38, 84, 0.1), 0 4px 6px -2px rgba(0, 38, 84, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 38, 84, 0.1), 0 10px 10px -5px rgba(0, 38, 84, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 38, 84, 0.25)',
};

export const borderRadius = {
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',   // Pill shape
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const theme = {
  colors,
  gradients,
  animations,
  shadows,
  borderRadius,
  spacing,
};

export default theme;

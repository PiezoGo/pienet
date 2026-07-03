import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pienet': {
          'black':   '#0A0A0A',
          'surface': '#141414',
          'card':    '#1C1C1C',
          'red':     '#E50914',
          'red-glow':'rgba(229, 9, 20, 0.4)',
          'zinc':    '#A1A1AA',
          'white':   '#FFFFFF',
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 20s linear infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(ellipse at center, rgba(229, 9, 20, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'red-glow': '0 0 30px rgba(229, 9, 20, 0.4)',
        'red-glow-sm': '0 0 15px rgba(229, 9, 20, 0.25)',
        'card': '0 4px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

export default config

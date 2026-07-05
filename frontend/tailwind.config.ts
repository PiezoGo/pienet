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
        'pm': {
          'void':    '#080808',
          'surface': '#111111',
          'card':    '#181818',
          'crimson': '#C8102E',
          'gold':    '#B89A6A',
          'white':   '#F5F0EB',
          'text':    '#E8E0D4',
          'muted':   '#7A7066',
          'border':  'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        inter:     ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':      'shimmer 1.5s infinite',
        'grain':        'grain 0.5s steps(1) infinite',
        'curtain-open': 'curtainOpen 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -3%)' },
          '20%':      { transform: 'translate(3%, 2%)' },
          '30%':      { transform: 'translate(-1%, 4%)' },
          '40%':      { transform: 'translate(4%, -1%)' },
          '50%':      { transform: 'translate(-3%, 3%)' },
          '60%':      { transform: 'translate(2%, -4%)' },
          '70%':      { transform: 'translate(-4%, 1%)' },
          '80%':      { transform: 'translate(1%, -2%)' },
          '90%':      { transform: 'translate(-2%, 2%)' },
        },
        curtainOpen: {
          '0%':   { clipPath: 'inset(0 50% 0 50%)' },
          '100%': { clipPath: 'inset(0 0% 0 0%)' },
        },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'vignette':          'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
        'hero-vignette':     'radial-gradient(ellipse at center, transparent 20%, rgba(8,8,8,0.6) 80%)',
      },
      boxShadow: {
        'crimson-glow':    '0 0 30px rgba(200,16,46,0.35)',
        'crimson-glow-sm': '0 0 15px rgba(200,16,46,0.2)',
        'gold-glow':       '0 0 20px rgba(184,154,106,0.25)',
        'card':            '0 8px 60px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config

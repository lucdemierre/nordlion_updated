import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FAF8F3',
          100: '#F5F0E6',
          200: '#EBE1CD',
          300: '#E0D2B4',
          400: '#D6C39B',
          500: '#D4AF37',
          600: '#B8962C',
          700: '#9C7D21',
          800: '#806416',
          900: '#644B0B',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1410 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(10,10,10,0.8) 50%, rgba(0,0,0,0.95) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

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
          950: '#4A380A',
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
          800: '#262626',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1410 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(10,10,10,0.8) 50%, rgba(0,0,0,0.95) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8962C 0%, #D4AF37 50%, #E8C95A 100%)',
        'radial-gold': 'radial-gradient(circle at center, #E8C95A 0%, #D4AF37 50%, #B8962C 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
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
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        rotateSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'gold': '0 0 40px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 60px rgba(212, 175, 55, 0.25)',
        'gold-xl': '0 0 80px rgba(212, 175, 55, 0.35)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'luxury-lg': '0 25px 80px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}

export default config

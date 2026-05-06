import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette derived from vintage luxury barbershop aesthetic
        obsidian: {
          DEFAULT: '#0C0C0C',
          50: '#1A1A1A',
          100: '#141414',
          200: '#0F0F0F',
          300: '#0A0A0A',
        },
        gold: {
          light: '#E8C96A',
          DEFAULT: '#C9A84C',
          dark: '#A68832',
          muted: '#8B7355',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#E8E0D0',
          muted: '#C8BBA8',
        },
        charcoal: {
          DEFAULT: '#2A2A2A',
          light: '#3A3A3A',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0C0C0C 0%, #1A1A1A 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0.8) 60%, rgba(12,12,12,1) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
export default config

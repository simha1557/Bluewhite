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
        sans: ['var(--font-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        chart: {
          '1': 'var(--color-chart-1)',
          '2': 'var(--color-chart-2)',
          '3': 'var(--color-chart-3)',
          '4': 'var(--color-chart-4)',
          '5': 'var(--color-chart-5)',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
        'star-border': 'star-border linear infinite',
        'star-border-enhanced': 'star-border-enhanced linear infinite',
        'star-flow': 'star-flow linear infinite',
        'star-flow-reverse': 'star-flow-reverse linear infinite',
        'star-flow-vertical': 'star-flow-vertical linear infinite',
        'star-flow-vertical-reverse': 'star-flow-vertical-reverse linear infinite',
        'star-pulse': 'star-pulse ease-in-out infinite',
        'light-beam': 'light-beam linear infinite',
        'light-beam-reverse': 'light-beam-reverse linear infinite',
        'light-beam-vertical': 'light-beam-vertical linear infinite',
        'light-beam-vertical-reverse': 'light-beam-vertical-reverse linear infinite',
        'light-glow': 'light-glow ease-in-out infinite',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
        'star-border': {
          '0%': { 
            backgroundPosition: '0% 50%',
            opacity: '0.9'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            opacity: '1'
          },
          '100%': { 
            backgroundPosition: '0% 50%',
            opacity: '0.9'
          },
        },
        'star-border-enhanced': {
          '0%': { 
            transform: 'rotate(0deg)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'rotate(180deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'rotate(360deg)',
            opacity: '0.8'
          },
        },
        'star-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'star-flow-reverse': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'star-flow-vertical': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'star-flow-vertical-reverse': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'star-pulse': {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '100%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'light-beam': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateX(0%)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0.8'
          },
        },
        'light-beam-reverse': {
          '0%': { 
            transform: 'translateX(100%)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateX(0%)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(-100%)',
            opacity: '0.8'
          },
        },
        'light-beam-vertical': {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateY(0%)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100%)',
            opacity: '0.8'
          },
        },
        'light-beam-vertical-reverse': {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateY(0%)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(-100%)',
            opacity: '0.8'
          },
        },
        'light-glow': {
          '0%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.6',
            transform: 'scale(1.05)'
          },
          '100%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
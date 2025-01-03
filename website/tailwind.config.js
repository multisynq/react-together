/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  safelist: ['outline', 'outline-1', 'outline-gray-400'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '600px',
        md: '864px',
        lg: '1024px',
        '2xl': '1766px',
      },
    },
    extend: {
      fontWeight: {
        'extra-bold': '800',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        full: '99px',
        xl: 'calc(var(--radius) * 2)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      boxShadow: {
        lineStyleDark: '0px 2px 0px 0px #374151',
        lineStyleMedium: '0px 1px 0px 0px #6B7280',
        lineStyleLight: '0px 2px 0px 0px #E5E7EB',
        button: '0.5px 1px 0px 0px #000',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.line-border': {
          '@apply border border-gray-700 shadow-lineStyleDark rounded-xl': {},
        },
        '.line-border-hover': {
          '@apply hover:shadow-lineStyleMedium': {},
        },
        '.active-border': { '@apply border border-gray-700 shadow-lineStyleDark rounded-2xl hover:shadow-lineStyleLight': {} },
        '.button-primary': {
          '@apply py-1 px-3 bg-blue-500 text-neutral-50 border border-neutral-900 hover:bg-blue-400 rounded-full shadow-button': {},
        },
        '.button-secondary': {
          '@apply py-1 px-3 bg-neutral-500 text-neutral-50 border border-neutral-900 hover:bg-neutral-400 rounded-full shadow-button': {},
        },
        '.button-caution': {
          '@apply py-1 px-3 bg-red-500 text-neutral-50 border border-neutral-900 rounded-3xl hover:bg-red-400 rounded-full shadow-button':
            {},
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
    require('tailwindcss-animate'),
  ],
}

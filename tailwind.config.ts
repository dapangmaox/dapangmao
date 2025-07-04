import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      typography: (theme: any) => ({
        invert: {
          css: {
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: 'transparent',
              borderRadius: theme('borderRadius.DEFAULT'),
              paddingLeft: theme('spacing[1]'),
              paddingRight: theme('spacing[1]'),
              paddingTop: theme('spacing[0.5]'),
              paddingBottom: theme('spacing[0.5]'),
            },
          },
        },
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            code: {
              color: theme('colors.slate.700'),
              backgroundColor: theme('colors.stone.100'),
              borderRadius: theme('borderRadius.DEFAULT'),
              paddingLeft: theme('spacing[1]'),
              paddingRight: theme('spacing[1]'),
              paddingTop: theme('spacing[0.5]'),
              paddingBottom: theme('spacing[0.5]'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
export default config;

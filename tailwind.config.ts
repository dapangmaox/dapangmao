import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
  plugins: [require('@tailwindcss/typography')],
};
export default config;

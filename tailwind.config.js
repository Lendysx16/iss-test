import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hover', [
        '@media (hover: hover) { &:hover }',
        '@media (hover: none) { &:active }',
      ]);
    }),
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        'background-accent': 'var(--color-background-accent)',
        border: 'var(--color-border)',
        'color-text': 'var(--color-text)',
        slider: 'var(--color-slider)',
        'slider-background': 'var(--color-slider-background)',
      },
    },
  },
};

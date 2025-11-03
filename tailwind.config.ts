import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B01611',
        base: '#121212',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'], // 👈 Add this
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com'],
  },
};

module.exports = nextConfig;


export default config;


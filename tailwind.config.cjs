/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#d1d0c5',
        gray40: '#646669',
        gray60: '#323437',
        gray80: '#2c2e31',
        black: '#232427',
        orange: '#e2b514',
        'dark-orange': '#bc9710',
      },
    },
  },
  plugins: [],
}

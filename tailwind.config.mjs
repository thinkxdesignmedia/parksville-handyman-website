/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
        },
        'orange': {
          600: '#ea580c',
          700: '#c2410c',
        },
        'neutral': {
          600: '#4b5563',
          700: '#374151',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        base: '1.0625rem',
        lg: '1.25rem',
      },
    },
  },
  plugins: [],
};

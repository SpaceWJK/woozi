/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        library: {
          bg: 'var(--color-bg)',
          shelf: 'var(--color-shelf)',
          surface: 'var(--color-surface)',
          cream: 'var(--color-cream)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          divider: 'var(--color-divider)',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'Noto Sans KR', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      maxWidth: {
        prose: '720px',
      },
    },
  },
  plugins: [],
}

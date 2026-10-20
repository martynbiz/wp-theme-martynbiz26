/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.js',
    './templates/**/*.html',
    './parts/**/*.html',
    './patterns/**/*.php',
    './*.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        term: {
          bg: '#0b0f14',
          panel: '#111821',
          line: '#1f2a36',
          text: '#c9d4df',
          dim: '#6b7d8f',
          green: '#3ddc84',
          cyan: '#4fc3f7',
          amber: '#ffb454',
          pink: '#ff6ac1',
        },
      },
    },
  },
  plugins: [],
};

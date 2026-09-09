import tailwindConfig from 'tailwindcss/defaultConfig';

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'easymoney-black': '#020305',
        'easymoney-green': '#00ff66',
        'easymoney-cyan': '#00e5ff',
        'easymoney-magenta': '#ff00aa',
        'easymoney-amber': '#ffb000',
        'easymoney-red': '#ff3344',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

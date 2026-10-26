export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
    colors: { dawn: '#EEF1F8', night: '#0F1325', nightcard: '#181E38', brand: '#5B5BF0' },
  } },
  plugins: [],
}

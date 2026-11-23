/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: {
    colors: {
      midnight: { 950:'#0B0618', 900:'#120A26', 800:'#1B1038', 700:'#251650', 600:'#2F1E63' },
      glow: { 300:'#C4B5FD', 400:'#A78BFA', 500:'#8B5CF6', 600:'#7C3AED' }
    },
    fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
    boxShadow: { glow: '0 0 40px rgba(139,92,246,.35)', card: '0 10px 40px rgba(0,0,0,.25)' }
  }},
  plugins: []
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette (replaced)
        'forest-950': '#0A1D13',
        'forest-900': '#0F2A1C',
        'forest-800': '#163B27',
        moss: '#588357',
        'bar-fill': '#28523E',
        'bar-track': '#81A17A',
        sage: '#E2E6D2',
        cream: '#F5EEEA',
        saffron: '#F7941D',
        pool: '#489EB2',
        sky: '#88A8BD',
        ink: '#0B1F14',
        'white-92': 'rgba(255,255,255,0.92)',
        'white-70': 'rgba(255,255,255,0.70)',
        danger: '#E5484D',
        // retain original for compatibility if any
        navy: '#0B2A5B',
        teal: '#14A3A3',
      },
      fontFamily: {
        // Typography tokens
        'display': ['"Cormorant Garamond"', 'serif'],
        'instrument': ['"Instrument Serif"', 'serif'],
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'big-shoulders': ['"Big Shoulders Display"', 'sans-serif'],
        'pixelify': ['"Pixelify Sans"', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'devanagari': ['"Noto Sans Devanagari"', 'sans-serif'],
        // default sans fallback
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '28px',
        'card-sm': '22px',
        'pill': '999px',
        'default': '8px',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '22px',
      },
      boxShadow: {
        'glass': '0 24px 60px rgba(0,0,0,0.28)',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

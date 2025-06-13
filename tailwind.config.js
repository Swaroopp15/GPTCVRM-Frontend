module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      /* 1️⃣  Gentle up‑and‑down motion */
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-24px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },

      /* 2️⃣  A few pastel tints that look nice together */
      colors: {
        bubble: {
          red:   '#f87171', // red‑100
          blue:  '#60a5fa', // blue‑100
          amber: '#fbbf24', // amber‑100
          teal:  '#2dd4bf', // teal‑100
        },
      },
    },
  },

  /* 3️⃣  Utility classes like animation-delay-2000 */
  plugins: [
    ({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': `${value}ms`,
          }),
        },
        { values: { 0: 0, 1000: 1000, 2000: 2000, 3000: 3000, 4000: 4000 } },
      );
    },
  ],
};

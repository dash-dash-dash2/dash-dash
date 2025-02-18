/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#FF5252',
          light: '#FF8585',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#45B7AE',
          light: '#66D4CC',
        },
        accent: {
          DEFAULT: '#FFD93D',
          dark: '#FFC107',
          light: '#FFE16A',
        },
        success: '#6BCB77',
        warning: '#FFD93D',
        error: '#FF6B6B',
        background: '#F8F9FA',
        foreground: '#212529',
        muted: '#6C757D',
        border: '#DEE2E6',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 
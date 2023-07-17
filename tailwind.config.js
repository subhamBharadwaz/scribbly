const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(120deg, #6836c9, #a770e2 50%, #e6a9fa 100%, #eed4f4 100%, #ff99d7)",
        "primary-gradient-2":
          "linear-gradient(120deg, #6836c9, #e6a9fa 100%, #eed4f4 100%, #ff99d7)",
        "secondary-gradient":
          "linear-gradient(to right, rgb(251, 146, 60), rgb(251, 113, 133))",
        "secondary-gradient-2":
          "linear-gradient(to right, rgb(251, 113, 133), rgb(217, 70, 239), rgb(99, 102, 241))",
        "secondary-gradient-3":
          "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
        "secondary-gradient-4":
          "linear-gradient(to bottom, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
        "heading-gradient":
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        "landing-gradient":
          "radial-gradient(circle, rgba(2, 0, 36, 0) 0, hsl(var(--background)) 100%)",
        "landing-gradient-2":
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)",
        "hero-gradient":
          "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
        "hero-glow":
          "conic-gradient(from 230.29deg at 51.63% 52.16%, #6836c9 0deg, #a770e2 67.5deg, #e6a9fa 198.75deg, #6836c9 251.25deg, #eed4f4 301.88deg, #ff99d7 360deg)",
      },
      boxShadow: {
        primary: "rgb(80 63 205 / 50%) 0px 1px 40px",
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
        "image-rotate": {
          "0%": { transform: "rotateX(25deg)" },
          "25%": { transform: "rotateX(25deg) scale(0.9)" },
          "60%": { transform: "none" },
          "100%": { transform: "none" },
        },
        "image-glow": {
          "0%": {
            opacity: 0,
            "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
          },
          "10%": {
            opacity: 1,
            "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
          },
          "100%": {
            opacity: 0.2,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "image-rotate": "image-rotate 1400ms ease forwards",
        "image-glow": "image-glow 4100ms 600ms ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

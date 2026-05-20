/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#ffb68c",
        secondary: "#ffb59d",
        accent:    "#e9c349",
        surface:   "#1A1A1A",
        "surface-alt": "#201f1f",
        bg:        "#0A0A0A",
        text:      "#e5e2e1",
        muted:     "#dac2b6",
        border:    "rgba(139, 69, 19, 0.2)",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body:    ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
        pill:  "999px",
      },
      boxShadow: {
        brand:      "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        "brand-hover": "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
        glow:       "0 0 18px 6px rgba(233, 195, 73, 0.25)",
        "primary-glow": "0 8px 24px rgba(255, 182, 140, 0.28)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #ffb68c 0%, #e9c349 100%)",
        "gradient-dark":  "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "gradient-surface": "linear-gradient(135deg, #1A1A1A 0%, #201f1f 100%)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-up":     "fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-in":     "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "scale-pop":   "scalePop 0.45s cubic-bezier(0.4, 0, 0.2, 1) both",
        "shimmer":     "shimmer 1.5s infinite",
        "pulse-glow":  "pulseGlow 2.4s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "page-fade":   "pageFade 0.4s ease",
        "spin-slow":   "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        scalePop: {
          "0%":   { transform: "scale(0.92)", opacity: "0" },
          "60%":  { transform: "scale(1.03)", opacity: "1" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(233, 195, 73, 0.0)" },
          "50%":      { boxShadow: "0 0 18px 6px rgba(233, 195, 73, 0.25)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        pageFade: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "brand": "1200px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
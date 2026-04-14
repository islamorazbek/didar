import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg:   { DEFAULT: "#fdf8f2", 2: "#f5ead8", 3: "#eeddca" },
        gold: { DEFAULT: "#9c6e1e", light: "#c9a452", dim: "rgba(156,110,30,0.25)" },
        text: { DEFAULT: "#1c1208", 2: "rgba(28,18,8,0.58)", 3: "rgba(28,18,8,0.36)" },
        cream: "#f5ece0",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "eyebrow": ["0.78rem", { letterSpacing: "0.45em", lineHeight: "1" }],
        "label":   ["0.72rem", { letterSpacing: "0.35em", lineHeight: "1" }],
      },
      animation: {
        shimmer:   "shimmerText 7s ease-in-out infinite",
        floatUp:   "floatUp 4s ease-in-out infinite",
        spinSlow:  "spin 22s linear infinite",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite",
      },
      keyframes: {
        floatUp:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseSoft: { "0%,100%": { opacity: "1" },               "50%": { opacity: "0.4" } },
      },
      backgroundSize: { "260": "260% auto" },
    },
  },
  plugins: [],
};

export default config;

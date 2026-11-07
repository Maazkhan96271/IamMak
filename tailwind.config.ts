import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        cyan: {
          DEFAULT: "#00d9ff",
          muted: "var(--cyan-muted)",
        },
        neon: {
          cyan: "#00d9ff",
          purple: "#a78bfa",
          amber: "#f59e0b",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        comfortaa: ["var(--font-comfortaa)", "Comfortaa", "sans-serif"],
        display: ["var(--font-comfortaa)", "Comfortaa", "Space Grotesk", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "serif"],
        mono: ["var(--font-dm-mono)", "DM Mono", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
        "spin-fast": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

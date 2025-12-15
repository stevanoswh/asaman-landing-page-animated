// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // --- 1) Slide in dari kanan ---
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        // --- 2) Slide in dari kiri ---
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        // --- 3) Pop-in (muncul membesar dikit) ---
        "pop-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9) translateY(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },

        // --- 4) Float sederhana (naik-turun) ---
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
          "100%": { transform: "translateY(0px)" },
        },

        // --- 5) Float ala luar angkasa (X+Y+rotate) ---
        "float-space": {
          "0%": {
            transform: "translate3d(0px, 0px, 0) rotate(-1deg)",
          },
          "25%": {
            transform: "translate3d(6px, -8px, 0) rotate(1deg)",
          },
          "50%": {
            transform: "translate3d(-4px, -14px, 0) rotate(0deg)",
          },
          "75%": {
            transform: "translate3d(-8px, -4px, 0) rotate(2deg)",
          },
          "100%": {
            transform: "translate3d(0px, 0px, 0) rotate(-1deg)",
          },
        },

        // --- 6) Globe berputar 360° ---
        "globe-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },

      animation: {

        // teks/komponen masuk
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "pop-in": "pop-in 0.25s ease-out forwards",

        // efek ngapung
        float: "float 4s ease-in-out infinite",
        "float-space": "float-space 8s ease-in-out infinite",

        // globe
        "globe-spin": "globe-spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

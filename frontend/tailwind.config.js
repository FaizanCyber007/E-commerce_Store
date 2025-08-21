/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        // Color Hunt palette: #B1F0F7 #81BFDA #F5F0CD #FADA7A
        primary: {
          50: "#f0fffe",
          100: "#ccfffe",
          200: "#99ffff",
          300: "#5cfcfd",
          400: "#22e9f0",
          500: "#81BFDA", // main
          600: "#0694a5",
          700: "#0a7686",
          800: "#0f5f6c",
          900: "#134e5a",
        },
        secondary: {
          50: "#f0fffe",
          100: "#ccfffe",
          200: "#9af8fd",
          300: "#5beff8",
          400: "#B1F0F7", // main
          500: "#0ac9e6",
          600: "#0ba5c7",
          700: "#0e85a2",
          800: "#156b83",
          900: "#17596e",
        },
        accent: {
          50: "#fef7ed",
          100: "#fdecd5",
          200: "#fbd5aa",
          300: "#f8b774",
          400: "#FADA7A", // main
          500: "#f2781a",
          600: "#e35d10",
          700: "#bc4710",
          800: "#953916",
          900: "#783015",
        },
        soft: {
          50: "#fefefc",
          100: "#fffef7",
          200: "#fffbea",
          300: "#fff6d4",
          400: "#F5F0CD", // main
          500: "#f1e6a8",
          600: "#e5d373",
          700: "#d2be47",
          800: "#b09b39",
          900: "#8f7f30",
        },
        dark: {
          50: "#f6f7f9",
          100: "#ebedf2",
          200: "#d3d8e2",
          300: "#aeb7c9",
          400: "#8390ab",
          500: "#647191",
          600: "#505b78",
          700: "#414a62",
          800: "#383f53",
          900: "#0f1418", // main dark
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          850: "#1a1f2e",
          900: "#111827",
          950: "#030712",
        },
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.25)",
        "soft-lg": "0 20px 40px rgba(0,0,0,0.3)",
        neon: "0 0 20px rgba(129, 191, 218, 0.5)",
        "neon-accent": "0 0 20px rgba(250, 218, 122, 0.5)",
        "inner-soft": "inset 0 2px 4px rgba(0,0,0,0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};

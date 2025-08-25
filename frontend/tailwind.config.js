// Tailwind CSS Configuration with CSS Variables
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind classes
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light: "var(--color-secondary-light)",
          dark: "var(--color-secondary-dark)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
          dark: "var(--color-accent-dark)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        border: {
          DEFAULT: "var(--border-primary)",
          subtle: "var(--border-subtle)",
          glass: "var(--border-glass)",
        },
        glass: "var(--bg-glass)",
      },
      backgroundColor: {
        glass: "var(--bg-glass)",
        "glass-hover": "var(--bg-glass-hover)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        card: "var(--bg-card)",
      },
      borderColor: {
        DEFAULT: "var(--border-primary)",
        subtle: "var(--border-subtle)",
        glass: "var(--border-glass)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};

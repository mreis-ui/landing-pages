import type { Config } from "tailwindcss";

/*
 * Flowbyte Systems — Marketing site Tailwind config
 * --------------------------------------------------
 * Inherits the Werkstatt ONE design DNA:
 *  - Industrial-technical, light-dominant, type-driven.
 *  - All colors resolve to CSS-vars from `src/styles/tokens.css`.
 *  - borderRadius capped at 8 px (rounded-lg). No xl/2xl bonanza.
 *  - NO gradient/glow utilities — that's by design (anti-AI-slop).
 *  - Inter Tight (UI/copy), JetBrains Mono (technical data / numerals).
 * Marketing-grade type scale (larger than the dense in-app scale).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "var(--color-accent)",
          "orange-hover": "var(--color-accent-hover)",
          "orange-quiet": "var(--color-accent-quiet)",
        },
        status: {
          success: "var(--color-status-ok)",
          warning: "var(--color-status-warn)",
          danger: "var(--color-status-err)",
          info: "var(--color-status-info)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
          sunken: "var(--color-surface-sunken)",
        },
        ink: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        line: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        // Tailwind compat aliases
        foreground: "var(--color-text-primary)",
        background: "var(--color-surface)",
        card: "var(--color-surface-elevated)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "IBM Plex Mono", "SF Mono", "Menlo", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-lg)",
        "2xl": "var(--radius-lg)",
        full: "9999px",
        pill: "9999px",
      },
      boxShadow: {
        none: "none",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-lg)",
        "2xl": "var(--shadow-lg)",
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px" }],
        xs: ["12px", { lineHeight: "18px" }],
        sm: ["14px", { lineHeight: "21px" }],
        base: ["16px", { lineHeight: "26px" }],
        lg: ["18px", { lineHeight: "29px" }],
        xl: ["21px", { lineHeight: "30px", letterSpacing: "-0.01em" }],
        "2xl": ["26px", { lineHeight: "33px", letterSpacing: "-0.02em" }],
        "3xl": ["33px", { lineHeight: "40px", letterSpacing: "-0.02em" }],
        "4xl": ["42px", { lineHeight: "48px", letterSpacing: "-0.025em" }],
        "5xl": ["56px", { lineHeight: "60px", letterSpacing: "-0.03em" }],
        "6xl": ["72px", { lineHeight: "74px", letterSpacing: "-0.035em" }],
        // mono numerals for KPI / stat blocks
        kpi: ["40px", { lineHeight: "44px", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "68ch",
      },
      keyframes: {
        slideUpFade: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "slide-up-fade": "slideUpFade 320ms cubic-bezier(0.2, 0, 0, 1) both",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "out-smooth": "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

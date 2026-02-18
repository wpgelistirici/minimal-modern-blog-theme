import colors from './src/styles/tokens/colors.json' with { type: 'json' };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.html",
    "./src/components/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primitive colors
        primary: colors.primitive.primary,
        secondary: colors.primitive.secondary,
        accent: colors.primitive.accent,
        neutral: colors.primitive.neutral,
        
        // Semantic colors
        success: colors.semantic.success,
        error: colors.semantic.error,
        warning: colors.semantic.warning,
        info: colors.semantic.info,
        
        // Surface aliases (use CSS variables for dark mode support)
        surface: {
          background: 'rgb(var(--color-surface-background) / <alpha-value>)',
          foreground: 'rgb(var(--color-surface-foreground) / <alpha-value>)',
          card: 'rgb(var(--color-surface-card) / <alpha-value>)',
          cardForeground: 'rgb(var(--color-surface-cardForeground) / <alpha-value>)',
          border: 'rgb(var(--color-surface-border) / <alpha-value>)',
          muted: 'rgb(var(--color-surface-muted) / <alpha-value>)',
          mutedForeground: 'rgb(var(--color-surface-mutedForeground) / <alpha-value>)',
        },
      },
    },
  },
  safelist: [
    // Ensure all color utilities are generated
    {
      pattern: /bg-(primary|secondary|accent|neutral|success|error|warning|info)-(50|100|200|300|400|500|600|700|800|900|950|DEFAULT|light|dark)/,
    },
    {
      pattern: /text-(primary|secondary|accent|neutral|success|error|warning|info)-(50|100|200|300|400|500|600|700|800|900|950|DEFAULT|light|dark)/,
    },
    {
      pattern: /border-(primary|secondary|accent|neutral|success|error|warning|info)-(50|100|200|300|400|500|600|700|800|900|950|DEFAULT|light|dark)/,
    },
    {
      pattern: /bg-surface-(background|foreground|card|cardForeground|border|muted|mutedForeground)/,
    },
    {
      pattern: /text-surface-(background|foreground|card|cardForeground|border|muted|mutedForeground)/,
    },
    {
      pattern: /border-surface-(background|foreground|card|cardForeground|border|muted|mutedForeground)/,
    },
  ],
  plugins: [],
}

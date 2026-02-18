import colors from './src/styles/tokens/colors.json' assert { type: 'json' };

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
        
        // Surface aliases (light mode)
        surface: {
          background: colors.surface.light.background,
          foreground: colors.surface.light.foreground,
          card: colors.surface.light.card,
          cardForeground: colors.surface.light.cardForeground,
          border: colors.surface.light.border,
          muted: colors.surface.light.muted,
          mutedForeground: colors.surface.light.mutedForeground,
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

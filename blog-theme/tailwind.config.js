import colors from './src/styles/tokens/colors.json' with { type: 'json' };
import typography from './src/styles/tokens/typography.json' with { type: 'json' };
import spacing from './src/styles/tokens/spacing.json' with { type: 'json' };
import borders from './src/styles/tokens/borders.json' with { type: 'json' };
import shadows from './src/styles/tokens/shadows.json' with { type: 'json' };

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
      spacing: spacing.spacing,
      borderRadius: borders.borderRadius,
      boxShadow: shadows.boxShadow,
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
        sans: ['IBM Plex Sans', 'sans-serif'], // Default sans-serif
      },
      fontSize: {
        'display': [typography.fontSize.display.value, {
          lineHeight: typography.fontSize.display.lineHeight,
          fontWeight: typography.fontSize.display.fontWeight,
          letterSpacing: typography.fontSize.display.letterSpacing,
        }],
        'h1': [typography.fontSize.h1.value, {
          lineHeight: typography.fontSize.h1.lineHeight,
          fontWeight: typography.fontSize.h1.fontWeight,
          letterSpacing: typography.fontSize.h1.letterSpacing,
        }],
        'h2': [typography.fontSize.h2.value, {
          lineHeight: typography.fontSize.h2.lineHeight,
          fontWeight: typography.fontSize.h2.fontWeight,
          letterSpacing: typography.fontSize.h2.letterSpacing,
        }],
        'h3': [typography.fontSize.h3.value, {
          lineHeight: typography.fontSize.h3.lineHeight,
          fontWeight: typography.fontSize.h3.fontWeight,
          letterSpacing: typography.fontSize.h3.letterSpacing,
        }],
        'h4': [typography.fontSize.h4.value, {
          lineHeight: typography.fontSize.h4.lineHeight,
          fontWeight: typography.fontSize.h4.fontWeight,
          letterSpacing: typography.fontSize.h4.letterSpacing,
        }],
        'h5': [typography.fontSize.h5.value, {
          lineHeight: typography.fontSize.h5.lineHeight,
          fontWeight: typography.fontSize.h5.fontWeight,
          letterSpacing: typography.fontSize.h5.letterSpacing,
        }],
        'h6': [typography.fontSize.h6.value, {
          lineHeight: typography.fontSize.h6.lineHeight,
          fontWeight: typography.fontSize.h6.fontWeight,
          letterSpacing: typography.fontSize.h6.letterSpacing,
        }],
        'body-xl': [typography.fontSize['body-xl'].value, {
          lineHeight: typography.fontSize['body-xl'].lineHeight,
          fontWeight: typography.fontSize['body-xl'].fontWeight,
          letterSpacing: typography.fontSize['body-xl'].letterSpacing,
        }],
        'body-lg': [typography.fontSize['body-lg'].value, {
          lineHeight: typography.fontSize['body-lg'].lineHeight,
          fontWeight: typography.fontSize['body-lg'].fontWeight,
          letterSpacing: typography.fontSize['body-lg'].letterSpacing,
        }],
        'body': [typography.fontSize.body.value, {
          lineHeight: typography.fontSize.body.lineHeight,
          fontWeight: typography.fontSize.body.fontWeight,
          letterSpacing: typography.fontSize.body.letterSpacing,
        }],
        'body-sm': [typography.fontSize['body-sm'].value, {
          lineHeight: typography.fontSize['body-sm'].lineHeight,
          fontWeight: typography.fontSize['body-sm'].fontWeight,
          letterSpacing: typography.fontSize['body-sm'].letterSpacing,
        }],
        'caption': [typography.fontSize.caption.value, {
          lineHeight: typography.fontSize.caption.lineHeight,
          fontWeight: typography.fontSize.caption.fontWeight,
          letterSpacing: typography.fontSize.caption.letterSpacing,
        }],
        'overline': [typography.fontSize.overline.value, {
          lineHeight: typography.fontSize.overline.lineHeight,
          fontWeight: typography.fontSize.overline.fontWeight,
          letterSpacing: typography.fontSize.overline.letterSpacing,
        }],
      },
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.body').join(', '),
            color: 'rgb(var(--color-surface-foreground))',
            h1: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h1.fontWeight,
            },
            h2: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h2.fontWeight,
            },
            h3: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h3.fontWeight,
            },
            h4: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h4.fontWeight,
            },
            h5: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h5.fontWeight,
            },
            h6: {
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: typography.fontSize.h6.fontWeight,
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
            },
          },
        },
      }),
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
    // Ensure spacing utilities are generated
    {
      pattern: /p[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /m[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /gap-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    {
      pattern: /space-[xy]-(0|1|2|3|4|5|6|8|10|12|16|20|24)/,
    },
    // Ensure border radius utilities are generated
    {
      pattern: /rounded-(none|sm|md|lg|xl|full)/,
    },
    {
      pattern: /rounded-[trbl]-(none|sm|md|lg|xl|full)/,
    },
    {
      pattern: /rounded-[trbl][trbl]-(none|sm|md|lg|xl|full)/,
    },
    // Ensure shadow utilities are generated
    {
      pattern: /shadow-(sm|md|lg|xl)/,
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

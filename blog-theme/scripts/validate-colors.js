#!/usr/bin/env node

/**
 * Color Token Validation Script
 * 
 * This script validates that:
 * 1. All colors in colors.json are valid HEX format
 * 2. All required color tokens are present
 * 3. Contrast ratios meet WCAG AA standards for key combinations
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readJSONFile, isValidHex, getContrastRatio, formatResults } from './validation-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Read colors.json with proper error handling
    const colorsPath = join(__dirname, '../src/styles/tokens/colors.json');
    const colors = readJSONFile(colorsPath, 'colors.json');
    
    // Validation results
    const results = {
      passed: 0,
      failed: 0,
      errors: []
    };

    console.log('🎨 Color Token Validation\n');
    console.log('='.repeat(50));
    
    runValidations(colors, results);
    
    // Format and display results
    const success = formatResults(results);
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Fatal error during validation:');
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

function runValidations(colors, results) {

  // Test 1: Validate HEX format
  console.log('\n📋 Test 1: Validating HEX format...');

  function validateHexInObject(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string') {
        if (isValidHex(value)) {
          results.passed++;
        } else {
          results.failed++;
          results.errors.push(`Invalid HEX format at ${currentPath}: ${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        validateHexInObject(value, currentPath);
      }
    }
  }

  validateHexInObject(colors);

  if (results.errors.length === 0) {
    console.log('✅ All colors have valid HEX format');
  } else {
    console.log('❌ Found invalid HEX colors:');
    results.errors.forEach(err => console.log(`   - ${err}`));
  }

  // Test 2: Required tokens exist
  console.log('\n📋 Test 2: Checking required tokens...');

  const requiredTokens = [
    ['primitive', 'primary'],
    ['primitive', 'secondary'],
    ['primitive', 'accent'],
    ['primitive', 'neutral'],
    ['semantic', 'success'],
    ['semantic', 'error'],
    ['semantic', 'warning'],
    ['semantic', 'info'],
    ['surface', 'light'],
    ['surface', 'dark']
  ];

  let allRequiredPresent = true;
  requiredTokens.forEach(([category, token]) => {
    if (!colors[category] || !colors[category][token]) {
      console.log(`❌ Missing required token: ${category}.${token}`);
      results.failed++;
      allRequiredPresent = false;
    } else {
      results.passed++;
    }
  });

  if (allRequiredPresent) {
    console.log('✅ All required tokens are present');
  }

  // Test 3: WCAG AA Contrast ratios
  console.log('\n📋 Test 3: WCAG AA Contrast Ratios (minimum 4.5:1)...');

  const contrastTests = [
    {
      name: 'Light: background + foreground',
      bg: colors.surface.light.background,
      fg: colors.surface.light.foreground
    },
    {
      name: 'Light: card + cardForeground',
      bg: colors.surface.light.card,
      fg: colors.surface.light.cardForeground
    },
    {
      name: 'Dark: background + foreground',
      bg: colors.surface.dark.background,
      fg: colors.surface.dark.foreground
    },
    {
      name: 'Dark: card + cardForeground',
      bg: colors.surface.dark.card,
      fg: colors.surface.dark.cardForeground
    },
    {
      name: 'Primary 500 + white',
      bg: colors.primitive.primary['500'],
      fg: '#FFFFFF'
    },
    {
      name: 'Secondary 500 + white',
      bg: colors.primitive.secondary['500'],
      fg: '#FFFFFF'
    },
    {
      name: 'Success + white',
      bg: colors.semantic.success.DEFAULT,
      fg: '#FFFFFF'
    },
    {
      name: 'Error + white',
      bg: colors.semantic.error.DEFAULT,
      fg: '#FFFFFF'
    }
  ];

  contrastTests.forEach(test => {
    const ratio = getContrastRatio(test.bg, test.fg);
    const passes = ratio >= 4.5;
    
    if (passes) {
      console.log(`✅ ${test.name}: ${ratio.toFixed(2)}:1`);
      results.passed++;
    } else {
      console.log(`❌ ${test.name}: ${ratio.toFixed(2)}:1 (fails WCAG AA)`);
      results.failed++;
    }
  });

  // Test 4: Color scales have all required shades
console.log('\n📋 Test 4: Checking color scales...');

const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const primitiveColors = ['primary', 'secondary', 'accent', 'neutral'];

primitiveColors.forEach(colorName => {
  const missing = requiredShades.filter(shade => !colors.primitive[colorName][shade]);
  
  if (missing.length === 0) {
    console.log(`✅ ${colorName}: All 11 shades present`);
    results.passed++;
  } else {
    console.log(`❌ ${colorName}: Missing shades: ${missing.join(', ')}`);
    results.failed++;
  }
});
}

// Run main function
main();

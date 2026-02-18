#!/usr/bin/env node

/**
 * Token Validation Script
 * 
 * This script validates that:
 * 1. All spacing values follow the 4px grid system
 * 2. Border radius values match design system specifications
 * 3. Shadow values are properly formatted
 * 4. All tokens are present and properly structured
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read token files
const spacingPath = join(__dirname, '../src/styles/tokens/spacing.json');
const bordersPath = join(__dirname, '../src/styles/tokens/borders.json');
const shadowsPath = join(__dirname, '../src/styles/tokens/shadows.json');

const spacing = JSON.parse(fs.readFileSync(spacingPath, 'utf8'));
const borders = JSON.parse(fs.readFileSync(bordersPath, 'utf8'));
const shadows = JSON.parse(fs.readFileSync(shadowsPath, 'utf8'));

let hasErrors = false;

console.log('🔍 Validating Design Tokens...\n');

// Validate spacing tokens
console.log('📏 Validating Spacing Tokens:');
const expectedSpacingKeys = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'];
const expectedSpacingValues = {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px'
};

if (!spacing.spacing) {
  console.error('  ❌ Missing "spacing" key in spacing.json');
  hasErrors = true;
} else {
  expectedSpacingKeys.forEach(key => {
    if (!spacing.spacing[key]) {
      console.error(`  ❌ Missing spacing.${key}`);
      hasErrors = true;
    } else if (spacing.spacing[key] !== expectedSpacingValues[key]) {
      console.error(`  ❌ spacing.${key} should be "${expectedSpacingValues[key]}" but got "${spacing.spacing[key]}"`);
      hasErrors = true;
    } else {
      console.log(`  ✅ spacing.${key} = ${spacing.spacing[key]}`);
    }
  });
  
  // Check for 4px grid compliance (except for 0)
  Object.entries(spacing.spacing).forEach(([key, value]) => {
    if (key !== '0') {
      const pxValue = parseInt(value);
      if (isNaN(pxValue) || pxValue % 4 !== 0) {
        console.error(`  ❌ spacing.${key} = ${value} does not follow 4px grid system`);
        hasErrors = true;
      }
    }
  });
}

console.log('\n📐 Validating Border Radius Tokens:');
const expectedBorderKeys = ['none', 'sm', 'md', 'lg', 'xl', 'full'];
const expectedBorderValues = {
  'none': '0px',
  'sm': '2px',
  'md': '4px',
  'lg': '8px',
  'xl': '12px',
  'full': '9999px'
};

if (!borders.borderRadius) {
  console.error('  ❌ Missing "borderRadius" key in borders.json');
  hasErrors = true;
} else {
  expectedBorderKeys.forEach(key => {
    if (!borders.borderRadius[key]) {
      console.error(`  ❌ Missing borderRadius.${key}`);
      hasErrors = true;
    } else if (borders.borderRadius[key] !== expectedBorderValues[key]) {
      console.error(`  ❌ borderRadius.${key} should be "${expectedBorderValues[key]}" but got "${borders.borderRadius[key]}"`);
      hasErrors = true;
    } else {
      console.log(`  ✅ borderRadius.${key} = ${borders.borderRadius[key]}`);
    }
  });
}

console.log('\n✨ Validating Shadow Tokens:');
const expectedShadowKeys = ['sm', 'md', 'lg', 'xl'];
const expectedShadowValues = {
  'sm': '0 1px 2px 0 rgba(30, 34, 40, 0.04)',
  'md': '0 2px 8px 0 rgba(30, 34, 40, 0.08)',
  'lg': '0 4px 16px 0 rgba(30, 34, 40, 0.12)',
  'xl': '0 8px 32px 0 rgba(30, 34, 40, 0.16)'
};

if (!shadows.boxShadow) {
  console.error('  ❌ Missing "boxShadow" key in shadows.json');
  hasErrors = true;
} else {
  expectedShadowKeys.forEach(key => {
    if (!shadows.boxShadow[key]) {
      console.error(`  ❌ Missing boxShadow.${key}`);
      hasErrors = true;
    } else if (shadows.boxShadow[key] !== expectedShadowValues[key]) {
      console.error(`  ❌ boxShadow.${key} should be "${expectedShadowValues[key]}" but got "${shadows.boxShadow[key]}"`);
      hasErrors = true;
    } else {
      console.log(`  ✅ boxShadow.${key} = ${shadows.boxShadow[key]}`);
    }
  });
  
  // Validate shadow format (should be valid CSS shadow syntax)
  Object.entries(shadows.boxShadow).forEach(([key, value]) => {
    // CSS shadow syntax: offset-x offset-y blur-radius spread-radius color
    const shadowRegex = /^\d+\s+\d+px\s+\d+px\s+\d+\s+rgba?\([^)]+\)$/;
    if (!shadowRegex.test(value.replace(/\s+/g, ' '))) {
      // More lenient check - just ensure it contains rgba and reasonable structure
      if (!value.includes('rgba') && !value.includes('rgb')) {
        console.error(`  ❌ boxShadow.${key} has invalid CSS shadow syntax: ${value}`);
        hasErrors = true;
      }
    }
  });
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Validation failed! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ All tokens validated successfully!');
  console.log('\n📊 Token Summary:');
  console.log(`  • Spacing tokens: ${Object.keys(spacing.spacing).length}`);
  console.log(`  • Border radius tokens: ${Object.keys(borders.borderRadius).length}`);
  console.log(`  • Shadow tokens: ${Object.keys(shadows.boxShadow).length}`);
  process.exit(0);
}

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

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readJSONFile } from './validation-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Read token files with proper error handling
    const spacingPath = join(__dirname, '../src/styles/tokens/spacing.json');
    const bordersPath = join(__dirname, '../src/styles/tokens/borders.json');
    const shadowsPath = join(__dirname, '../src/styles/tokens/shadows.json');

    const spacing = readJSONFile(spacingPath, 'spacing.json');
    const borders = readJSONFile(bordersPath, 'borders.json');
    const shadows = readJSONFile(shadowsPath, 'shadows.json');

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

    expectedSpacingKeys.forEach(key => {
      if (spacing.spacing[key]) {
        if (spacing.spacing[key] === expectedSpacingValues[key]) {
          console.log(`  ✅ spacing.${key} = ${spacing.spacing[key]}`);
        } else {
          console.error(`  ❌ spacing.${key} should be ${expectedSpacingValues[key]}, got ${spacing.spacing[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing spacing.${key}`);
        hasErrors = true;
      }
    });

    // Validate 4px grid system
    const spacingValuesInPx = Object.values(spacing.spacing).map(v => parseInt(v));
    const invalidSpacing = spacingValuesInPx.filter(v => v !== 0 && v % 4 !== 0);
    if (invalidSpacing.length > 0) {
      console.error(`  ❌ Some spacing values don't follow 4px grid: ${invalidSpacing.join(', ')}`);
      hasErrors = true;
    }

    // Validate border radius tokens
    console.log('\n📐 Validating Border Radius Tokens:');
    const expectedBorderRadius = {
      'none': '0px',
      'sm': '2px',
      'md': '4px',
      'lg': '8px',
      'xl': '12px',
      'full': '9999px'
    };

    Object.entries(expectedBorderRadius).forEach(([key, expectedValue]) => {
      if (borders.borderRadius[key]) {
        if (borders.borderRadius[key] === expectedValue) {
          console.log(`  ✅ borderRadius.${key} = ${borders.borderRadius[key]}`);
        } else {
          console.error(`  ❌ borderRadius.${key} should be ${expectedValue}, got ${borders.borderRadius[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing borderRadius.${key}`);
        hasErrors = true;
      }
    });

    // Validate shadow tokens
    console.log('\n✨ Validating Shadow Tokens:');
    const expectedShadows = ['sm', 'md', 'lg', 'xl'];
    // Updated regex to handle shadow values without 'px' unit on offset values
    const shadowRegex = /^-?\d+(\.\d+)?(px)?\s+-?\d+(\.\d+)?(px)?\s+\d+(\.\d+)?(px)?\s+\d+(\.\d+)?(px)?\s+rgba?\([^)]+\)$/;

    expectedShadows.forEach(key => {
      if (shadows.boxShadow[key]) {
        if (shadowRegex.test(shadows.boxShadow[key])) {
          console.log(`  ✅ boxShadow.${key} = ${shadows.boxShadow[key]}`);
        } else {
          console.error(`  ❌ boxShadow.${key} has invalid format: ${shadows.boxShadow[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing boxShadow.${key}`);
        hasErrors = true;
      }
    });

    // Summary
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.error('❌ Token validation failed with errors');
      process.exit(1);
    } else {
      console.log('✅ All tokens validated successfully!');
      console.log('\n📊 Token Summary:');
      console.log(`  • Spacing tokens: ${Object.keys(spacing.spacing).length}`);
      console.log(`  • Border radius tokens: ${Object.keys(borders.borderRadius).length}`);
      console.log(`  • Shadow tokens: ${Object.keys(shadows.boxShadow).length}`);
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n❌ Fatal error during validation:');
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

// Run main function
main();

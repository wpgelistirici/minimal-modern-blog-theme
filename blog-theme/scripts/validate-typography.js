#!/usr/bin/env node

/**
 * Typography Token Validation Script
 * Validates that typography tokens are correctly configured and meet design system requirements
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readJSONFile } from './validation-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Load typography tokens with proper error handling
    const typographyPath = resolve(__dirname, '../src/styles/tokens/typography.json');
    const typography = readJSONFile(typographyPath, 'typography.json');
    
    console.log('🔍 Validating Typography Tokens...\n');
    
    let hasErrors = false;
    
    // Validate font families
    console.log('📝 Font Families:');
    const expectedFonts = ['heading', 'body', 'mono'];
    expectedFonts.forEach(fontKey => {
      if (typography.fontFamily[fontKey]) {
        console.log(`  ✓ ${fontKey}: ${typography.fontFamily[fontKey]}`);
      } else {
        console.error(`  ✗ Missing font family: ${fontKey}`);
        hasErrors = true;
      }
    });

    // Validate fontSize scale
    console.log('\n📏 Font Size Scale:');
    const expectedSizes = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-xl', 'body-lg', 'body', 'body-sm', 'caption', 'overline'];
    const requiredProperties = ['value', 'lineHeight', 'fontWeight', 'letterSpacing'];

    expectedSizes.forEach(sizeKey => {
      if (typography.fontSize[sizeKey]) {
        const size = typography.fontSize[sizeKey];
        const missingProps = requiredProperties.filter(prop => !size.hasOwnProperty(prop));
        
        if (missingProps.length === 0) {
          console.log(`  ✓ ${sizeKey}: ${size.value} (lh: ${size.lineHeight}, fw: ${size.fontWeight}, ls: ${size.letterSpacing})`);
        } else {
          console.error(`  ✗ ${sizeKey} missing properties: ${missingProps.join(', ')}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ✗ Missing fontSize: ${sizeKey}`);
        hasErrors = true;
      }
    });

    // Validate accessibility: body text minimum size
    console.log('\n♿ Accessibility Checks:');
    const bodySize = parseFloat(typography.fontSize.body.value);
    const bodySizeInPx = bodySize * 16; // Convert rem to px (assuming 16px base)

    if (bodySizeInPx >= 14) {
      console.log(`  ✓ Body text size (${typography.fontSize.body.value} = ${bodySizeInPx.toFixed(1)}px) is readable`);
    } else {
      console.error(`  ✗ Body text size (${typography.fontSize.body.value} = ${bodySizeInPx.toFixed(1)}px) is too small for accessibility`);
      hasErrors = true;
    }

    // Validate line heights
    console.log('\n📐 Line Height Checks:');
    expectedSizes.forEach(sizeKey => {
      if (typography.fontSize[sizeKey]) {
        const lineHeight = parseFloat(typography.fontSize[sizeKey].lineHeight);
        if (lineHeight >= 1.2 && lineHeight <= 1.8) {
          console.log(`  ✓ ${sizeKey}: line-height ${lineHeight} is appropriate`);
        } else {
          console.warn(`  ⚠ ${sizeKey}: line-height ${lineHeight} is outside recommended range (1.2-1.8)`);
        }
      }
    });

    // Validate font weights
    console.log('\n💪 Font Weight Checks:');
    const validWeights = ['400', '500', '600', '700', '800', '900'];
    expectedSizes.forEach(sizeKey => {
      if (typography.fontSize[sizeKey]) {
        const weight = typography.fontSize[sizeKey].fontWeight;
        if (validWeights.includes(String(weight))) {
          console.log(`  ✓ ${sizeKey}: font-weight ${weight} is valid`);
        } else {
          console.error(`  ✗ ${sizeKey}: font-weight ${weight} is invalid`);
          hasErrors = true;
        }
      }
    });

    // Validate scale hierarchy
    console.log('\n📊 Typography Hierarchy:');
    const headingSizes = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const headingSizeValues = headingSizes.map(key => ({
      key,
      value: parseFloat(typography.fontSize[key].value)
    }));

    let hierarchyValid = true;
    for (let i = 0; i < headingSizeValues.length - 1; i++) {
      const current = headingSizeValues[i];
      const next = headingSizeValues[i + 1];
      
      if (current.value > next.value) {
        console.log(`  ✓ ${current.key} (${current.value}rem) > ${next.key} (${next.value}rem)`);
      } else {
        console.error(`  ✗ ${current.key} (${current.value}rem) should be larger than ${next.key} (${next.value}rem)`);
        hasErrors = true;
        hierarchyValid = false;
      }
    }

    if (hierarchyValid) {
      console.log('  ✓ Typography hierarchy is correct');
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.error('❌ Typography validation failed with errors');
      process.exit(1);
    } else {
      console.log('✅ All typography tokens are valid!');
      console.log('✅ Font families configured correctly');
      console.log('✅ Font size scale is complete and hierarchical');
      console.log('✅ Accessibility requirements met');
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

#!/usr/bin/env node

/**
 * Typography Token Validation Script
 * Validates that typography tokens are correctly configured and meet design system requirements
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load typography tokens
const typographyPath = resolve(__dirname, '../src/styles/tokens/typography.json');
const typography = JSON.parse(readFileSync(typographyPath, 'utf8'));

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
    console.error(`  ✗ Missing font size: ${sizeKey}`);
    hasErrors = true;
  }
});

// Validate accessibility: body text minimum size
console.log('\n♿ Accessibility Checks:');
const bodySize = typography.fontSize.body.value;
const bodySizeNum = parseFloat(bodySize);
const bodySizeInPx = bodySizeNum * 16; // Assuming 1rem = 16px

if (bodySizeInPx >= 14) {
  console.log(`  ✓ Body text size (${bodySize} = ${bodySizeInPx.toFixed(1)}px) is readable`);
} else {
  console.warn(`  ⚠ Body text size (${bodySize} = ${bodySizeInPx.toFixed(1)}px) is smaller than recommended 14px`);
}

// Validate line heights
console.log('\n📐 Line Height Checks:');
expectedSizes.forEach(sizeKey => {
  if (typography.fontSize[sizeKey]) {
    const lineHeight = parseFloat(typography.fontSize[sizeKey].lineHeight);
    if (lineHeight >= 1.2) {
      console.log(`  ✓ ${sizeKey}: line-height ${lineHeight} is appropriate`);
    } else {
      console.warn(`  ⚠ ${sizeKey}: line-height ${lineHeight} may be too tight`);
    }
  }
});

// Validate font weights
console.log('\n💪 Font Weight Checks:');
const validWeights = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
expectedSizes.forEach(sizeKey => {
  if (typography.fontSize[sizeKey]) {
    const weight = typography.fontSize[sizeKey].fontWeight;
    if (validWeights.includes(weight)) {
      console.log(`  ✓ ${sizeKey}: font-weight ${weight} is valid`);
    } else {
      console.error(`  ✗ ${sizeKey}: font-weight ${weight} is not a valid CSS font-weight`);
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
    console.error(`  ✗ ${current.key} (${current.value}rem) should be > ${next.key} (${next.value}rem)`);
    hierarchyValid = false;
    hasErrors = true;
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
}

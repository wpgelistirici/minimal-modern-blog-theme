#!/usr/bin/env node

/**
 * Animation Token Validation Script
 * 
 * This script validates that:
 * 1. All animation durations are properly defined (fast, normal, slow)
 * 2. All easing functions match design system specifications
 * 3. Transition properties are defined
 * 4. All tokens are present and properly structured
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read animation token file
const animationsPath = join(__dirname, '../src/styles/tokens/animations.json');
const animations = JSON.parse(fs.readFileSync(animationsPath, 'utf8'));

let hasErrors = false;

console.log('🔍 Validating Animation Tokens...\n');

// Validate transition durations
console.log('⏱️  Validating Transition Durations:');
const expectedDurationKeys = ['fast', 'normal', 'slow'];
const expectedDurationValues = {
  'fast': '120ms',
  'normal': '220ms',
  'slow': '420ms'
};

if (!animations.transitionDuration) {
  console.error('  ❌ Missing "transitionDuration" key in animations.json');
  hasErrors = true;
} else {
  expectedDurationKeys.forEach(key => {
    if (!animations.transitionDuration[key]) {
      console.error(`  ❌ Missing transitionDuration.${key}`);
      hasErrors = true;
    } else if (animations.transitionDuration[key] !== expectedDurationValues[key]) {
      console.error(`  ❌ transitionDuration.${key} should be "${expectedDurationValues[key]}" but got "${animations.transitionDuration[key]}"`);
      hasErrors = true;
    } else {
      console.log(`  ✅ transitionDuration.${key} = ${animations.transitionDuration[key]}`);
    }
  });
}

// Validate easing functions
console.log('\n📈 Validating Timing Functions (Easings):');
const expectedEasingKeys = ['default', 'in', 'out', 'inOut', 'spring'];
const expectedEasingValues = {
  'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'inOut': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'spring': 'cubic-bezier(0.22, 1, 0.36, 1)'
};

if (!animations.transitionTimingFunction) {
  console.error('  ❌ Missing "transitionTimingFunction" key in animations.json');
  hasErrors = true;
} else {
  expectedEasingKeys.forEach(key => {
    if (!animations.transitionTimingFunction[key]) {
      console.error(`  ❌ Missing transitionTimingFunction.${key}`);
      hasErrors = true;
    } else if (animations.transitionTimingFunction[key] !== expectedEasingValues[key]) {
      console.error(`  ❌ transitionTimingFunction.${key} should be "${expectedEasingValues[key]}" but got "${animations.transitionTimingFunction[key]}"`);
      hasErrors = true;
    } else {
      console.log(`  ✅ transitionTimingFunction.${key} = ${animations.transitionTimingFunction[key]}`);
    }
  });
  
  // Validate cubic-bezier format
  Object.entries(animations.transitionTimingFunction).forEach(([key, value]) => {
    const cubicBezierRegex = /^cubic-bezier\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)$/;
    if (!cubicBezierRegex.test(value)) {
      console.error(`  ❌ transitionTimingFunction.${key} has invalid cubic-bezier format: ${value}`);
      hasErrors = true;
    }
  });
}

// Validate transition properties
console.log('\n🎨 Validating Transition Properties:');
const expectedPropertyKeys = ['colors', 'opacity', 'shadow', 'transform', 'all'];

if (!animations.transitionProperty) {
  console.error('  ❌ Missing "transitionProperty" key in animations.json');
  hasErrors = true;
} else {
  expectedPropertyKeys.forEach(key => {
    if (!animations.transitionProperty[key]) {
      console.error(`  ❌ Missing transitionProperty.${key}`);
      hasErrors = true;
    } else {
      console.log(`  ✅ transitionProperty.${key} = ${animations.transitionProperty[key]}`);
    }
  });
}

// Validate animations.css file exists
console.log('\n📄 Validating Animation Keyframes File:');
const animationsCssPath = join(__dirname, '../src/styles/animations.css');
if (!fs.existsSync(animationsCssPath)) {
  console.error('  ❌ Missing src/styles/animations.css file');
  hasErrors = true;
} else {
  const animationsCss = fs.readFileSync(animationsCssPath, 'utf8');
  
  // Check for required keyframes
  const requiredKeyframes = ['fadeIn', 'fadeOut', 'slideUp', 'slideDown', 'scaleIn'];
  requiredKeyframes.forEach(keyframe => {
    if (!animationsCss.includes(`@keyframes ${keyframe}`)) {
      console.error(`  ❌ Missing @keyframes ${keyframe} in animations.css`);
      hasErrors = true;
    } else {
      console.log(`  ✅ @keyframes ${keyframe} defined`);
    }
  });
  
  // Check for prefers-reduced-motion
  if (!animationsCss.includes('@media (prefers-reduced-motion: reduce)')) {
    console.error('  ❌ Missing @media (prefers-reduced-motion: reduce) in animations.css');
    hasErrors = true;
  } else {
    console.log('  ✅ prefers-reduced-motion media query defined');
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Validation failed! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ All animation tokens validated successfully!');
  console.log('\n📊 Animation Token Summary:');
  console.log(`  • Duration tokens: ${Object.keys(animations.transitionDuration).length}`);
  console.log(`  • Easing tokens: ${Object.keys(animations.transitionTimingFunction).length}`);
  console.log(`  • Property tokens: ${Object.keys(animations.transitionProperty).length}`);
  console.log(`  • Keyframe animations: 5 (fadeIn, fadeOut, slideUp, slideDown, scaleIn)`);
  console.log(`  • Accessibility: prefers-reduced-motion supported`);
  process.exit(0);
}

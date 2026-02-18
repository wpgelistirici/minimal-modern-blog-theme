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

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readJSONFile, readTextFile } from './validation-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Read animation token file with proper error handling
    const animationsPath = join(__dirname, '../src/styles/tokens/animations.json');
    const animations = readJSONFile(animationsPath, 'animations.json');

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

    // Validate timing functions (easings)
    console.log('\n📈 Validating Timing Functions (Easings):');
    const expectedEasings = {
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
      Object.entries(expectedEasings).forEach(([key, expectedValue]) => {
        if (!animations.transitionTimingFunction[key]) {
          console.error(`  ❌ Missing transitionTimingFunction.${key}`);
          hasErrors = true;
        } else if (animations.transitionTimingFunction[key] !== expectedValue) {
          console.error(`  ❌ transitionTimingFunction.${key} should be "${expectedValue}"`);
          hasErrors = true;
        } else {
          console.log(`  ✅ transitionTimingFunction.${key} = ${animations.transitionTimingFunction[key]}`);
        }
      });
    }

    // Validate transition properties
    console.log('\n🎨 Validating Transition Properties:');
    const expectedProperties = ['colors', 'opacity', 'shadow', 'transform', 'all'];

    if (!animations.transitionProperty) {
      console.error('  ❌ Missing "transitionProperty" key in animations.json');
      hasErrors = true;
    } else {
      expectedProperties.forEach(key => {
        if (!animations.transitionProperty[key]) {
          console.error(`  ❌ Missing transitionProperty.${key}`);
          hasErrors = true;
        } else {
          console.log(`  ✅ transitionProperty.${key} = ${animations.transitionProperty[key]}`);
        }
      });
    }

    // Validate keyframes in CSS file
    console.log('\n📄 Validating Animation Keyframes File:');
    const animationsCssPath = join(__dirname, '../src/styles/animations.css');
    const animationsCss = readTextFile(animationsCssPath, 'animations.css');

    const expectedKeyframes = ['fadeIn', 'fadeOut', 'slideUp', 'slideDown', 'scaleIn'];
    expectedKeyframes.forEach(keyframe => {
      if (animationsCss.includes(`@keyframes ${keyframe}`)) {
        console.log(`  ✅ @keyframes ${keyframe} defined`);
      } else {
        console.error(`  ❌ Missing @keyframes ${keyframe} in animations.css`);
        hasErrors = true;
      }
    });

    // Check for prefers-reduced-motion support
    if (animationsCss.includes('@media (prefers-reduced-motion: reduce)')) {
      console.log('  ✅ prefers-reduced-motion media query defined');
    } else {
      console.error('  ❌ Missing prefers-reduced-motion media query');
      hasErrors = true;
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.error('❌ Animation token validation failed with errors');
      process.exit(1);
    } else {
      console.log('✅ All animation tokens validated successfully!');
      console.log('\n📊 Animation Token Summary:');
      console.log(`  • Duration tokens: ${Object.keys(animations.transitionDuration).length}`);
      console.log(`  • Easing tokens: ${Object.keys(animations.transitionTimingFunction).length}`);
      console.log(`  • Property tokens: ${Object.keys(animations.transitionProperty).length}`);
      console.log(`  • Keyframe animations: ${expectedKeyframes.length} (${expectedKeyframes.join(', ')})`);
      console.log('  • Accessibility: prefers-reduced-motion supported');
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

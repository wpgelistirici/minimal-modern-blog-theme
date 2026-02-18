#!/usr/bin/env node

/**
 * Responsive Token Validation Script
 * 
 * This script validates that:
 * 1. All breakpoints are defined correctly (sm: 480px, md: 768px, lg: 1024px, xl: 1280px)
 * 2. Container max-width values are appropriate for each breakpoint
 * 3. Container padding values follow the spacing system
 * 4. Mobile-first approach is maintained (values increase with breakpoints)
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readJSONFile } from './validation-utils.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Read token files with proper error handling
    const responsivePath = join(__dirname, '../src/styles/tokens/responsive.json');
    const spacingPath = join(__dirname, '../src/styles/tokens/spacing.json');
    const tailwindConfigPath = join(__dirname, '../tailwind.config.js');

    const responsive = readJSONFile(responsivePath, 'responsive.json');
    const spacing = readJSONFile(spacingPath, 'spacing.json');

    let hasErrors = false;

    console.log('🔍 Validating Responsive Tokens...\n');

    // Validate breakpoints
    console.log('📱 Validating Breakpoints:');
    const expectedBreakpoints = {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    };

    Object.entries(expectedBreakpoints).forEach(([key, expectedValue]) => {
      if (responsive.breakpoints[key]) {
        if (responsive.breakpoints[key] === expectedValue) {
          console.log(`  ✅ breakpoints.${key} = ${responsive.breakpoints[key]}`);
        } else {
          console.error(`  ❌ breakpoints.${key} should be ${expectedValue}, got ${responsive.breakpoints[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing breakpoints.${key}`);
        hasErrors = true;
      }
    });

    // Validate mobile-first approach (breakpoint values should increase)
    const breakpointValues = Object.entries(responsive.breakpoints).map(([key, value]) => ({
      key,
      value: parseInt(value)
    }));
    
    for (let i = 1; i < breakpointValues.length; i++) {
      if (breakpointValues[i].value <= breakpointValues[i - 1].value) {
        console.error(`  ❌ Breakpoint ${breakpointValues[i].key} (${breakpointValues[i].value}px) should be larger than ${breakpointValues[i - 1].key} (${breakpointValues[i - 1].value}px)`);
        hasErrors = true;
      }
    }

    // Validate container max-width values
    console.log('\n📦 Validating Container Max-Width:');
    const expectedMaxWidths = {
      'sm': '100%',
      'md': '720px',
      'lg': '960px',
      'xl': '1140px'
    };

    Object.entries(expectedMaxWidths).forEach(([key, expectedValue]) => {
      if (responsive.container.maxWidth[key]) {
        if (responsive.container.maxWidth[key] === expectedValue) {
          console.log(`  ✅ container.maxWidth.${key} = ${responsive.container.maxWidth[key]}`);
        } else {
          console.error(`  ❌ container.maxWidth.${key} should be ${expectedValue}, got ${responsive.container.maxWidth[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing container.maxWidth.${key}`);
        hasErrors = true;
      }
    });

    // Validate container padding values
    console.log('\n📏 Validating Container Padding:');
    const expectedPadding = {
      'default': '24px',
      'sm': '16px',
      'md': '24px',
      'lg': '32px',
      'xl': '40px'
    };

    Object.entries(expectedPadding).forEach(([key, expectedValue]) => {
      if (responsive.container.padding[key]) {
        if (responsive.container.padding[key] === expectedValue) {
          console.log(`  ✅ container.padding.${key} = ${responsive.container.padding[key]}`);
        } else {
          console.error(`  ❌ container.padding.${key} should be ${expectedValue}, got ${responsive.container.padding[key]}`);
          hasErrors = true;
        }
      } else {
        console.error(`  ❌ Missing container.padding.${key}`);
        hasErrors = true;
      }
    });

    // Validate that padding values align with spacing system
    console.log('\n🔗 Validating Padding Alignment with Spacing System:');
    const spacingValues = Object.values(spacing.spacing);
    Object.entries(responsive.container.padding).forEach(([key, value]) => {
      if (spacingValues.includes(value)) {
        console.log(`  ✅ container.padding.${key} (${value}) aligns with spacing system`);
      } else {
        console.error(`  ❌ container.padding.${key} (${value}) does not align with spacing system`);
        hasErrors = true;
      }
    });

    // Validate tailwind.config.js integration
    console.log('\n⚙️  Validating Tailwind Config Integration:');
    if (fs.existsSync(tailwindConfigPath)) {
      const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
      
      // Check if responsive tokens are imported
      if (tailwindConfig.includes("import responsive from './src/styles/tokens/responsive.json'")) {
        console.log('  ✅ Responsive tokens imported in tailwind.config.js');
      } else {
        console.error('  ❌ Responsive tokens not imported in tailwind.config.js');
        hasErrors = true;
      }

      // Check if screens are configured
      if (tailwindConfig.includes('screens: responsive.breakpoints')) {
        console.log('  ✅ Breakpoints configured in theme.screens');
      } else {
        console.error('  ❌ Breakpoints not configured in theme.screens');
        hasErrors = true;
      }

      // Check if container is configured
      if (tailwindConfig.includes('container:') && tailwindConfig.includes('center: true')) {
        console.log('  ✅ Container configured with center alignment');
      } else {
        console.error('  ❌ Container not properly configured');
        hasErrors = true;
      }
    } else {
      console.error('  ❌ tailwind.config.js not found');
      hasErrors = true;
    }

    // Edge case validation
    console.log('\n🛡️  Validating Edge Cases:');
    
    // Check max-width limit (should not exceed 1140px for readability)
    const maxWidthValues = Object.entries(responsive.container.maxWidth)
      .filter(([_, value]) => value !== '100%')
      .map(([key, value]) => ({ key, value: parseInt(value) }));
    
    const exceedsLimit = maxWidthValues.find(item => item.value > 1140);
    if (exceedsLimit) {
      console.error(`  ❌ container.maxWidth.${exceedsLimit.key} (${exceedsLimit.value}px) exceeds recommended 1140px limit for readability`);
      hasErrors = true;
    } else {
      console.log('  ✅ All max-width values are within readability limits (≤1140px)');
    }

    // Check minimum padding for small screens (should be at least 16px)
    const minPadding = parseInt(responsive.container.padding.sm);
    if (minPadding >= 16) {
      console.log(`  ✅ Minimum padding (${minPadding}px) ensures content safety on small screens`);
    } else {
      console.error(`  ❌ Minimum padding (${minPadding}px) is too small, should be at least 16px`);
      hasErrors = true;
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (hasErrors) {
      console.error('❌ Responsive token validation failed with errors');
      process.exit(1);
    } else {
      console.log('✅ All responsive tokens validated successfully!');
      console.log('\n📊 Token Summary:');
      console.log(`  • Breakpoints: ${Object.keys(responsive.breakpoints).length}`);
      console.log(`  • Container max-width configs: ${Object.keys(responsive.container.maxWidth).length}`);
      console.log(`  • Container padding configs: ${Object.keys(responsive.container.padding).length}`);
      console.log('\n🎯 Mobile-first approach confirmed');
      console.log('📱 All breakpoints: ' + Object.entries(responsive.breakpoints).map(([k, v]) => `${k}=${v}`).join(', '));
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

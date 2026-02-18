#!/usr/bin/env node

/**
 * State Token Validation Script
 * 
 * This script validates that:
 * 1. All state tokens in states.json are properly defined
 * 2. Focus-ring configuration is correct (2px width, 2px offset)
 * 3. All component states have required properties
 * 4. Colors are valid HEX format
 * 5. WCAG AA contrast ratios are met for state colors
 * 6. Dark mode variants exist for all states
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readJSONFile, isValidHex, getContrastRatio, formatResults } from './validation-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Main validation function
function main() {
  try {
    // Read states.json with proper error handling
    const statesPath = join(__dirname, '../src/styles/tokens/states.json');
    const states = readJSONFile(statesPath, 'states.json');
    
    const errors = [];
    const warnings = [];
    
    console.log('🔍 Validating state tokens...');
    
    // Run all validations
    validateFocusRing(states, errors, warnings);
    validateComponentStates(states, errors, warnings);
    
    // Report results with formatted output
    const results = {
      passed: warnings.length === 0 && errors.length === 0 ? 1 : 0,
      failed: errors.length,
      errors,
      warnings
    };
    
    const success = formatResults(results);
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('\n❌ Fatal error during validation:');
    console.error(`   ${error.message}`);
    process.exit(1);
  }
}

// Validate focus ring configuration
function validateFocusRing(states, errors, warnings) {
  console.log('\n✓ Validating focus ring configuration...');
  
  if (!states.focusRing) {
    errors.push('Missing focusRing configuration');
    return;
  }
  
  // Check width
  if (states.focusRing.width !== '2px') {
    errors.push(`Focus ring width should be 2px, got ${states.focusRing.width}`);
  }
  
  // Check offset
  if (states.focusRing.offset !== '2px') {
    errors.push(`Focus ring offset should be 2px, got ${states.focusRing.offset}`);
  }
  
  // Check colors
  if (!states.focusRing.color) {
    errors.push('Missing focus ring color configuration');
  } else {
    if (!states.focusRing.color.light) {
      errors.push('Missing light mode focus ring color');
    } else if (!isValidHex(states.focusRing.color.light)) {
      errors.push(`Invalid light mode focus ring color: ${states.focusRing.color.light}`);
    }
    
    if (!states.focusRing.color.dark) {
      errors.push('Missing dark mode focus ring color');
    } else if (!isValidHex(states.focusRing.color.dark)) {
      errors.push(`Invalid dark mode focus ring color: ${states.focusRing.color.dark}`);
    }
    
    // Check contrast for focus ring on white background
    // WCAG 2.1 SC 1.4.11 (Non-text Contrast) requires 3:1 for UI components
    if (states.focusRing.color.light) {
      const contrast = getContrastRatio(states.focusRing.color.light, '#ffffff');
      if (contrast < 3) {
        warnings.push(`Focus ring light color has low contrast (${contrast.toFixed(2)}:1) on white background`);
      }
    }
    
    // Check contrast for focus ring on black background
    // WCAG 2.1 SC 1.4.11 (Non-text Contrast) requires 3:1 for UI components
    if (states.focusRing.color.dark) {
      const contrast = getContrastRatio(states.focusRing.color.dark, '#0a0a0a');
      if (contrast < 3) {
        warnings.push(`Focus ring dark color has low contrast (${contrast.toFixed(2)}:1) on dark background`);
      }
    }
  }
}

// Validate component states
function validateComponentStates(states, errors, warnings) {
  console.log('\n✓ Validating component states...');
  
  const components = ['button', 'input', 'card', 'badge', 'link'];
  const requiredStates = {
    button: ['default', 'hover', 'active', 'disabled', 'loading'],
    input: ['default', 'hover', 'focus', 'disabled', 'error', 'success'],
    card: ['default', 'hover', 'active'],
    badge: ['default', 'hover', 'success', 'error', 'warning', 'info'],
    link: ['default', 'hover', 'active', 'visited']
  };
  
  for (const component of components) {
    if (!states[component]) {
      errors.push(`Missing ${component} state configuration`);
      continue;
    }
    
    // Check required states
    for (const state of requiredStates[component]) {
      if (!states[component][state]) {
        errors.push(`Missing ${state} state for ${component}`);
        continue;
      }
      
      // Check light and dark modes
      const stateConfig = states[component][state];
      if (!stateConfig.light) {
        errors.push(`Missing light mode for ${component}.${state}`);
      }
      if (!stateConfig.dark) {
        errors.push(`Missing dark mode for ${component}.${state}`);
      }
      
      // Validate colors in light mode
      if (stateConfig.light) {
        validateStateColors(component, state, 'light', stateConfig.light, errors, warnings);
      }
      
      // Validate colors in dark mode
      if (stateConfig.dark) {
        validateStateColors(component, state, 'dark', stateConfig.dark, errors, warnings);
      }
    }
  }
}

// Validate state colors
function validateStateColors(component, state, mode, config, errors, warnings) {
  const colorProps = ['background', 'foreground', 'border', 'placeholder', 'underline'];
  
  for (const prop of colorProps) {
    if (config[prop] !== undefined) {
      if (!isValidHex(config[prop])) {
        errors.push(`Invalid ${prop} color for ${component}.${state}.${mode}: ${config[prop]}`);
      }
    }
  }
  
  // Check contrast between foreground and background
  // WCAG 2.1 SC 1.4.3 (Contrast Minimum) requires 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)
  if (config.foreground && config.background && 
      config.foreground !== 'transparent' && config.background !== 'transparent') {
    const contrast = getContrastRatio(config.foreground, config.background);
    if (contrast < 4.5) {
      warnings.push(
        `Low contrast (${contrast.toFixed(2)}:1) for ${component}.${state}.${mode} ` +
        `(foreground: ${config.foreground}, background: ${config.background}). ` +
        `WCAG AA requires 4.5:1 for normal text.`
      );
    }
  }
}

// Run main function
main();

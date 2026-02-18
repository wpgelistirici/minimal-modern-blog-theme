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

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read states.json
const statesPath = join(__dirname, '../src/styles/tokens/states.json');
const states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));

let errors = [];
let warnings = [];

// Helper function to validate HEX color
function isValidHex(color) {
  if (color === 'none' || color === 'transparent') return true;
  return /^#[0-9A-F]{6}$/i.test(color);
}

// Calculate relative luminance
function getLuminance(hex) {
  if (hex === 'transparent' || hex === 'none') return 1;
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Validate focus ring configuration
function validateFocusRing() {
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
    if (states.focusRing.color.light) {
      const contrast = getContrastRatio(states.focusRing.color.light, '#ffffff');
      if (contrast < 3) {
        warnings.push(`Focus ring light color has low contrast (${contrast.toFixed(2)}:1) on white background`);
      }
    }
    
    // Check contrast for focus ring on black background
    if (states.focusRing.color.dark) {
      const contrast = getContrastRatio(states.focusRing.color.dark, '#0a0a0a');
      if (contrast < 3) {
        warnings.push(`Focus ring dark color has low contrast (${contrast.toFixed(2)}:1) on dark background`);
      }
    }
  }
}

// Validate component states
function validateComponentStates() {
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
        validateStateColors(component, state, 'light', stateConfig.light);
      }
      
      // Validate colors in dark mode
      if (stateConfig.dark) {
        validateStateColors(component, state, 'dark', stateConfig.dark);
      }
    }
  }
}

// Validate state colors
function validateStateColors(component, state, mode, config) {
  const colorProps = ['background', 'foreground', 'border', 'placeholder', 'underline'];
  
  for (const prop of colorProps) {
    if (config[prop] !== undefined) {
      if (!isValidHex(config[prop])) {
        errors.push(`Invalid ${prop} color for ${component}.${state}.${mode}: ${config[prop]}`);
      }
    }
  }
  
  // Check contrast between foreground and background
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

// Validate transition and easing
function validateTransitionAndEasing() {
  console.log('\n✓ Validating transition and easing...');
  
  if (!states.transition) {
    errors.push('Missing transition configuration');
  } else {
    const requiredDurations = ['fast', 'normal', 'slow'];
    for (const duration of requiredDurations) {
      if (!states.transition[duration]) {
        errors.push(`Missing transition.${duration}`);
      } else if (!/^\d+ms$/.test(states.transition[duration])) {
        errors.push(`Invalid transition.${duration} format: ${states.transition[duration]}`);
      }
    }
  }
  
  if (!states.easing) {
    errors.push('Missing easing configuration');
  } else {
    const requiredEasings = ['default', 'in', 'out', 'inOut', 'spring'];
    for (const easing of requiredEasings) {
      if (!states.easing[easing]) {
        errors.push(`Missing easing.${easing}`);
      } else if (!/^cubic-bezier\([\d.]+,\s*[\d.]+,\s*[\d.]+,\s*[\d.]+\)$/.test(states.easing[easing])) {
        errors.push(`Invalid easing.${easing} format: ${states.easing[easing]}`);
      }
    }
  }
}

// Run all validations
console.log('🔍 Validating state tokens...');
validateFocusRing();
validateComponentStates();
validateTransitionAndEasing();

// Report results
console.log('\n📊 Validation Results:');
console.log('='.repeat(50));

if (errors.length === 0) {
  console.log('✅ All validations passed!');
} else {
  console.log(`❌ ${errors.length} error(s) found:`);
  errors.forEach(error => console.log(`  - ${error}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} warning(s):`);
  warnings.forEach(warning => console.log(`  - ${warning}`));
}

console.log('\n' + '='.repeat(50));

// Exit with error code if there are errors
process.exit(errors.length > 0 ? 1 : 0);

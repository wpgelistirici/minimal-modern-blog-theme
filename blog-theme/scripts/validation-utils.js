#!/usr/bin/env node

/**
 * Common Validation Utilities
 * 
 * Shared functions used across validation scripts to avoid code duplication
 * and ensure consistent validation behavior.
 */

import fs from 'fs';

/**
 * Safely read and parse a JSON file with proper error handling
 * @param {string} filePath - Path to the JSON file
 * @param {string} fileName - Human-readable file name for error messages
 * @returns {Object} Parsed JSON object
 * @throws {Error} If file cannot be read or parsed
 */
export function readJSONFile(filePath, fileName = 'file') {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`${fileName} not found at: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    if (!fileContent || fileContent.trim() === '') {
      throw new Error(`${fileName} is empty`);
    }
    
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${fileName}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Validate HEX color format
 * @param {string} color - Color value to validate
 * @returns {boolean} True if valid HEX color or special value (transparent/none)
 */
export function isValidHex(color) {
  if (color === 'none' || color === 'transparent') return true;
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Calculate relative luminance of a color (WCAG 2.1)
 * @param {string} hex - HEX color value
 * @returns {number} Relative luminance (0-1)
 */
export function getLuminance(hex) {
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

/**
 * Calculate contrast ratio between two colors (WCAG 2.1)
 * @param {string} hex1 - First HEX color
 * @param {string} hex2 - Second HEX color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Safely read a text file with error handling
 * @param {string} filePath - Path to the file
 * @param {string} fileName - Human-readable file name for error messages
 * @returns {string} File content
 * @throws {Error} If file cannot be read
 */
export function readTextFile(filePath, fileName = 'file') {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`${fileName} not found at: ${filePath}`);
    }
    
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied reading ${fileName}`);
    }
    throw error;
  }
}

/**
 * Format validation results for console output
 * @param {Object} results - Validation results object
 * @param {number} results.passed - Number of passed tests
 * @param {number} results.failed - Number of failed tests
 * @param {Array<string>} results.errors - Array of error messages
 * @param {Array<string>} results.warnings - Array of warning messages
 * @returns {boolean} True if validation passed (no errors)
 */
export function formatResults(results) {
  console.log('\n' + '='.repeat(50));
  
  if (results.warnings && results.warnings.length > 0) {
    console.log(`\n⚠️  ${results.warnings.length} warning(s):`);
    results.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  if (results.errors && results.errors.length > 0) {
    console.log(`\n❌ ${results.errors.length} error(s):`);
    results.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n📊 Summary:');
  console.log(`   ✅ Passed: ${results.passed || 0}`);
  console.log(`   ❌ Failed: ${results.failed || 0}`);
  
  const hasErrors = results.failed > 0 || (results.errors && results.errors.length > 0);
  
  if (!hasErrors) {
    console.log('\n🎉 All validation tests passed!');
  } else {
    console.log('\n❗ Validation failed with errors.');
  }
  
  console.log('='.repeat(50));
  
  return !hasErrors;
}

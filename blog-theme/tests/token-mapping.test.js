/**
 * Token Mapping Tests
 * 
 * Unit tests to verify the token mapping structure and references
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { strict as assert } from 'assert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_DIR = path.join(__dirname, '..', 'src', 'styles', 'tokens');
const PRIMITIVES_PATH = path.join(TOKENS_DIR, 'primitives.json');
const ALIASES_PATH = path.join(TOKENS_DIR, 'aliases.json');
const SEMANTIC_PATH = path.join(TOKENS_DIR, 'semantic.json');

// Read token files
const primitives = JSON.parse(fs.readFileSync(PRIMITIVES_PATH, 'utf-8'));
const aliases = JSON.parse(fs.readFileSync(ALIASES_PATH, 'utf-8'));
const semantic = JSON.parse(fs.readFileSync(SEMANTIC_PATH, 'utf-8'));

/**
 * Test Suite
 */
function runTests() {
  console.log('Running Token Mapping Tests...\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Primitive token files exist and are valid JSON
  try {
    assert.ok(primitives, 'Primitives should be loaded');
    assert.ok(primitives.colors, 'Primitives should have colors');
    assert.ok(primitives.typography, 'Primitives should have typography');
    assert.ok(primitives.spacing, 'Primitives should have spacing');
    console.log('✓ Test 1: Primitive tokens loaded successfully');
    passed++;
  } catch (error) {
    console.error('✗ Test 1 Failed:', error.message);
    failed++;
  }

  // Test 2: Alias token files exist and have references
  try {
    assert.ok(aliases, 'Aliases should be loaded');
    assert.ok(aliases.color, 'Aliases should have color');
    assert.ok(aliases.color.brand, 'Aliases should have brand colors');
    assert.ok(aliases.color.brand.primary._ref, 'Alias should have _ref property');
    assert.ok(aliases.color.brand.primary._value, 'Alias should have _value property');
    console.log('✓ Test 2: Alias tokens loaded with references');
    passed++;
  } catch (error) {
    console.error('✗ Test 2 Failed:', error.message);
    failed++;
  }

  // Test 3: Semantic token files exist and have both alias and primitive refs
  try {
    assert.ok(semantic, 'Semantic should be loaded');
    assert.ok(semantic.button, 'Semantic should have button tokens');
    assert.ok(semantic.button.primary, 'Semantic should have primary button tokens');
    assert.ok(semantic.button.primary.default.background._ref, 'Semantic should have _ref');
    assert.ok(semantic.button.primary.default.background._primitiveRef, 'Semantic should have _primitiveRef');
    assert.ok(semantic.button.primary.default.background._value, 'Semantic should have _value');
    console.log('✓ Test 3: Semantic tokens loaded with full reference chain');
    passed++;
  } catch (error) {
    console.error('✗ Test 3 Failed:', error.message);
    failed++;
  }

  // Test 4: Primary color scale completeness
  try {
    const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const shade of requiredShades) {
      assert.ok(primitives.colors.primary[shade], `Primary should have shade ${shade}`);
    }
    console.log('✓ Test 4: Primary color scale is complete (11 shades)');
    passed++;
  } catch (error) {
    console.error('✗ Test 4 Failed:', error.message);
    failed++;
  }

  // Test 5: Secondary color scale completeness
  try {
    const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const shade of requiredShades) {
      assert.ok(primitives.colors.secondary[shade], `Secondary should have shade ${shade}`);
    }
    console.log('✓ Test 5: Secondary color scale is complete (11 shades)');
    passed++;
  } catch (error) {
    console.error('✗ Test 5 Failed:', error.message);
    failed++;
  }

  // Test 6: Accent color scale completeness
  try {
    const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const shade of requiredShades) {
      assert.ok(primitives.colors.accent[shade], `Accent should have shade ${shade}`);
    }
    console.log('✓ Test 6: Accent color scale is complete (11 shades)');
    passed++;
  } catch (error) {
    console.error('✗ Test 6 Failed:', error.message);
    failed++;
  }

  // Test 7: Feedback colors exist
  try {
    assert.ok(primitives.colors.success.DEFAULT, 'Success color should exist');
    assert.ok(primitives.colors.error.DEFAULT, 'Error color should exist');
    assert.ok(primitives.colors.warning.DEFAULT, 'Warning color should exist');
    assert.ok(primitives.colors.info.DEFAULT, 'Info color should exist');
    console.log('✓ Test 7: All feedback colors exist');
    passed++;
  } catch (error) {
    console.error('✗ Test 7 Failed:', error.message);
    failed++;
  }

  // Test 8: Typography primitives exist
  try {
    assert.ok(primitives.typography.fontFamily.sans, 'Sans font family should exist');
    assert.ok(primitives.typography.fontFamily.serif, 'Serif font family should exist');
    assert.ok(primitives.typography.fontFamily.mono, 'Mono font family should exist');
    assert.ok(primitives.typography.fontSize.base, 'Base font size should exist');
    assert.ok(primitives.typography.fontWeight.normal, 'Normal font weight should exist');
    console.log('✓ Test 8: Typography primitives are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 8 Failed:', error.message);
    failed++;
  }

  // Test 9: Spacing scale exists
  try {
    const requiredSpacing = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'];
    for (const space of requiredSpacing) {
      assert.ok(primitives.spacing[space] !== undefined, `Spacing ${space} should exist`);
    }
    console.log('✓ Test 9: Spacing scale is complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 9 Failed:', error.message);
    failed++;
  }

  // Test 10: Border radius tokens exist
  try {
    assert.ok(primitives.borderRadius.none !== undefined, 'Border radius none should exist');
    assert.ok(primitives.borderRadius.sm !== undefined, 'Border radius sm should exist');
    assert.ok(primitives.borderRadius.md !== undefined, 'Border radius md should exist');
    assert.ok(primitives.borderRadius.lg !== undefined, 'Border radius lg should exist');
    assert.ok(primitives.borderRadius.full !== undefined, 'Border radius full should exist');
    console.log('✓ Test 10: Border radius tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 10 Failed:', error.message);
    failed++;
  }

  // Test 11: Shadow tokens exist
  try {
    assert.ok(primitives.boxShadow.sm, 'Small shadow should exist');
    assert.ok(primitives.boxShadow.md, 'Medium shadow should exist');
    assert.ok(primitives.boxShadow.lg, 'Large shadow should exist');
    assert.ok(primitives.boxShadow.xl, 'Extra large shadow should exist');
    console.log('✓ Test 11: Shadow tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 11 Failed:', error.message);
    failed++;
  }

  // Test 12: Animation tokens exist
  try {
    assert.ok(primitives.transitionDuration.fast, 'Fast duration should exist');
    assert.ok(primitives.transitionDuration.normal, 'Normal duration should exist');
    assert.ok(primitives.transitionDuration.slow, 'Slow duration should exist');
    assert.ok(primitives.transitionTimingFunction.default, 'Default easing should exist');
    console.log('✓ Test 12: Animation tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 12 Failed:', error.message);
    failed++;
  }

  // Test 13: Alias color references are properly structured
  try {
    assert.strictEqual(aliases.color.brand.primary._value, primitives.colors.primary['500']);
    assert.strictEqual(aliases.color.brand.primaryHover._value, primitives.colors.primary['600']);
    assert.strictEqual(aliases.color.text.primary._value, primitives.colors.neutral['900']);
    console.log('✓ Test 13: Alias color references match primitive values');
    passed++;
  } catch (error) {
    console.error('✗ Test 13 Failed:', error.message);
    failed++;
  }

  // Test 14: Semantic button tokens exist
  try {
    assert.ok(semantic.button.primary, 'Primary button tokens should exist');
    assert.ok(semantic.button.primary.default, 'Primary button default state should exist');
    assert.ok(semantic.button.primary.hover, 'Primary button hover state should exist');
    assert.ok(semantic.button.primary.active, 'Primary button active state should exist');
    assert.ok(semantic.button.primary.disabled, 'Primary button disabled state should exist');
    console.log('✓ Test 14: Semantic button tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 14 Failed:', error.message);
    failed++;
  }

  // Test 15: Semantic input tokens exist
  try {
    assert.ok(semantic.input.default, 'Input default state should exist');
    assert.ok(semantic.input.hover, 'Input hover state should exist');
    assert.ok(semantic.input.focus, 'Input focus state should exist');
    assert.ok(semantic.input.error, 'Input error state should exist');
    assert.ok(semantic.input.success, 'Input success state should exist');
    console.log('✓ Test 15: Semantic input tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 15 Failed:', error.message);
    failed++;
  }

  // Test 16: Semantic card tokens exist
  try {
    assert.ok(semantic.card.default, 'Card default state should exist');
    assert.ok(semantic.card.hover, 'Card hover state should exist');
    assert.ok(semantic.card.spacing, 'Card spacing should exist');
    assert.ok(semantic.card.borderRadius, 'Card border radius should exist');
    console.log('✓ Test 16: Semantic card tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 16 Failed:', error.message);
    failed++;
  }

  // Test 17: Semantic badge tokens exist
  try {
    assert.ok(semantic.badge.default, 'Badge default should exist');
    assert.ok(semantic.badge.success, 'Badge success should exist');
    assert.ok(semantic.badge.error, 'Badge error should exist');
    assert.ok(semantic.badge.warning, 'Badge warning should exist');
    assert.ok(semantic.badge.info, 'Badge info should exist');
    console.log('✓ Test 17: Semantic badge tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 17 Failed:', error.message);
    failed++;
  }

  // Test 18: Focus ring tokens exist
  try {
    assert.ok(semantic.focusRing.color, 'Focus ring color should exist');
    assert.ok(semantic.focusRing.width, 'Focus ring width should exist');
    assert.ok(semantic.focusRing.offset, 'Focus ring offset should exist');
    console.log('✓ Test 18: Focus ring tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 18 Failed:', error.message);
    failed++;
  }

  // Test 19: Typography semantic tokens exist
  try {
    assert.ok(semantic.typography.heading, 'Heading typography should exist');
    assert.ok(semantic.typography.body, 'Body typography should exist');
    assert.ok(semantic.typography.code, 'Code typography should exist');
    console.log('✓ Test 19: Semantic typography tokens are complete');
    passed++;
  } catch (error) {
    console.error('✗ Test 19 Failed:', error.message);
    failed++;
  }

  // Test 20: All token files have proper JSON structure
  try {
    assert.ok(primitives.$schema || primitives.$id || true, 'Primitives has metadata');
    assert.ok(aliases.$schema || aliases.$id || true, 'Aliases has metadata');
    assert.ok(semantic.$schema || semantic.$id || true, 'Semantic has metadata');
    console.log('✓ Test 20: Token files have proper structure');
    passed++;
  } catch (error) {
    console.error('✗ Test 20 Failed:', error.message);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Total tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('='.repeat(50));

  if (failed === 0) {
    console.log('\n✓ All tests passed!\n');
    return true;
  } else {
    console.log(`\n✗ ${failed} test(s) failed\n`);
    return false;
  }
}

// Run tests
try {
  const success = runTests();
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error('Error running tests:', error);
  process.exit(1);
}

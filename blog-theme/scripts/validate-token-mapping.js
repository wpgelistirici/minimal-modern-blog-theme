/**
 * Design System Token Mapping Validator
 * 
 * This script validates the token mapping consistency across
 * primitive → alias → semantic token files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to token files
const TOKENS_DIR = path.join(__dirname, '..', 'src', 'styles', 'tokens');
const PRIMITIVES_PATH = path.join(TOKENS_DIR, 'primitives.json');
const ALIASES_PATH = path.join(TOKENS_DIR, 'aliases.json');
const SEMANTIC_PATH = path.join(TOKENS_DIR, 'semantic.json');

// Color for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

/**
 * Read JSON file
 */
function readJSONFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`${colors.red}Error reading ${filePath}:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Get value from object using dot notation path
 */
function getValueByPath(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Extract all reference paths from a token object
 */
function extractReferences(obj, prefix = '', refs = []) {
  if (typeof obj !== 'object' || obj === null) {
    return refs;
  }

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    
    if (key === '_ref' && typeof value === 'string') {
      refs.push({
        tokenPath: prefix,
        refPath: value,
        type: 'alias'
      });
    } else if (key === '_primitiveRef' && typeof value === 'string') {
      refs.push({
        tokenPath: prefix,
        refPath: value,
        type: 'primitive'
      });
    } else if (typeof value === 'object') {
      extractReferences(value, currentPath, refs);
    }
  }
  
  return refs;
}

/**
 * Check if a primitive path exists in the primitives object
 */
function checkPrimitiveExists(primitivesData, refPath) {
  // Remove 'primitive.' or 'primitives.' prefix if present
  const cleanPath = refPath.replace(/^primitives?\./, '');
  const value = getValueByPath(primitivesData, cleanPath);
  return value !== undefined;
}

/**
 * Check if an alias path exists in the aliases object
 */
function checkAliasExists(aliasesData, refPath) {
  // Remove 'alias.' or 'aliases.' prefix if present
  const cleanPath = refPath.replace(/^aliases?\./, '');
  const value = getValueByPath(aliasesData, cleanPath);
  return value !== undefined;
}

/**
 * Validate token mapping consistency
 */
function validateTokenMappings() {
  console.log(`${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Design System Token Mapping Validator        ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}\n`);

  // Read token files
  const primitives = readJSONFile(PRIMITIVES_PATH);
  const aliases = readJSONFile(ALIASES_PATH);
  const semantic = readJSONFile(SEMANTIC_PATH);

  if (!primitives || !aliases || !semantic) {
    console.error(`${colors.red}✗ Failed to load token files${colors.reset}`);
    return false;
  }

  console.log(`${colors.green}✓ Loaded all token files${colors.reset}\n`);

  let hasErrors = false;
  const issues = [];

  // Validate aliases
  console.log(`${colors.magenta}Validating Alias Tokens...${colors.reset}`);
  const aliasRefs = extractReferences(aliases);
  let aliasValid = 0;
  let aliasInvalid = 0;

  for (const ref of aliasRefs) {
    if (ref.type === 'alias') {
      // Alias tokens should reference primitives
      if (!checkPrimitiveExists(primitives, ref.refPath)) {
        aliasInvalid++;
        issues.push({
          severity: 'error',
          category: 'alias',
          token: ref.tokenPath,
          message: `References non-existent primitive: ${ref.refPath}`
        });
        hasErrors = true;
      } else {
        aliasValid++;
      }
    }
  }

  console.log(`  Valid references: ${colors.green}${aliasValid}${colors.reset}`);
  if (aliasInvalid > 0) {
    console.log(`  Invalid references: ${colors.red}${aliasInvalid}${colors.reset}`);
  }
  console.log();

  // Validate semantic tokens
  console.log(`${colors.magenta}Validating Semantic Tokens...${colors.reset}`);
  const semanticRefs = extractReferences(semantic);
  let semanticValid = 0;
  let semanticInvalid = 0;

  for (const ref of semanticRefs) {
    if (ref.type === 'alias') {
      // Semantic tokens should reference aliases
      if (!checkAliasExists(aliases, ref.refPath)) {
        // Could also reference primitives directly
        if (!checkPrimitiveExists(primitives, ref.refPath)) {
          semanticInvalid++;
          issues.push({
            severity: 'error',
            category: 'semantic',
            token: ref.tokenPath,
            message: `References non-existent alias/primitive: ${ref.refPath}`
          });
          hasErrors = true;
        } else {
          semanticValid++;
        }
      } else {
        semanticValid++;
      }
    } else if (ref.type === 'primitive') {
      // Check if primitiveRef is valid
      if (!checkPrimitiveExists(primitives, ref.refPath)) {
        semanticInvalid++;
        issues.push({
          severity: 'error',
          category: 'semantic',
          token: ref.tokenPath,
          message: `References non-existent primitive: ${ref.refPath}`
        });
        hasErrors = true;
      } else {
        semanticValid++;
      }
    }
  }

  console.log(`  Valid references: ${colors.green}${semanticValid}${colors.reset}`);
  if (semanticInvalid > 0) {
    console.log(`  Invalid references: ${colors.red}${semanticInvalid}${colors.reset}`);
  }
  console.log();

  // Report issues
  if (issues.length > 0) {
    console.log(`${colors.red}╔════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.red}║  Issues Found                                  ║${colors.reset}`);
    console.log(`${colors.red}╚════════════════════════════════════════════════╝${colors.reset}\n`);

    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${colors.yellow}[${issue.category.toUpperCase()}]${colors.reset} ${issue.token}`);
      console.log(`   ${colors.red}✗${colors.reset} ${issue.message}\n`);
    });
  }

  // Summary
  console.log(`${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Summary                                       ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}\n`);

  console.log(`Total alias references checked: ${colors.cyan}${aliasRefs.length}${colors.reset}`);
  console.log(`Total semantic references checked: ${colors.cyan}${semanticRefs.length}${colors.reset}`);
  console.log(`Total valid references: ${colors.green}${aliasValid + semanticValid}${colors.reset}`);
  console.log(`Total invalid references: ${colors.red}${aliasInvalid + semanticInvalid}${colors.reset}\n`);

  if (!hasErrors) {
    console.log(`${colors.green}✓ All token mappings are valid!${colors.reset}\n`);
    return true;
  } else {
    console.log(`${colors.red}✗ Token mapping validation failed${colors.reset}\n`);
    return false;
  }
}

// Run validation
try {
  const success = validateTokenMappings();
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error(`${colors.red}Error during validation:${colors.reset}`, error);
  process.exit(1);
}

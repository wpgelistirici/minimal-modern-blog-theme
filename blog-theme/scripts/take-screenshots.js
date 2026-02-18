import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  const distPath = resolve(__dirname, '../dist/component-validation.html');
  const fileUrl = `file://${distPath}`;
  
  console.log(`Opening: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  
  // Take full page screenshot
  await page.screenshot({
    path: resolve(__dirname, '../docs/screenshots/component-validation-full.png'),
    fullPage: true
  });
  console.log('✓ Full page screenshot saved');
  
  // Take screenshot of button section
  const buttonSection = page.locator('section').nth(0);
  await buttonSection.screenshot({
    path: resolve(__dirname, '../docs/screenshots/component-validation-buttons.png')
  });
  console.log('✓ Button section screenshot saved');
  
  // Take screenshot of card section
  const cardSection = page.locator('section').nth(1);
  await cardSection.screenshot({
    path: resolve(__dirname, '../docs/screenshots/component-validation-cards.png')
  });
  console.log('✓ Card section screenshot saved');
  
  // Take screenshot of input section
  const inputSection = page.locator('section').nth(2);
  await inputSection.screenshot({
    path: resolve(__dirname, '../docs/screenshots/component-validation-inputs.png')
  });
  console.log('✓ Input section screenshot saved');
  
  // Test dark mode
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(500);
  
  await page.screenshot({
    path: resolve(__dirname, '../docs/screenshots/component-validation-dark.png'),
    fullPage: true
  });
  console.log('✓ Dark mode screenshot saved');
  
  await browser.close();
  console.log('\nAll screenshots saved successfully!');
}

takeScreenshots().catch(console.error);

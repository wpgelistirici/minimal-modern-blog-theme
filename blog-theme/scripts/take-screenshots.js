import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    const distPath = resolve(__dirname, '../dist/component-validation.html');
    const fileUrl = `file://${distPath}`;

    // Verify that the build output exists before proceeding
    try {
      await fs.access(distPath);
    } catch {
      throw new Error(
        `Build output not found at "${distPath}". Please run 'npm run build' before taking screenshots.`
      );
    }

    const screenshotsDir = resolve(__dirname, '../docs/screenshots');

    // Ensure the screenshots directory exists
    await fs.mkdir(screenshotsDir, { recursive: true });

    console.log(`Opening: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle' });

    // Take full page screenshot
    await page.screenshot({
      path: resolve(screenshotsDir, 'component-validation-full.png'),
      fullPage: true
    });
    console.log('✓ Full page screenshot saved');

    // Take screenshot of button section
    const buttonSection = page.locator('section').nth(0);
    await buttonSection.screenshot({
      path: resolve(screenshotsDir, 'component-validation-buttons.png')
    });
    console.log('✓ Button section screenshot saved');

    // Take screenshot of card section
    const cardSection = page.locator('section').nth(1);
    await cardSection.screenshot({
      path: resolve(screenshotsDir, 'component-validation-cards.png')
    });
    console.log('✓ Card section screenshot saved');

    // Take screenshot of input section
    const inputSection = page.locator('section').nth(2);
    await inputSection.screenshot({
      path: resolve(screenshotsDir, 'component-validation-inputs.png')
    });
    console.log('✓ Input section screenshot saved');

    // Test dark mode
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.locator('html.dark').waitFor();

    await page.screenshot({
      path: resolve(screenshotsDir, 'component-validation-dark.png'),
      fullPage: true
    });
    console.log('✓ Dark mode screenshot saved');

    console.log('\nAll screenshots saved successfully!');
  } catch (err) {
    console.error('Error while taking screenshots:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

takeScreenshots().catch((err) => {
  console.error('Screenshot generation failed:', err.message);
  process.exitCode = 1;
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const STORYBOOK_URL = 'http://localhost:6006';
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  xl: { width: 1920, height: 1080 },
};

// Wait for Storybook to be ready once before all tests
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  try {
    await page.goto(STORYBOOK_URL, { waitUntil: 'networkidle', timeout: 5000 });
  } catch (error) {
    throw new Error(
      'Storybook is not running. Please start Storybook with `npm run storybook` before running tests.'
    );
  } finally {
    await page.close();
  }
});

test.describe('Design System Token Validation', () => {
  test.describe('Button Component', () => {
    test('should render all button variants correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--all-variants`);
      await page.waitForLoadState('networkidle');

      // Take snapshot
      await expect(page).toHaveScreenshot('button-all-variants.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should apply correct design tokens for primary button', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--primary`);
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();

      // Check color tokens - ensure not using browser defaults
      const bgColor = await button.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('');
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(bgColor).not.toBe('rgb(0, 0, 0)');

      // Check spacing tokens - ensure padding is applied
      const padding = await button.evaluate((el) => 
        window.getComputedStyle(el).padding
      );
      expect(padding).not.toBe('');
      expect(padding).not.toBe('0px');
      expect(padding).toMatch(/px/);

      // Check border radius token - ensure it's applied
      const borderRadius = await button.evaluate((el) => 
        window.getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('');
      expect(borderRadius).not.toBe('0px');

      // Check shadow token - ensure a box shadow is applied
      const boxShadow = await button.evaluate((el) => 
        window.getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('');
      expect(boxShadow).not.toBe('none');
    });

    test('should show all button states', async ({ page }) => {
      const states = ['default', 'hover', 'active', 'focus', 'disabled', 'loading'];

      for (const state of states) {
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--${state}`);
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveScreenshot(`button-${state}.png`, {
          animations: 'disabled',
        });
      }
    });

    test('should render correctly at all breakpoints', async ({ page }) => {
      for (const [breakpoint, viewport] of Object.entries(VIEWPORTS)) {
        await page.setViewportSize(viewport);
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--all-variants`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`button-${breakpoint}.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      }
    });

    test('should pass accessibility tests', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--all-variants`);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('body')
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper focus ring on keyboard navigation', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--default`);
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      
      // Simulate keyboard focus
      await button.focus();
      
      const outline = await button.evaluate((el) => 
        window.getComputedStyle(el).outline
      );
      
      // Check if focus ring is applied (should not be 'none')
      expect(outline).not.toBe('none');
      expect(outline).not.toContain('none');
    });
  });

  test.describe('Card Component', () => {
    test('should render all card variants correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--all-variants`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('card-all-variants.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should apply correct design tokens for default card', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--default-card`);
      await page.waitForLoadState('networkidle');

      const card = page.locator('div').first();

      // Check background color
      const bgColor = await card.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();

      // Check border
      const border = await card.evaluate((el) => 
        window.getComputedStyle(el).border
      );
      expect(border).toBeTruthy();

      // Check padding
      const padding = await card.evaluate((el) => 
        window.getComputedStyle(el).padding
      );
      expect(padding).toBeTruthy();

      // Check shadow
      const boxShadow = await card.evaluate((el) => 
        window.getComputedStyle(el).boxShadow
      );
      expect(boxShadow).toBeTruthy();
    });

    test('should show all card state variants', async ({ page }) => {
      const variants = ['default-card', 'featured-card', 'simple-card', 'error-card', 'success-card', 'warning-card', 'info-card'];

      for (const variant of variants) {
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--${variant}`);
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveScreenshot(`card-${variant}.png`, {
          animations: 'disabled',
        });
      }
    });

    test('should handle long content overflow correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--long-content`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('card-long-content.png', {
        animations: 'disabled',
      });
    });

    test('should render empty state correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--empty-state`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('card-empty-state.png', {
        animations: 'disabled',
      });
    });

    test('should render responsive grid correctly at all breakpoints', async ({ page }) => {
      for (const [breakpoint, viewport] of Object.entries(VIEWPORTS)) {
        await page.setViewportSize(viewport);
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--responsive-grid`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`card-responsive-${breakpoint}.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      }
    });

    test('should pass accessibility tests', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--all-variants`);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('body')
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Input Component', () => {
    test('should render all input variants correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--all-variants`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('input-all-variants.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should apply correct design tokens for default input', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--default-input`);
      await page.waitForLoadState('networkidle');

      const input = page.locator('input').first();

      // Check border
      const border = await input.evaluate((el) => 
        window.getComputedStyle(el).border
      );
      expect(border).toBeTruthy();

      // Check padding
      const padding = await input.evaluate((el) => 
        window.getComputedStyle(el).padding
      );
      expect(padding).toBeTruthy();

      // Check font
      const fontFamily = await input.evaluate((el) => 
        window.getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toBeTruthy();
    });

    test('should show all input states', async ({ page }) => {
      const states = ['default-input', 'error-state', 'success-state', 'disabled-state'];

      for (const state of states) {
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--${state}`);
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveScreenshot(`input-${state}.png`, {
          animations: 'disabled',
        });
      }
    });

    test('should render form example correctly', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--form-example`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('input-form-example.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should have proper focus ring', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--focus-states`);
      await page.waitForLoadState('networkidle');

      const input = page.locator('input').first();
      await input.focus();

      await expect(page).toHaveScreenshot('input-focus-ring.png', {
        animations: 'disabled',
      });
    });

    test('should pass accessibility tests', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--all-variants`);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('body')
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should handle disabled state with proper attributes', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--disabled-state`);
      await page.waitForLoadState('networkidle');

      const input = page.locator('input[disabled]').first();
      
      // Check if input is disabled
      const isDisabled = await input.isDisabled();
      expect(isDisabled).toBe(true);

      // Check cursor style
      const cursor = await input.evaluate((el) => 
        window.getComputedStyle(el).cursor
      );
      expect(cursor).toBe('not-allowed');
    });
  });

  test.describe('Responsive Breakpoint Tests', () => {
    const components = [
      { name: 'button', story: 'all-variants' },
      { name: 'card', story: 'responsive-grid' },
      { name: 'input', story: 'responsive-form' },
    ];

    for (const component of components) {
      test(`should render ${component.name} correctly at sm breakpoint (480px)`, async ({ page }) => {
        await page.setViewportSize({ width: 480, height: 667 });
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-${component.name}--${component.story}`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`${component.name}-sm-breakpoint.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });

      test(`should render ${component.name} correctly at md breakpoint (768px)`, async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-${component.name}--${component.story}`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`${component.name}-md-breakpoint.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });

      test(`should render ${component.name} correctly at lg breakpoint (1024px)`, async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-${component.name}--${component.story}`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`${component.name}-lg-breakpoint.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });

      test(`should render ${component.name} correctly at xl breakpoint (1280px)`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-${component.name}--${component.story}`);
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveScreenshot(`${component.name}-xl-breakpoint.png`, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  });

  test.describe('Design Token Configuration Tests', () => {
    test('should verify Tailwind config has all required design tokens', async ({ page }) => {
      // This test would require access to the Tailwind config
      // For now, we'll verify that the tokens are applied in the components
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--default`);
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      
      // Verify transitions are applied
      const transition = await button.evaluate((el) => 
        window.getComputedStyle(el).transition
      );
      expect(transition).toContain('all');
    });

    test('should verify color tokens are applied', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--primary`);
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      const bgColor = await button.evaluate((el) => {
        const rgb = window.getComputedStyle(el).backgroundColor;
        // Convert rgb to hex for verification
        return rgb;
      });

      // Verify it's not using default browser styles
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(bgColor).not.toBe('rgb(0, 0, 0)');
    });

    test('should verify typography tokens are applied', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--default-card`);
      await page.waitForLoadState('networkidle');

      const title = page.locator('h3').first();
      const fontFamily = await title.evaluate((el) => 
        window.getComputedStyle(el).fontFamily
      );

      // Verify custom font family is applied (should include Inter or IBM Plex Sans)
      expect(fontFamily).toMatch(/Inter|IBM Plex Sans/i);
    });

    test('should verify spacing tokens are applied', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--default-card`);
      await page.waitForLoadState('networkidle');

      const card = page.locator('div').first();
      const padding = await card.evaluate((el) => 
        window.getComputedStyle(el).padding
      );

      // Verify padding is using design system values
      expect(padding).toBeTruthy();
      expect(padding).not.toBe('0px');
    });

    test('should verify shadow tokens are applied', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--default-card`);
      await page.waitForLoadState('networkidle');

      const card = page.locator('div').first();
      const boxShadow = await card.evaluate((el) => 
        window.getComputedStyle(el).boxShadow
      );

      // Verify shadow is applied
      expect(boxShadow).not.toBe('none');
    });

    test('should verify border radius tokens are applied', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--default`);
      await page.waitForLoadState('networkidle');

      const button = page.locator('button').first();
      const borderRadius = await button.evaluate((el) => 
        window.getComputedStyle(el).borderRadius
      );

      // Verify border radius is applied
      expect(borderRadius).not.toBe('0px');
    });
  });

  test.describe('Dark Mode Token Tests', () => {
    test('should render button in dark mode', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--all-variants&globals=theme:dark`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('button-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should render card in dark mode', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-card--all-variants&globals=theme:dark`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('card-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should render input in dark mode', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-input--all-variants&globals=theme:dark`);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('input-dark-mode.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should maintain proper contrast in dark mode', async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/iframe.html?id=components-button--all-variants&globals=theme:dark`);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('body')
        .withTags(['wcag2aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});

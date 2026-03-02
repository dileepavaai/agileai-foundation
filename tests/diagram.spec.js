const { test, expect } = require('@playwright/test');

test.describe('Canonical Diagram Rendering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/guide/v1.1/');
  });

  test('Light mode shows correct diagram', async ({ page }) => {

    // 🔎 Structural sanity checks (fail fast if wrong page loads)
    await expect(page).toHaveTitle(/Agile AI Guide/i);
    await expect(page.locator('.diagram-container')).toHaveCount(1);

    // Force deterministic theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    // Ensure elements exist before visibility assertion
    await expect(page.locator('.diagram-light')).toHaveCount(1);
    await expect(page.locator('.diagram-dark')).toHaveCount(1);

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    // 🔎 Structural sanity checks
    await expect(page).toHaveTitle(/Agile AI Guide/i);
    await expect(page.locator('.diagram-container')).toHaveCount(1);

    // Force deterministic theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    // Ensure elements exist before visibility assertion
    await expect(page.locator('.diagram-light')).toHaveCount(1);
    await expect(page.locator('.diagram-dark')).toHaveCount(1);

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
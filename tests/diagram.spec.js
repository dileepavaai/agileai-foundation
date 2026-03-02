const { test, expect } = require('@playwright/test');

test.describe('Canonical Diagram Rendering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/guide/v1.1/');
  });

  test('Light mode shows correct diagram', async ({ page }) => {

    await expect(page).toHaveTitle(/Agile AI Guide/i);
    await expect(page.locator('.diagram-container')).toHaveCount(1);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    await expect(page.locator('.diagram-light')).toHaveCount(1);
    await expect(page.locator('.diagram-dark')).toHaveCount(1);

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    await expect(page).toHaveTitle(/Agile AI Guide/i);
    await expect(page.locator('.diagram-container')).toHaveCount(1);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await expect(page.locator('.diagram-light')).toHaveCount(1);
    await expect(page.locator('.diagram-dark')).toHaveCount(1);

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
const { test, expect } = require('@playwright/test');

test.describe('Canonical Diagram Rendering', () => {

  test('Light mode shows correct diagram', async ({ page }) => {

    await page.goto('/guide/v1.1/');

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    await page.goto('/guide/v1.1/');

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
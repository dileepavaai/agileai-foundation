const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:8080';

test.describe('Canonical Diagram Rendering', () => {

  test('Light mode shows correct diagram', async ({ page }) => {

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Force light theme deterministically
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Force dark theme deterministically
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
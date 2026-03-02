const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:8080';

test.describe('Canonical Diagram Rendering', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('agileai-theme');
    });
  });

  test('Light mode shows correct diagram', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'light');
    });

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Wait for theme to apply
    await page.waitForSelector('.diagram-light');

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'dark');
    });

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Wait for theme to apply
    await page.waitForSelector('.diagram-dark');

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
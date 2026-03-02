const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:8080';

test.describe('Canonical Diagram Rendering', () => {

  test('Light mode shows correct diagram', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'light');
    });

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Wait until theme is applied to <html>
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'dark');
    });

    await page.goto(`${baseURL}/guide/v1.1/index.html`);

    // Wait until theme is applied to <html>
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
const { test, expect } = require('@playwright/test');

test.describe('Canonical Diagram Rendering', () => {

  test.beforeEach(async ({ page }) => {
    // Reset theme state before each test
    await page.addInitScript(() => {
      localStorage.removeItem('agileai-theme');
      document.documentElement.removeAttribute('data-theme');
    });
  });

  test('Light mode shows correct diagram', async ({ page }) => {

    // Simulate persisted light theme
    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'light');
    });

    await page.goto('/guide/v1.1/index.html');

    await expect(page.locator('.diagram-light')).toBeVisible();
    await expect(page.locator('.diagram-dark')).not.toBeVisible();
  });

  test('Dark mode shows correct diagram', async ({ page }) => {

    // Simulate persisted dark theme
    await page.addInitScript(() => {
      localStorage.setItem('agileai-theme', 'dark');
    });

    await page.goto('/guide/v1.1/index.html');

    await expect(page.locator('.diagram-dark')).toBeVisible();
    await expect(page.locator('.diagram-light')).not.toBeVisible();
  });

});
const { test, expect } = require('@playwright/test');

test('Light mode shows correct diagram', async ({ page }) => {
  await page.goto('https://agileai.foundation/guide/v1.1/');
  await page.evaluate(() =>
    document.documentElement.setAttribute('data-theme', 'light')
  );

  const lightVisible = await page.isVisible('.diagram-light');
  const darkVisible  = await page.isVisible('.diagram-dark');

  expect(lightVisible).toBeTruthy();
  expect(darkVisible).toBeFalsy();
});

test('Dark mode shows correct diagram', async ({ page }) => {
  await page.goto('https://agileai.foundation/guide/v1.1/');
  await page.evaluate(() =>
    document.documentElement.setAttribute('data-theme', 'dark')
  );

  const lightVisible = await page.isVisible('.diagram-light');
  const darkVisible  = await page.isVisible('.diagram-dark');

  expect(lightVisible).toBeFalsy();
  expect(darkVisible).toBeTruthy();
});
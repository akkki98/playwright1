const { test, expect } = require('@playwright/test');

test('Verify Google homepage title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('Search in Bing and check results', async ({ page }) => {
  await page.goto('https://www.bing.com');
  await page.fill('input[name="q"]', 'Playwright testing');
  await page.press('input[name="q"]', 'Enter');
  await expect(page).toHaveTitle(/Playwright/);
});
//test3

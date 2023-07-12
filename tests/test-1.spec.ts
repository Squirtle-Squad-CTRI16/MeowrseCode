import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  // await page.getByPlaceholder('username').click();
  await page.getByPlaceholder('username').fill('test');
  await page
    .getByRole('button', { name: 'I wanna meow at strangers please' })
    .click();
  await expect(page.getByRole('heading', { name: 'test' })).toBeVisible();
  // await page.getByRole('img').click();
  await page.getByRole('button', { name: 'Meow 😼' }).click();
});

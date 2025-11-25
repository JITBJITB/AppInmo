import { test, expect, Page } from '@playwright/test';

test('login flow', async ({ page }: { page: Page }) => {
    // 1. Navigate to login page
    await page.goto('/login');

    // 2. Enter credentials
    await page.fill('input[name="username"]', 'testuser'); // Adjust selector as needed
    await page.fill('input[name="password"]', 'password123'); // Adjust selector as needed

    // 3. Click login button
    await page.click('button:has-text("Ingresar")');

    // 4. Verify redirection to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
});

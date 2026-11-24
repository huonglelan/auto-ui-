import { test, expect, Page } from '@playwright/test';

test('verify dropdown', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown');
  await selectSelectDwopdownItemByLabel('Dropdown Button', '3rd menu item', page);
  await expect(page.getByText('Value: 3rd menu item')).toBeVisible();
});

async function selectSelectDwopdownItemByLabel(label: string, item: string, page: Page) {
  let dropdownOptionXpath = `//label[normalize-space()="Dropdown Button"]/following::button[@aria-label='Dropdown options']`;
  await page.locator(dropdownOptionXpath).click();
  let itemXpath = `//li[@role='menuitem' and normalize-space()='${item}']`;
  await page.locator(itemXpath).click(); 
}


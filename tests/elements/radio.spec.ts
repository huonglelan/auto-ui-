import { test, expect, Page } from '@playwright/test';

test('verify radio is clickable', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/radio');
  await selectRadioOptionByLabel('Default Radio Group','Orange',page);
  await expect(page.getByText('Value: Orange').first()).toBeVisible();
  await selectRadioOptionByLabel('Button Style Radio Group','Apple',page);
  await expect(page.getByText('Value: Apple')).toBeVisible();
  await selectRadioOptionByLabel('Outline Button Radio Group','Pear',page);
  await expect(page.getByText('Value: Pear')).toBeVisible();
});

async function selectRadioOptionByLabel(label: string, option: string, page: Page) {
  let xpath = `//*[normalize-space()='${label}']/following::label[normalize-space()='${option}'][1]`;
  await page.locator(xpath).click();
}


import { test, expect, Page } from '@playwright/test';

test('verify button is clickable', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
  await inputTextByLable('Normal Input','Normal Value',page);
  await expect(page.getByText('Value: Normal Value')).toBeVisible();
  await inputTextByLable('Input Number','3',page);
  await expect(page.getByText('Value: 3')).toBeVisible();
  await inputTextByLable('Text Area','Good morning',page);
  await expect(page.getByText('Value: Good morning')).toBeVisible();
  await inputTextByLable('Password Box','A@2',page);
  await expect(page.getByText('Value: A@2')).toBeVisible();
  
});


async function inputTextByLable(label: string, input: string, page: Page) {
  let xpath = `//label[normalize-space()='${label}']//following::*[self::input or self::textarea][1]`;
  let inputLocator = page.locator(xpath);
  await inputLocator.click();
  await inputLocator.clear();
  await inputLocator.fill(input);
}

test('Verify OTP', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
  await inputOtpByLabel('OTP Box', '123456', page);
  await expect(page.getByText('Value: 123456')).toBeVisible();
});

async function inputOtpByLabel(label:string, input: string ,page: Page) {
  for(let i=0; i<input.length; i++) {
    let xpath = `(//label[normalize-space()='${label}']/following::input)[${i+1}]`;
    let inputLocator = page.locator(xpath);
    await inputLocator.click();
    await inputLocator.clear();
    await inputLocator.fill(input[i]);
  }
}

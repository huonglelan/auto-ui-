import { test, expect, Page } from '@playwright/test';

test('verify button is clickable', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');
  await clickButtonByLabel2('Div button', page);
  await expect(page.getByText('Button Div button was clicked!')).toBeVisible();

  await clickButtonByLabel2('Origin button', page);
  await expect(page.getByText('Button Origin button was clicked!')).toBeVisible();

  await clickButtonByLabel2('Input button', page);
  await expect(page.getByText('Button Input button was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Default', page);
  await expect(page.getByText('Button Default was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Primary', page);
  await expect(page.getByText('Button Primary was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Dashed', page);
  await expect(page.getByText('Button Dashed was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Text', page);
  await expect(page.getByText('Button Text was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Link', page);
  await expect(page.getByText('Button Link was clicked!')).toBeVisible();
  
  await clickButtonByLabel2('Icon button', page);
  await expect(page.getByText('Button Icon button was clicked!')).toBeVisible();
});

async function clickButtonByLabel(label: string, page: Page) {
  // let divButtonXpath = `//div[@role="button" and normalize-space()='${label}']`;
  // let inputXpath = `//input[@type="button" and @value='${label}']`;
  // let buttonXpath = `//button[normalize-space()='${label}']`;
  // let xpath = `${divButtonXpath} | ${inputXpath} | ${buttonXpath} `;
  let xpath = `//*[(@role="button" or self::button or self::input) and (normalize-space()='${label}' or @value='${label}')]`
  await page.locator(xpath).click();
}

async function clickButtonByLabel2(label: string, page: Page) {
  await page.getByRole('button', {name: label}).click();  
}


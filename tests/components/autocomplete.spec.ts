import { test, expect, Page } from '@playwright/test';

test('verify select auto complete', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/auto-complete');
  await selectAutoCompleteOptionByLabel('AutoComplete','Wall Street',page);
  await expect(page.getByText('Value: Wall Street was selected!')).toBeVisible();
});

async function selectAutoCompleteOptionByLabel(label: string, option: string, page: Page) {
  let autoCompleteInputXpath = `(//label[normalize-space()='${label}']//following::input[@role="combobox"])[1]`;
  let autoCompleteInputLocator = page.locator(autoCompleteInputXpath);
  await autoCompleteInputLocator.click();
  await autoCompleteInputLocator.clear();
  await autoCompleteInputLocator.fill(option);
  let optionXpath = `//div[contains(concat(' ',@class,' '),' ant-select-item-option ') and normalize-space()='${option}']`;
  await page.locator(optionXpath).click();
}


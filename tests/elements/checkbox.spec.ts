import { test, expect, Page } from '@playwright/test';

test('verify button is clickable', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
  await selectCheckboxByLable('Fruits', 'Apple','uncheck',page);
  await expect(page.getByText('Selected values: Apple Pear')).not.toBeVisible();
});

// async function selectCheckboxByLable(label: string, page: Page) {
//   //let xpath = `(//input[@value='${label}']/ancestor::label)[1]`;
//   //let xpath = `//label[contains(concat(' ',@class,' '),'css-12q6fii')]`;
//   let xpath = `//label[.//input[@type='checkbox'] and normalize-space()='${label}']`;
//   let checkboxLocator = page.locator(xpath);
//   let classes = checkboxLocator.getAttribute('class');
//   let isChecked = `${classes}`.includes(' ant-checkbox-checked ');
//   if (!isChecked){
//     await checkboxLocator.click();
//   }
// }

async function selectCheckboxByLable(label: string, option: string, action: 'check'|'uncheck', page: Page) {
  //let xpath = `(//input[@value='${label}']/ancestor::label)[1]`;
  //let xpath = `//label[contains(concat(' ',@class,' '),'css-12q6fii')]`;
  //let xpath = `//label[.//input[@type='checkbox'] and normalize-space()='${label}']`;
  let xpath = `(//label[normalize-space()='${label}']/following::label[.//input[@type="checkbox"] and normalize-space()='${option}'])[1]`
  let checkboxLocator = page.locator(xpath);
  let classes = await checkboxLocator.getAttribute('class');
  let isChecked = `${classes}`.includes(' ant-checkbox-wrapper-checked ');
  if (isChecked==true && action == 'uncheck' || (isChecked==false && action == 'check')) {
    await checkboxLocator.click();
  };
}


import { test, expect, Page } from '@playwright/test';

test('verify time picker', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
  await inputTimeByLable('Time Picker', '10', '22', '59', page);
  await expect(page.getByText('Current time: 10:22:59')).toBeVisible();
});

async function inputTimeByLable(label: string, hour: string, minutes: string, second: string, page:Page) {
  let timePickerXpath = `(//label[normalize-space()="Time Picker"]/following-sibling::div[.//input[@placeholder='Select time'] and contains(concat(' ', @class, ' '), ' ant-picker ')])[1]`;
  await page.locator(timePickerXpath).click();
  let hourXpath = `//ul[@data-type="hour"]//li[normalize-space()="${hour}"]`;
  await page.locator(hourXpath).click();
  let minutesXpath = `//ul[@data-type="minute"]//li[normalize-space()="${minutes}"]`;
  await page.locator(minutesXpath).click();
  let secondXpath = `//ul[@data-type="second"]//li[normalize-space()="${second}"]`;
  await page.locator(secondXpath).click();
  let okButtonXpath = `//li[contains(concat(' ',@class,' '),' ant-picker-ok ')]//button[normalize-space()="OK"]`;
  await page.locator(okButtonXpath).click();
}

test('verify date picker', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
  await inputDateByLabee('Date Picker', '1999', 'Aug', '22', page);
  await expect(page.getByText('Current date: 1999-08-22')).toBeVisible();
  await inputDateByLabee('Date Picker', '2045', 'Aug', '22', page);
  await expect(page.getByText('Current date: 2045-08-22')).toBeVisible();
});

async function inputDateByLabee(label: string, yyyy: string, mm: string, dd: string, page: Page) {
  let datePickerXpath = `(//label[normalize-space()="Date Picker"]/following-sibling::div[.//input[@placeholder='Select date'] and contains(concat(' ', @class, ' '), ' ant-picker ')])[1]`;
  await page.locator(datePickerXpath).click();
  let selectYearButtonXpath = `//button[@aria-label="Choose a year"]`;
  await page.locator(selectYearButtonXpath).click();

  let selectDecadeButtonXpath = `//button[@aria-label="Choose a decade"]`;
  let selectDecadeButtonLocator = page.locator(selectDecadeButtonXpath);
  let selectDecadeButtonText = await selectDecadeButtonLocator.textContent();
  let [minYear, maxYear] = selectDecadeButtonText?.split('-') || [];
  let [minYearNum, maxYearNum, YearNum] = [Number.parseInt(minYear), Number.parseInt(maxYear), Number.parseInt(yyyy)];
  let decade = maxYearNum - minYearNum + 1;
  if(YearNum < minYearNum) {
    let distance = minYearNum - YearNum;
    await findDecadeBylabel('Last year', distance, decade, page);
  } else if (YearNum > maxYearNum) {
    let distance = YearNum - maxYearNum;
    await findDecadeBylabel('Next year', distance, decade, page);
  }
  await selectPickerCell(yyyy,page);
  await selectPickerCell(mm,page);
  await selectPickerCell(dd,page);
}

async function selectPickerCell(input:string, page:Page) {
  let xpath = `//td[contains(concat(' ',@class,' '),' ant-picker-cell ')]//div[normalize-space()="${input}"]`;
  await page.locator(xpath).click();
}

async function findDecadeBylabel(label:string, distance:number, decade:number, page:Page) {
    let clickCount = Math.ceil(distance/decade);
    let moveButtonXpath = `//button[@aria-label="${label}"]`;
    for(let i=0; i< clickCount; i++){
      await page.locator(moveButtonXpath).click();
    }
}


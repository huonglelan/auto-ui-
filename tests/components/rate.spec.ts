import { test, expect, Page } from '@playwright/test';

test('verify rating', async ({ page }) => {
  await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
  await selectRatingByLabel('Rating',3,page);
  await expect(page.getByText('Current rating: normal')).toBeVisible();
  await selectRatingByLabel('Rating',1,page);
  await expect(page.getByText('Current rating: terrible')).toBeVisible();
});

async function selectRatingByLabel(label: string, rate: number, page: Page) {
  let ratingGroupXpath =`(//label[normalize-space()='Rating']//following::ul[contains(concat(' ',@class,' '),' ant-rate ')])[1]`;
  let ratingGroupLocator = page.locator(ratingGroupXpath);
  let CurrentRating = await ratingGroupLocator.locator("//div[@role='radio' and @aria-checked='true']").count();
  if(CurrentRating != rate){
    let xpath = `//div[@aria-posinset='${rate}' and @role='radio']`;
    await ratingGroupLocator.locator(xpath).click();
  }
}


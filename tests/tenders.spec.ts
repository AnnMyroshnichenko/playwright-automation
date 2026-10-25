import { test, expect } from '@playwright/test';
import { TendersPage } from '../pages/tenders-page';

test('C260: View and verify tenders in the list and card details', async ({
  page,
}) => {
  const tendersPage = new TendersPage(page);
  await tendersPage.open();
  await expect(page).toHaveURL(/.*tenders-map.*/);

  await expect(tendersPage.showListBtn).toBeVisible();
  await tendersPage.showListBtn.click();

  await expect(tendersPage.tendersCount).toBeVisible();
  await expect(tendersPage.tendersCount).toHaveText(/Знайдено \d+ /);

  const card = tendersPage.tenderCard.first();
  await expect(card).toBeVisible();

  const cardElements = tendersPage.getTenderCardElements(card);

  await expect(cardElements.name).toBeVisible();
  await expect(cardElements.category).toBeVisible();
  await expect(cardElements.author).toBeVisible();
  await expect(cardElements.period).toBeVisible();
  await expect(cardElements.location).toBeVisible();
  await expect(cardElements.timer).toBeVisible();
  await expect(cardElements.price).toBeVisible();
  await expect(cardElements.buttonOrLabel).toBeVisible();
});

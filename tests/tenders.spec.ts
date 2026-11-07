import { test, expect } from '../fixtures/test';

test('C260: View and verify tenders in the list and card details', async ({
  page,
  tendersPage,
}) => {
  await test.step('Open tenders page and open the list view', async () => {
    await tendersPage.open();
    await expect(page).toHaveURL(tendersPage.url);

    await expect(tendersPage.showListBtn).toBeVisible();
    await tendersPage.showListBtn.click();
  });

  await test.step('Verify header count matches actual rendered cards', async () => {
    await expect(tendersPage.tendersCount).toBeVisible();
    await expect(tendersPage.tendersCount).toHaveText(/Знайдено \d+ /);

    const countText = await tendersPage.tendersCount.textContent();
    const match = countText?.match(/\d+/);
    const expectedCount = match ? parseInt(match[0], 10) : 0;

    const actualCardCount = await tendersPage.tenderCard.count();
    expect(actualCardCount).toBe(expectedCount);
  });

  await test.step('Verify tender card details contain actual data', async () => {
    const card = tendersPage.tenderCard.first();
    await expect(card).toBeVisible();

    const cardElements = tendersPage.getTenderCardElements(card);

    await expect(cardElements.name).not.toBeEmpty();
    await expect(cardElements.category).not.toBeEmpty();
    await expect(cardElements.author).not.toBeEmpty();
    await expect(cardElements.period).not.toBeEmpty();
    await expect(cardElements.location).not.toBeEmpty();
    await expect(cardElements.timer).not.toBeEmpty();
    await expect(cardElements.price).not.toBeEmpty();
    await expect(cardElements.buttonOrLabel).toBeVisible();
  });
});

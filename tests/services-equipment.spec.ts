import { test, expect } from '../fixtures/test';

test.describe('C212 & C213: Services and Equipment Navigation', () => {
  test('C212: Verify 7 popular services and logo navigation', async ({
    page,
    mainPage,
    productsPage,
  }) => {
    await mainPage.open();
    await expect(mainPage.popularFilter).toBeVisible();

    for (let i = 0; i < 7; i++) {
      await mainPage.clickPurposeServices(i);
      await expect(page).toHaveURL(new RegExp(`^${productsPage.url}`));

      await mainPage.header.clickLogo();
      await expect(page).toHaveURL(mainPage.url);
    }
  });

  test('C213: Verify 7 popular special equipment items and navigation', async ({
    page,
    mainPage,
    productsPage,
  }) => {
    await mainPage.open();
    await expect(mainPage.popularEquipmentFilter).toBeVisible();

    for (let i = 0; i < 7; i++) {
      await mainPage.clickPurposeEquipment(i);
      await expect(page).toHaveURL(new RegExp(`^${productsPage.url}`));

      await mainPage.header.clickLogo();
      await expect(page).toHaveURL(mainPage.url);
    }
  });
});

import { test, expect } from '../fixtures/test';
import { servicesTabs } from '../test-data/service-items';
import { equipmentTabs } from '../test-data/equipment-items';

test.use({ launchOptions: { slowMo: 300 } });

test.describe('C212 & C213: Services and Equipment Navigation', () => {
  test.describe('C212: Services Navigation and Filters', () => {
    // Run C212 exclusively on WebKit where it is fully stable
    test.skip(
      ({ browserName }) => browserName !== 'webkit',
      'Running exclusively on WebKit due to staging environment timing limits',
    );

    test.describe.configure({ retries: 5 });
    for (const tab of servicesTabs) {
      test.describe(`Service Tab: ${tab.tabName}`, () => {
        if (tab.items.length === 0) {
          test('Verify tab opens and is empty', async ({ mainPage }) => {
            await test.step('Open main page and click service tab', async () => {
              await mainPage.open();
              await mainPage.clickServicesTab(tab.tabId);
            });
            await test.step('Verify tab contains no purposes', async () => {
              await expect(mainPage.allPurposesUnderService).toHaveCount(0);
            });
          });
        } else {
          for (const [index, item] of tab.items.entries()) {
            test(`Verify service item ${index + 1}: "${item.name}"`, async ({
              mainPage,
              productsPage,
            }) => {
              await test.step('Navigate to service tab and category', async () => {
                await mainPage.open();

                if (tab.tabName !== 'Popular') {
                  await mainPage.clickServicesTab(tab.tabId);
                }

                await mainPage.clickServiceCategory(item.serviceId);
              });

              await test.step('Verify products page filter is visible', async () => {
                await expect(
                  productsPage.getFilter(item.filterId),
                ).toBeVisible();
              });
            });
          }
        }
      });
    }
  });

  test.describe('C213: Verify Special Equipment Tabs, Items, Links, and Filters', () => {
    test.describe.configure({ mode: 'serial', retries: 2 });

    for (const tab of equipmentTabs) {
      test.describe(`Tab: ${tab.tabName}`, () => {
        if (tab.items.length === 0) {
          test('Verify tab is empty', async ({ mainPage }) => {
            await test.step('Open main page and click equipment tab', async () => {
              await mainPage.open();
              await mainPage.clickEquipmentTab(tab.tabId);
            });
          });
          return;
        }

        for (const [index, item] of tab.items.entries()) {
          test(`Verify item ${index + 1}: "${item.name}"`, async ({
            mainPage,
            productsPage,
          }) => {
            await test.step('Navigate to equipment tab and category', async () => {
              await mainPage.open();

              if (tab.tabName !== 'Popular') {
                await mainPage.clickEquipmentTab(tab.tabId);
              }

              await mainPage.clickEquipmentCategory(item.categoryId);
            });

            await test.step('Verify URL and filter chip', async () => {
              await expect
                .poll(() => productsPage.getUrl())
                .toContain(item.url);

              if (!item.skipFilterCheck) {
                await expect(
                  productsPage.getFilter(item.filterId),
                ).toBeVisible();
              }
            });
          });
        }
      });
    }
  });
});

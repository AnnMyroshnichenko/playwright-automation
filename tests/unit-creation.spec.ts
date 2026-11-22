import { test, expect } from '../fixtures/fixtures';
import { AUTH_FILE } from '../utils/auth-helpers';
import unitData from '../test-data/create-unit-data.json';

test.describe('unit creation flow tests', () => {
    test.use({ storageState: AUTH_FILE })
    test.beforeEach(async ({ createUnitPage }) => {
        await createUnitPage.open();
        await expect(createUnitPage.categoryField).toBeVisible();
    });

    test('C329. Verify "Далі" button on main information tab', async ({ createUnitPage }) => {
        await test.step('1. Click on "Далі" button without filling required fields', async () => {
            await expect(createUnitPage.nextBtn).toBeVisible();
            await expect(createUnitPage.nextBtn).toHaveText(unitData.buttonNames.nextBtn);
            await createUnitPage.nextBtn.click();
        });

        await test.step('2. Error messages should be displayed', async () => {
            for (const fieldLocator of [createUnitPage.categoryField, createUnitPage.unitNameField, createUnitPage.producerSearchField, createUnitPage.addressField]) {
                await expect(createUnitPage.getinputError(fieldLocator)).toBeVisible();
            }
        });

        await test.step('3. Fill required fields and press "Далі" button', async () => {
            await createUnitPage.fillDataInRequiredFields(unitData.validData.unitName, unitData.validData.unitProducer, unitData.addressPlaceholder);
        });


        await test.step('4. Verify that the next tab is opened', async () => {
            for (let i = 0; i < unitData.tabNames.length; i++) {
                const tabNumberLocator = createUnitPage.tabNumbers.nth(i);
                await expect(tabNumberLocator).toBeVisible();
                await expect(tabNumberLocator).toHaveText((i + 1).toString());
                await expect(createUnitPage.getTabTextLocator(tabNumberLocator)).toHaveText(unitData.tabNames[i]);
                if (i !== 1) {
                    await expect(createUnitPage.tabButtons.nth(i)).toHaveAttribute('aria-selected', 'false');
                }
            }
            await expect(createUnitPage.tabButtons.nth(1)).toHaveAttribute('aria-selected', 'true');

            await expect(createUnitPage.bodyTitle).toBeVisible();
            await expect(createUnitPage.bodyTitle).toHaveText(unitData.bodyTitle);
        });
    });

    test('C390. After returning to the previous tab data is preserved(Info)', async ({ createUnitPage }) => {
        await test.step('1. Fill required fields', async () => {
            await createUnitPage.fillDataInRequiredFields(unitData.validData.unitName, unitData.validData.unitProducer, unitData.addressPlaceholder);
        });

        await test.step('2. return to the previous tab', async () => {
            await expect(createUnitPage.prevBtn).toBeVisible();
            await expect(createUnitPage.prevBtn).toHaveText(unitData.buttonNames.prevBtn);
            await createUnitPage.prevBtn.click();

            for (let i = 0; i < unitData.tabNames.length; i++) {
                if (i !== 0) {
                    await expect(createUnitPage.tabButtons.nth(i)).toHaveAttribute('aria-selected', 'false');
                }
            }
            await expect(createUnitPage.tabButtons.nth(0)).toHaveAttribute('aria-selected', 'true');
        });

        await test.step('3. Verify that the data in the fields is preserved', async () => {
            await expect(createUnitPage.categoryField).toHaveText(unitData.validData.categoryName);
            await expect(createUnitPage.unitNameField).toHaveValue(unitData.validData.unitName);
            await expect(createUnitPage.producerSelected).toHaveText(unitData.validData.unitProducer);
            await expect(createUnitPage.addressField).not.toHaveText(unitData.addressPlaceholder);
        });

    });

    test('C393. Trying to proceed without uploading image', async ({ createUnitPage }) => {
        await test.step('1. Fill required fields', async () => {
            await expect(createUnitPage.nextBtn).toBeVisible();
            await createUnitPage.fillDataInRequiredFields(unitData.validData.unitName, unitData.validData.unitProducer, unitData.addressPlaceholder);
        });

        await test.step('2. Click on "Далі" button without uploading image', async () => {
            await expect(createUnitPage.imageBlocks.first()).toBeVisible();
            await createUnitPage.nextBtn.click();

            await expect(createUnitPage.imageHint).toHaveAttribute('class', /ImagesUnitFlow_error/);
            await expect(createUnitPage.tabButtons.nth(1)).toHaveAttribute('aria-selected', 'true');
        });


        await test.step('3. Upload image', async () => {
            await expect(createUnitPage.imageBlocks.first()).toBeVisible();
            await createUnitPage.uploadImages(unitData.validData.imagePath1);
            await createUnitPage.nextBtn.click();
        });

        await test.step('4. Verify that the next tab is opened', async () => {
            for (let i = 0; i < unitData.tabNames.length; i++) {
                const tabNumberLocator = createUnitPage.tabNumbers.nth(i);
                await expect(tabNumberLocator).toBeVisible();
                await expect(tabNumberLocator).toHaveText((i + 1).toString());
                await expect(createUnitPage.getTabTextLocator(tabNumberLocator)).toHaveText(unitData.tabNames[i]);
                if (i !== 2) {
                    await expect(createUnitPage.tabButtons.nth(i)).toHaveAttribute('aria-selected', 'false');
                }
            }
            await expect(createUnitPage.tabButtons.nth(2)).toHaveAttribute('aria-selected', 'true');

            await expect(createUnitPage.bodyTitle).toBeVisible();
            await expect(createUnitPage.bodyTitle).toHaveText(unitData.bodyTitle);
        });
    });

    test('C488. Verify that the data in the fields is preserved after returning to the previous tab (Services)', async ({ createUnitPage }) => {
        await test.step('1. Fill required fields', async () => {
            await expect(createUnitPage.nextBtn).toBeVisible();
            await createUnitPage.fillDataInRequiredFields(unitData.validData.unitName, unitData.validData.unitProducer, unitData.addressPlaceholder);
        });

        await test.step('2. Upload image', async () => {
            await expect(createUnitPage.imageBlocks.first()).toBeVisible();
            await createUnitPage.uploadImages(unitData.validData.imagePath1);

            await createUnitPage.nextBtn.click();
        });

        await test.step('3. Pick services', async () => {
            await expect(createUnitPage.serviceSearchField).toBeVisible();
            await createUnitPage.typeInField(createUnitPage.serviceSearchField, unitData.serviceName);
            await expect(createUnitPage.serviceSearchDropdownItems.first()).toBeVisible();
            await createUnitPage.serviceSearchDropdownItems.first().click();

            await createUnitPage.nextBtn.click();
        });

        await test.step('4. return to the services tab', async () => {
            await expect(createUnitPage.prevBtn).toBeVisible();
            await expect(createUnitPage.prevBtn).toHaveText(unitData.buttonNames.prevBtn);
            await createUnitPage.prevBtn.click();

            await expect(createUnitPage.selectedService).toBeVisible();
            await expect(createUnitPage.selectedService).toHaveText(unitData.serviceName);

            for (let i = 0; i < unitData.tabNames.length; i++) {
                if (i !== 2) {
                    await expect(createUnitPage.tabButtons.nth(i)).toHaveAttribute('aria-selected', 'false');
                }
            }
            await expect(createUnitPage.tabButtons.nth(2)).toHaveAttribute('aria-selected', 'true');
        });
    });

})
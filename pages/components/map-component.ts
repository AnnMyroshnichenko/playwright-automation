import { expect, Locator, Page } from '@playwright/test';

export class MapComponent {
    private readonly page: Page;
    private readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('#map');
    }

    public get mapWindow(): Locator {
        return this.root;
    }

    public get showAsListBtn(): Locator {
        return this.page.locator('[class^="MapListSwitcher"][type="button"]');
    }

    public get zoomInBtn(): Locator {
        return this.root.locator('.leaflet-control-zoom-in');
    }

    public get zoomOutBtn(): Locator {
        return this.root.locator('.leaflet-control-zoom-out');
    }

    public get regions(): Locator {
        return this.root.locator('path.leaflet-interactive');
    }

    public get markers(): Locator {
        return this.root.locator('.leaflet-marker-icon');
    }

    public async getRegionWidth(): Promise<number> {
        const box = await this.regions.first().boundingBox();
        if (!box) {
            throw new Error('Map region is not rendered');
        }
        return box.width;
    }

    public async waitForZoomEnd(): Promise<void> {
        await expect(this.root.locator('.leaflet-zoom-anim')).toHaveCount(0);

        let last = -1;
        await expect.poll(async () => {
            const width = await this.getRegionWidth();
            const isStable = width === last;
            last = width;
            return isStable;
        }, { intervals: [150] }).toBe(true);
    }

    public async scrollZoom(deltaY: number): Promise<void> {
        const box = await this.root.boundingBox();
        if (!box) {
            throw new Error('Map is not rendered');
        }
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.wheel(0, deltaY);
    }
}
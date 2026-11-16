import { Page } from '@playwright/test';
 
const isSearchRequest = (url: URL) => url.pathname === '/api/search/';
 
export async function mockSearchResponse(page: Page, body: object): Promise<void> {
    await page.route(isSearchRequest, route => route.fulfill({ json: body }));
}
 
export async function removeSearchMock(page: Page): Promise<void> {
    await page.unroute(isSearchRequest);
}
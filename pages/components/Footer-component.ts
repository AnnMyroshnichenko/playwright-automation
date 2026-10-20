import { Locator, Page } from '@playwright/test';

export class Footer {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get nameField(): Locator {
        return this.page.locator('[name="name"]');
    }

    public get mobileField(): Locator {
        return this.page.locator('#mobile');
    }

    public get requestConsultationBtn(): Locator {
        return this.page.getByRole('button', { name: 'Замовити консультацію'});
    }

    public get confidentialPolicy(): Locator {
        return this.page.getByTestId('politika-konfidenciinosti');
    }

    public get cookiePolicy(): Locator {
        return this.page.getByTestId('pravila-vikoristannya-failiv-cookie');
    }

    public get accessTerms(): Locator {
        return this.page.getByTestId('umovi-dostupu-ta-koristuvannya');
    }

    public get advertisement(): Locator {
        return this.page.getByTestId('ogoloshennya');
    }

    public get tenders(): Locator {
        return this.page.getByTestId('tenderi');
    }
    
    public get workRequests(): Locator {
        return this.page.getByTestId('zapiti-na-robotu');
    }

    public get email(): Locator {
        return this.page.getByRole('link', { name: 'info@rentzila.com.ua'});
    }
    
    public get logo(): Locator {
        return this.page.getByTestId('logo').last();
    }

    async fillConsultationForm(name: string, mobile: string): Promise<void> {
        await this.nameField.fill(name);
        await this.mobileField.fill(mobile);
    }

    async clickRequestConsultationBtn(): Promise<void> {
        await this.requestConsultationBtn.click();
    }
}
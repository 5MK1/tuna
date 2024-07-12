import {expect, Page, Response} from "@playwright/test";
import {TopNavigation} from "../components/TopNavigation";

export abstract class PageBase {
    public abstract url: string;
    public readonly page: Page;
    public readonly topNavigation: TopNavigation;

    protected constructor(page: Page) {
        this.page = page;
        this.topNavigation = new TopNavigation(page);
    }

    public abstract goto(): Promise<null | Response>;

    public async toPage<T extends PageBase>(ctor: { new(page: Page): T }): Promise<T> {
        const newPage = new ctor(this.page);
        await newPage.asserUrl();
        return newPage;
    }

    public asserUrl(): Promise<void> {
        return expect(this.page).toHaveURL(this.url);
    }
}


import {Page} from "@playwright/test";
import {PageBase} from "./PageBase";

export async function goToCustomPage<T extends PageBase>(ctor: { new(page: Page): T }, page: Page): Promise<T> {
    const createdPage = new ctor(page);
    await createdPage.goto();
    return createdPage;
}
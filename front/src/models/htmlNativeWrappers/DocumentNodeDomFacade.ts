import {ulid} from "ulid";

export type AllowedTags = 'p' | 'div';

export default class DocumentNodeDomFacade {
    private readonly _element: HTMLElement;
    private readonly _id: string;
    private readonly _parentId: string | undefined;

    public get element(): HTMLElement {
        return this._element;
    }

    constructor(element: HTMLElement, id: string, parentId: string | undefined) {
        this._element = element;
        this._id = id;
        this._parentId = parentId;
    }

    public setText(text: string): DocumentNodeDomFacade {
        this._element.innerText = text;
        return this;
    }

    public setCssClass(cssClass: string): DocumentNodeDomFacade {
        this._element.className = cssClass;
        return this;
    }

    public setCssStyles(cssStyles: string): DocumentNodeDomFacade {
        this._element.setAttribute('style', cssStyles);
        return this;
    }

    static createElement(tag: AllowedTags, parentId: string | undefined = undefined): DocumentNodeDomFacade {
        const id = ulid();
        const htmlElement = document.createElement(tag);
        return new DocumentNodeDomFacade(htmlElement, id, parentId);
    }
}
import {makeAutoObservable} from "mobx";
import {EditorSupportedCssDisplay} from "../htmlNativeWrappers/EditorSupportedCssDisplay";

export type StyleKey =
    'display';

export class DocumentNode {
    private readonly _node: HTMLElement;
    public readonly style: NodeStyles;
    name: string | undefined;
    children: DocumentNode[];
    parent: DocumentNode | undefined;
    selected: boolean;
    navigationCollapsed: boolean;

    get nativeNode(): HTMLElement {
        return this._node;
    }

    constructor(
        node: HTMLElement,
        name: string | undefined = undefined,
        children: DocumentNode[] = [],
        parent: DocumentNode | undefined = undefined,
        selected: boolean = false,
        navigationCollapsed: boolean = false
    ) {
        makeAutoObservable(this);
        this._node = node;
        this.style = new NodeStyles(node);
        this.name = name;
        this.children = children;
        this.parent = parent;
        this.selected = selected;
        this.navigationCollapsed = navigationCollapsed;
    }

    select() {
        this.selected = true;
    }

    unselect() {
        this.selected = false;
    }

    collapse() {
        this.navigationCollapsed = true;
        for (const child of this.children) {
            child.collapse();
        }
    }

    expand() {
        this.navigationCollapsed = false;
    }

    toggleCollapse() {
        if (this.navigationCollapsed) {
            this.expand()
        } else {
            this.collapse();
        }
    }
}


export class NodeStyles {
    private readonly _node: HTMLElement;

    get display(): EditorSupportedCssDisplay | undefined {
        const actualCssDisplayValue = getComputedStyle(this._node).getPropertyValue('display');
        return EditorSupportedCssDisplay[actualCssDisplayValue as keyof typeof EditorSupportedCssDisplay];
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._node.style.setProperty('display', value ?? null);
    }

    constructor(node: HTMLElement) {
        makeAutoObservable(this);
        this._node = node;
    }
}
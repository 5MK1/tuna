import {makeAutoObservable} from "mobx";
import {
    EditorSupportedCssDisplay,
    tryParseEditorSupportedCssDisplay
} from "../htmlNativeWrappers/EditorSupportedCssDisplay";
import {
    EditorSupportedFlexDirection,
    tryParseEditorSupportedFlexDirection
} from "../htmlNativeWrappers/EditorSupportedFlexDirection";


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
    private _cssDisplay: EditorSupportedCssDisplay | undefined;
    private _flexDirection: EditorSupportedFlexDirection | undefined;

    get display(): EditorSupportedCssDisplay | undefined {
        return this._cssDisplay;
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._cssDisplay = value;
        this._node.style.setProperty('display', value ?? null);
        if (value === EditorSupportedCssDisplay.flex && this._flexDirection === undefined) {
            this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
        }
    }

    get flexDirection(): EditorSupportedFlexDirection | undefined {
        return this._flexDirection;
    }

    set flexDirection(value: EditorSupportedFlexDirection | undefined) {
        this._flexDirection = value;
        this._node.style.setProperty('flex-direction', value ?? null);
    }

    constructor(node: HTMLElement) {
        makeAutoObservable(this);
        this._node = node;
        this._cssDisplay = this.extractStyle('display', tryParseEditorSupportedCssDisplay);
        this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
    }

    private extractStyle<T>(key: string, parseFn: (val: string) => T | undefined): T | undefined {
        return parseFn(getComputedStyle(this._node).getPropertyValue(key));
    }
}
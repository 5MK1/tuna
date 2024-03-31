export default class DocumentNode {
    private readonly _node: HTMLElement;
    private _name: string | undefined;
    private _children: DocumentNode[];
    private _parent: DocumentNode | undefined;

    get nativeNode(): HTMLElement {
        return this._node;
    }

    get name(): string | undefined {
        return this._name;
    }

    get children(): DocumentNode[] {
        return this._children;
    }

    get parent(): DocumentNode | undefined {
        return this._parent;
    }

    constructor(
        node: HTMLElement,
        name: string | undefined = undefined,
        children: DocumentNode[] = [],
        parent: DocumentNode | undefined = undefined
    ) {
        this._node = node;
        this._name = name;
        this._children = children;
        this._parent = parent;
    }
}

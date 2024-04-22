export default class DocumentNode {
    private readonly _node: HTMLElement;
    private _name: string | undefined;
    public children: DocumentNode[];
    public parent: DocumentNode | undefined;

    get nativeNode(): HTMLElement {
        return this._node;
    }

    get name(): string | undefined {
        return this._name;
    }

    constructor(
        node: HTMLElement,
        name: string | undefined = undefined,
        children: DocumentNode[] = [],
        parent: DocumentNode | undefined = undefined
    ) {
        this._node = node;
        this._name = name;
        this.children = children;
        this.parent = parent;
    }
}
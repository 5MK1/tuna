export default class DocumentNode {
    private readonly _node: HTMLElement;
    public name: string | undefined;
    public children: DocumentNode[];
    public parent: DocumentNode | undefined;

    get nativeNode(): HTMLElement {
        return this._node;
    }

    constructor(
        node: HTMLElement,
        name: string | undefined = undefined,
        children: DocumentNode[] = [],
        parent: DocumentNode | undefined = undefined
    ) {
        this._node = node;
        this.name = name;
        this.children = children;
        this.parent = parent;
    }
}

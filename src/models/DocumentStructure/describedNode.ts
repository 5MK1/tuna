export default class DescribedNode {
    private readonly _node: HTMLElement;
    private _name: string | undefined;
    private _children: DescribedNode[];
    private _parent: DescribedNode | undefined;

    get nativeNode(): HTMLElement {
        return this._node;
    }

    get name(): string | undefined {
        return this._name;
    }

    get children(): DescribedNode[] {
        return this._children;
    }

    get parent(): DescribedNode | undefined {
        return this._parent;
    }

    constructor(
        node: HTMLElement,
        name: string | undefined = undefined,
        children: DescribedNode[] = [],
        parent: DescribedNode | undefined = undefined
    ) {
        this._node = node;
        this._name = name;
        this._children = children;
        this._parent = parent;
    }
}

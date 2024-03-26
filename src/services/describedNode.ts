export class DescribedNode {
    public node: HTMLElement;
    public name: string | undefined;
    public children: DescribedNode[];

    constructor(node: HTMLElement, name: string | undefined = undefined, children: DescribedNode[] = []) {
        this.node = node;
        this.name = name;
        this.children = children;
    }
}
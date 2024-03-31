import DocumentNode from './documentNode';

export default class DocumentNodesStructure {
    private _nodesMap: Map<HTMLElement, DocumentNode>;
    rootNodes: DocumentNode[];

    constructor() {
        this._nodesMap = new Map<HTMLElement, DocumentNode>();
        this.rootNodes = [];
    }

    public add(
        node: DocumentNode,
        target: HTMLElement | undefined = undefined
    ): DocumentNodesStructure {
        if (!target) {
            this.rootNodes.push(node);
            this._nodesMap.set(node.nativeNode, node);
            return this;
        }
        const parent = this._nodesMap.get(target);
        if (!parent) {
            throw new Error('Target element was not found');
        }
        node.parent = parent;
        parent.children.push(node);
        this._nodesMap.set(node.nativeNode, node);
        return this;
    }

    public find(nativeNode: HTMLElement): DocumentNode | undefined {
        return this._nodesMap.get(nativeNode);
    }
}

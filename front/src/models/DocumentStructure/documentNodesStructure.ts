import {DocumentNode} from './documentNode';
import {makeAutoObservable} from "mobx";
import documentsService from "../../api/custom/DocumentsService";

export class DocumentNodesStructure {
    private _nodesMap: Map<HTMLElement, DocumentNode>;
    selectedNode: DocumentNode | undefined;
    rootNodes: DocumentNode[];

    constructor() {
        makeAutoObservable(this);
        this._nodesMap = new Map<HTMLElement, DocumentNode>();
        this.rootNodes = [];
        this.selectedNode = undefined;
    }

    public async fetchDocument(documentId: string) {
        if (documentId.length != 26) {
            return;
        }
        const document = await documentsService.getDocument(documentId);
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

    public select(storedNode: DocumentNode) {
        if (this.selectedNode !== undefined) {
            this.selectedNode.unselect();
        }
        storedNode.select();
        this.selectedNode = storedNode;
        return this;
    }

    public tryGet(nativeNode: HTMLElement): DocumentNode | undefined {
        return this._nodesMap.get(nativeNode);
    }
}

const documentNodesStructure = new DocumentNodesStructure();
export default documentNodesStructure;

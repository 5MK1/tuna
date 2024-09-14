import {makeAutoObservable} from "mobx";
import {TunaDocumentNode} from "./TunaDocumentNode";

export class TunaDocument {
    private _nodesMap: Map<string, TunaDocumentNode>;
    private _selectedNode: TunaDocumentNode | undefined;
    public readonly id: string;
    public readonly rootNodes: TunaDocumentNode[];
    
    public get selectedNode(): TunaDocumentNode | undefined {
        return this._selectedNode;
    }

    constructor(id: string) {
        makeAutoObservable(this);
        this._nodesMap = new Map<string, TunaDocumentNode>();
        this._selectedNode = undefined;
        this.id = id;
        this.rootNodes = [];
    }

    public select(documentNodeId: string) {
        this.selectNode(this.getDocumentNode(documentNodeId));
    }
    
    addNode(node: TunaDocumentNode, targetNodeId: string | undefined = undefined) {
        this._nodesMap.set(node.id, node);
        if (targetNodeId === undefined) {
            this.rootNodes.push(node);
        } else {
            this.getDocumentNode(targetNodeId).addChild(node);
        }
        this.selectNode(node);
    }
    
    private selectNode(nodeToSelect: TunaDocumentNode) {
        if (this._selectedNode !== undefined) {
            this._selectedNode.unselect();
        }
        nodeToSelect.select();
        this._selectedNode = nodeToSelect;
    }
    
    private getDocumentNode(id: string) {
        const node = this._nodesMap.get(id);
        if (node === undefined) {
            throw new Error(`Can not find node with id=${id} in document with id=${this.id}`);
        }
        return node;
    }
}




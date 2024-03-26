import {BehaviorSubject, map, Observable} from "rxjs";
import {DescribedNode} from "./describedNode";

class NodesStructure {
    private _nodesMap: Map<HTMLElement, DescribedNode>;
    rootNodes: DescribedNode[];

    constructor() {
        this._nodesMap = new Map<HTMLElement, DescribedNode>();
        this.rootNodes = [];
    }

    public add(node: DescribedNode, target: HTMLElement | undefined = undefined): NodesStructure {
        if (!target) {
            this.rootNodes.push(node);
            this._nodesMap.set(node.node, node);
            return this;
        }
        const foundTarget = this._nodesMap.get(target);
        if (!foundTarget) {
            throw new Error('Target element was not found');
        }
        foundTarget.children.push(node);
        this._nodesMap.set(node.node, node);
        return this;
    }

    public find(nativeNode: HTMLElement) : DescribedNode | undefined {
        return this._nodesMap.get(nativeNode);
    }
}

export class StructureService {
    private _nodes: BehaviorSubject<NodesStructure>;
    public nodes$: Observable<DescribedNode[]>;

    constructor() {
        this._nodes = new BehaviorSubject<NodesStructure>(new NodesStructure());
        this.nodes$ = this._nodes
            .asObservable()
            .pipe(map(x => [...x.rootNodes]));
    }

    push(node: DescribedNode) {
        const structure = this._nodes.getValue().add(node);
        this._nodes.next(structure); // bug?
    }

    appendTo(target: HTMLElement, node: DescribedNode) {
        const structure = this._nodes.getValue().add(node, target);
        this._nodes.next(structure);
    }
}

export default new StructureService();

import {BehaviorSubject, map, Observable} from "rxjs";
import DescribedNode from "../models/DocumentStructure/describedNode";
import DocumentNodesStructure from "../models/DocumentStructure/documentNodesStructure";

export class StructureService {
    private _nodes: BehaviorSubject<DocumentNodesStructure>;
    public nodes$: Observable<DescribedNode[]>;

    constructor() {
        this._nodes = new BehaviorSubject<DocumentNodesStructure>(new DocumentNodesStructure());
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

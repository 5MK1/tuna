import {BehaviorSubject, map, Observable} from "rxjs";
import DocumentNode from "../models/DocumentStructure/documentNode";
import DocumentNodesStructure from "../models/DocumentStructure/documentNodesStructure";

export class StructureService {
    private _nodes: BehaviorSubject<DocumentNodesStructure>;
    public nodes$: Observable<DocumentNode[]>;

    constructor() {
        this._nodes = new BehaviorSubject<DocumentNodesStructure>(new DocumentNodesStructure());
        this.nodes$ = this._nodes
            .asObservable()
            .pipe(map(x => [...x.rootNodes]));
    }

    push(node: DocumentNode) {
        const structure = this._nodes.getValue().add(node);
        this._nodes.next(structure); // bug?
    }

    appendTo(target: HTMLElement, node: DocumentNode) {
        const structure = this._nodes.getValue().add(node, target);
        this._nodes.next(structure);
    }
}

export default new StructureService();

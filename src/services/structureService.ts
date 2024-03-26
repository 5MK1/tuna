import {BehaviorSubject, Observable} from "rxjs";
import {DescribedNode} from "./describedNode";

export class StructureService {
    private _nodes: BehaviorSubject<DescribedNode[]>;
    public nodes$: Observable<DescribedNode[]>;

    constructor() {
        this._nodes = new BehaviorSubject<DescribedNode[]>([]);
        this.nodes$ = this._nodes.asObservable();
    }

    push(node: DescribedNode) {
        const x = this._nodes.getValue();
        x.push(node);
        this._nodes.next([...x]);
    }

    appendTo(target: HTMLElement, node: DescribedNode) {
        const storedNodes = this._nodes.getValue();
        const storedTarget = this.searchTarget(storedNodes, target);
        if (!storedTarget) {
            throw new Error('Target element was not found');
        }
        storedTarget.children.push(node);
        this._nodes.next([...storedNodes]);
    }

    private searchTarget(searchIn: DescribedNode[], searchFor: HTMLElement): DescribedNode | undefined {
        for (let node of searchIn) {
            if (node.node === searchFor) {
                return node;
            }
            const foundInChildren = this.searchTarget(node.children, searchFor);
            if (foundInChildren) {
                return foundInChildren;
            }
        }
        return undefined;
    }
}

export default new StructureService();

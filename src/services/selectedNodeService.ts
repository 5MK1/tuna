import {BehaviorSubject, Observable} from "rxjs";
import DescribedNode from "../models/DocumentStructure/describedNode";

export class SelectedNodeService {
    private _subj: BehaviorSubject<DescribedNode | undefined>;
    selectedNode$: Observable<DescribedNode | undefined>;

    constructor() {
        this._subj = new BehaviorSubject<DescribedNode | undefined>(undefined);
        this.selectedNode$ = this._subj.asObservable();
    }

    select(selectedNode: DescribedNode) {
        this._subj.next(selectedNode);
    }

    unselect() {
        this._subj.next(undefined);
    }
}

export default new SelectedNodeService();

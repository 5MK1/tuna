import {BehaviorSubject, Observable} from "rxjs";
import DocumentNode from "../models/DocumentStructure/documentNode";

export class SelectedNodeService {
    private _subj: BehaviorSubject<DocumentNode | undefined>;
    selectedNode$: Observable<DocumentNode | undefined>;

    constructor() {
        this._subj = new BehaviorSubject<DocumentNode | undefined>(undefined);
        this.selectedNode$ = this._subj.asObservable();
    }

    select(selectedNode: DocumentNode) {
        this._subj.next(selectedNode);
    }

    unselect() {
        this._subj.next(undefined);
    }
}

export default new SelectedNodeService();

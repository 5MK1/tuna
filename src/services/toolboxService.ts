import {BehaviorSubject, Observable} from "rxjs";

export enum Tool {
    flexbox,
}

export class ToolboxService {
    private _selectedToolSubj: BehaviorSubject<Tool | undefined>;
    public selectedTool$: Observable<Tool | undefined>;

    constructor() {
        this._selectedToolSubj = new BehaviorSubject<Tool | undefined>(undefined);
        this.selectedTool$ = this._selectedToolSubj.asObservable();
    }

    setTool(tool: Tool | undefined) {
        this._selectedToolSubj.next(tool);
    }
}

export default new ToolboxService();
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import Coordinates from "./coordinates";

export class MousePositionService {
    private _subj: BehaviorSubject<Coordinates | undefined>;
    public coordinates$: Observable<Coordinates | undefined>;

    constructor() {
        this._subj = new BehaviorSubject<Coordinates | undefined>(undefined);
        this.coordinates$ = this._subj.asObservable();
    }

    fromNode(node: HTMLElement) {
        fromEvent(node, 'mousemove', e => e as MouseEvent)
            .subscribe((event) => {
                this._subj.next(MousePositionService.Convert(event))
            });
    }

    private static Convert(mouseEvent: MouseEvent) : Coordinates {
        return new Coordinates(mouseEvent.clientX, mouseEvent.clientY);
    }
}

export default new MousePositionService();
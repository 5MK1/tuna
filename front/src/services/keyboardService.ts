import {BehaviorSubject, filter, fromEvent, Observable} from "rxjs";

export enum TunaKey {
    Esc,
}

export type TunaKeyboardEvent = {
    key: TunaKey,
}

export class KeyboardService {
    private _subject: BehaviorSubject<TunaKeyboardEvent | undefined>;
    events$: Observable<TunaKeyboardEvent | undefined>;

    constructor() {
        this._subject = new BehaviorSubject<TunaKeyboardEvent | undefined>(undefined);
        this.events$ = this._subject.asObservable();
    }

    attachTo(node: HTMLElement): KeyboardService {
        fromEvent(node, 'keydown', KeyboardService.Convert)
            .subscribe(keyboardEvent => {
                this._subject.next(keyboardEvent);
            });
        return this;
    }

    escape(): Observable<any> {
        return this.events$
            .pipe(filter(event => !!event && event.key === TunaKey.Esc))
    }

    private static Convert(event: Event): TunaKeyboardEvent | undefined {
        const nativeKeyboardEvent = event as KeyboardEvent;
        switch (nativeKeyboardEvent.key) {
            case 'Escape':
                return {key: TunaKey.Esc};
            default:
                return undefined;
        }
    }
}

export default new KeyboardService();
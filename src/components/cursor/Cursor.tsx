import './Cursor.scss';
import mousePositionService from "../../services/mousePositionService";
import {useEffect, useState} from "react";
import Coordinates from "../../services/coordinates";
import toolboxService, {Tool} from "../../services/toolboxService";
import {Subscription} from "rxjs";

export default function Cursor() {
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [cursorVisibility, setCursorVisibility] = useState<boolean>();

    useEffect(() => {
        let subscription: Subscription | undefined;
        toolboxService.selectedTool$.subscribe(tool => {
            if (tool === Tool.flexbox) {
                setCursorVisibility(true);
                subscription = mousePositionService.coordinates$
                    .subscribe(x => {
                        setCoordinates(x);
                    });
            } else {
                setCursorVisibility(false);
                subscription && subscription.unsubscribe();
            }
        });
    }, []);

    return cursorVisibility
        ? (
            <div className="cursor"
                 style={{left: (coordinates?.x ?? 0) + 10, top: (coordinates?.y ?? 0) + 12}}>
                <img src="flex-box--compact.svg" alt="cursor"/>
            </div>
        )
        : <></>;
}
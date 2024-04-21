import './Cursor.scss';
import mousePositionService from "../../services/mousePositionService";
import {useEffect, useState} from "react";
import Coordinates from "../../services/coordinates";
import toolboxService, {Tool} from "../../services/toolboxService";
import {Subscription} from "rxjs";

export default function Cursor() {
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [cursorImage, setCursorImage] = useState<string | undefined>();

    useEffect(() => {
        let mouseSubscription: Subscription | undefined;
        const toolboxSubscription = toolboxService.selectedTool$.subscribe(tool => {
            if (tool !== undefined) {
                setCursorImage(getToolBoxCursorImage(tool));
                mouseSubscription = mousePositionService.coordinates$
                    .subscribe(x => {
                        setCoordinates(x);
                    });
            } else {
                setCursorImage(undefined);
                mouseSubscription && mouseSubscription.unsubscribe();
            }
        });
        return () => {
            mouseSubscription && mouseSubscription.unsubscribe();
            toolboxSubscription.unsubscribe();
        }
    }, []);

    function getToolBoxCursorImage(tool: Tool): string {
        switch (tool) {
            case Tool.flexbox:
                return 'flex-box--compact.svg';
            case Tool.text:
                return 'txt--compact.svg';
            case Tool.image:
                return '';
        }
    }

    return cursorImage
        ? <div className="cursor"
                 style={{left: (coordinates?.x ?? 0) + 10, top: (coordinates?.y ?? 0) + 12}}>
                <img src={cursorImage} alt="cursor"/>
            </div>
        : <></>;
}
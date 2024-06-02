import React, {useEffect} from "react";
import toolboxContext from "../models/ToolboxContext/toolboxContext";
import Coordinates from "../models/htmlNativeWrappers/coordinates";
import Board from "../components/board/Board";
import Toolbox from "../components/toolbox/Toolbox";
import Properties from "../components/properties/Properties";
import Cursor from "../components/cursor/Cursor";
import "./tunaEditor.scss";


function TunaEditor() {
    useEffect(() => {
        document.body.addEventListener('keydown', ({key}: { key: string }) => {
            if (key.toLocaleLowerCase() === 'escape') {
                toolboxContext.setTool(undefined);
            }
        });
    }, []);

    return (
        <div className="app-editor"
            onMouseMove={(e) => {
                toolboxContext.setCursorPosition(Coordinates.from(e))
            }}>
            <main className="desktop">
                <Board/>
            </main>
            <Toolbox/>
            <Properties/>
            <Cursor/>
        </div>
    );
}

export default TunaEditor;

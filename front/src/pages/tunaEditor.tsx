import React, {useEffect} from "react";
import toolboxContext from "../models/ToolboxContext/toolboxContext";
import Coordinates from "../models/htmlNativeWrappers/coordinates";
import Board from "../components/board/Board";
import Toolbox from "../components/toolbox/Toolbox";
import Properties from "../components/properties/Properties";
import Cursor from "../components/cursor/Cursor";
import "./tunaEditor.scss";
import {useParams} from "react-router-dom";
import documentNodesStructure from "../models/DocumentStructure/documentNodesStructure";

function TunaEditor() {
    const {docId} = useParams();

    useEffect(() => {
        if (docId !== undefined) {
            documentNodesStructure.fetchDocument(docId).then();
        }
    }, []);

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
                {docId}
            </main>
            <Toolbox/>
            <Properties/>
            <Cursor/>
        </div>
    );
}

export default TunaEditor;

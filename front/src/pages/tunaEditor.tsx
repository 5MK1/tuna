import React, {useEffect} from "react";
import toolboxContext from "../models/ToolboxContext/toolboxContext";
import Coordinates from "../models/htmlNativeWrappers/coordinates";
import Board from "../components/board/Board";
import Toolbox from "../components/toolbox/Toolbox";
import Properties from "../components/properties/Properties";
import Cursor from "../components/cursor/Cursor";
import "./tunaEditor.scss";
import {useParams} from "react-router-dom";
import project from "../models/DocumentStructure/tunaProject";
import {observer} from "mobx-react-lite";

const TunaEditor = observer(() => {
    const {docId} = useParams();

    useEffect(() => {
        if (docId !== undefined) {
            project.fetch(docId).then();
        }
    }, [docId]);

    useEffect(() => {
        document.body.addEventListener('keydown', ({key}: { key: string }) => {
            if (key.toLocaleLowerCase() === 'escape') {
                toolboxContext.unsetTool();
            }
        });
    }, []);

    return (
        <div className="app-editor"
            onMouseMove={(e) => {
                toolboxContext.setCursorPosition(Coordinates.from(e))
            }}>
            <main className="desktop">
                {project.documents && project.documents.map(
                    doc => <Board document={doc} key={`document_board_${doc.id}`} /> 
                )}
            </main>
            <Toolbox/>
            <Properties/>
            <Cursor/>
        </div>
    );
});

export default TunaEditor;

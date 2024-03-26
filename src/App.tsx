import React, {useEffect, useRef} from 'react';
import './App.scss';

import Toolbox from './components/toolbox/Toolbox';
import Properties from "./components/properties/Properties";
import Board from "./components/board/Board";
import Cursor from "./components/cursor/Cursor";

import mousePositionService from "./services/mousePositionService";
import toolboxService from "./services/toolboxService";
import keyboardService from "./services/keyboardService";

function App() {
    const appRoot = useRef(null);

    useEffect(() => {
        mousePositionService.fromNode(appRoot.current!);
        keyboardService
            .attachTo(document.body)
            .escape()
            .subscribe(_ => toolboxService.setTool(undefined));
    }, [])


    return (
        <div className="app-root" ref={appRoot}>
            <main className="desktop">
                <Board/>
            </main>
            <Toolbox/>
            <Properties/>
            <Cursor/>
        </div>
    );
}

export default App;

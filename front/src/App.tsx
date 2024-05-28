import React, {useEffect} from 'react';
import './App.scss';
import Toolbox from './components/toolbox/Toolbox';
import Properties from "./components/properties/Properties";
import Board from "./components/board/Board";
import Cursor from "./components/cursor/Cursor";
import DevTools from "mobx-react-devtools";
import toolboxContext from "./models/ToolboxContext/toolboxContext";
import Coordinates from "./models/htmlNativeWrappers/coordinates";

function App() {

    useEffect(() => {
        document.body.addEventListener('keydown',({key}:{key: string}) => {
            if (key.toLocaleLowerCase() === 'escape') {
                toolboxContext.setTool(undefined);
            }
        });
    }, []);

    return (
        <div className="app-root"
             onMouseMove={(e) => {
                 toolboxContext.setCursorPosition(Coordinates.from(e))
             }}>
            <main className="desktop">
                <Board/>
            </main>
            <Toolbox/>
            <Properties/>
            <Cursor/>
            <DevTools/>
        </div>
    );
}

export default App;

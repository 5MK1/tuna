import {Outlet} from "react-router-dom";
import React from "react";

const EditorPagesLayout = function () {
    return (
        <div className="app-root app-root--editor-pages">
            <div className="top-navigation">
                <pre style={{margin: 0, padding: 0}}>// todo: add navigation</pre>
            </div>
            <Outlet/>
        </div>
    );
}

export default EditorPagesLayout;
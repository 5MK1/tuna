import {Outlet} from "react-router-dom";
import routesPaths from "../routes/routesPaths";
import React from "react";
import TopNavigationLink from "./TopNavigationLink";

const EditorPagesLayout = function () {
    return (
        <div className="app-root app-root--editor-pages">
            <div className="top-navigation">
                <TopNavigationLink to={routesPaths.editor}>x</TopNavigationLink>
            </div>
            <Outlet/>
        </div>
    );
}

export default EditorPagesLayout;
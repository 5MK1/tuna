import {Outlet} from "react-router-dom";
import routesPaths from "../routes/routesPaths";
import React from "react";
import "./top-navigation.scss";
import "./content-pages.scss";
import TopNavigationLink from "./TopNavigationLink";
import {observer} from "mobx-react-lite";
import {userSession} from "../../models/users/userSession";

const ContentPagesLayout = observer(({className}: {className?: string | undefined}) => {
    function getClassName(blockCssClass: string = 'app-root') {
        return className === undefined
            ? blockCssClass
            : `${blockCssClass} ${className}`;
    }

    return (
        <div className={getClassName()}>
            <div className="top-navigation">
                <nav className="top-navigation__items">
                    <TopNavigationLink to={routesPaths.home}>home</TopNavigationLink>
                    {userSession.authenticated
                        && <TopNavigationLink to={routesPaths.editor}>editor</TopNavigationLink>}
                    {!userSession.authenticated
                        && <TopNavigationLink to={routesPaths.login}>login</TopNavigationLink>}
                </nav>
            </div>
            <main className="app-main">
                <Outlet />
            </main>
        </div>
    );
});

export default ContentPagesLayout;
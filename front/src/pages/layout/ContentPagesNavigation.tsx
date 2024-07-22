import "./top-navigation.scss";
import {observer} from "mobx-react-lite";
import TopNavigationLink from "./TopNavigationLink";
import routesPaths from "../routes/routesPaths";
import {userSession} from "../../models/users/userSession";
import React from "react";
import {MouseEvent} from "react/index";

const ContentPagesNavigation = observer(() => {
    async function logout(e: MouseEvent<any>) {
        e.preventDefault();
        await userSession.unAuth();
    }

    return (
        <div className="top-navigation">
            <nav className="top-navigation__items">
                <TopNavigationLink to={routesPaths.home} tid="tn__home-link">home</TopNavigationLink>
                {userSession.authenticated
                    && <>
						<TopNavigationLink to={routesPaths.myDocuments} tid="tn__my-documents">my
							documents</TopNavigationLink>
						<TopNavigationLink to={routesPaths.editor.template} tid="tn__editor-link">editor</TopNavigationLink>
						<a href="#"
						   onClick={logout}
						   className="top-navigation__link"
						   data-tid="tn__logout-link">logout</a>
					</>}
                {!userSession.authenticated
                    && <TopNavigationLink to={routesPaths.login} tid="tn__login-link">login</TopNavigationLink>}
            </nav>
        </div>
    );
});

export default ContentPagesNavigation;
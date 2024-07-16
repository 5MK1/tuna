import {Outlet} from "react-router-dom";
import React from "react";
import "./content-pages.scss";
import {observer} from "mobx-react-lite";
import ContentPagesNavigation from "./ContentPagesNavigation";

const ContentPagesLayout = observer(({className}: {className?: string | undefined}) => {
    return (
        <div className={`app-root ${className}`}>
            <ContentPagesNavigation />
            <main className="app-main">
                <div className="page">
                    <Outlet />
                </div>
            </main>
        </div>
    );
});

export default ContentPagesLayout;
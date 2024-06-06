import {observer} from "mobx-react-lite";
import React from "react";
import {userSession} from "../../models/users/userSession";
import routesPaths from "./routesPaths";
import {useLocation, Navigate} from "react-router-dom";

const RequireAuth = observer(({children}: {children: React.ReactNode}) => {
    const location = useLocation();
    return userSession.authenticated
        ? <>{children}</>
        : <Navigate to={routesPaths.login} state={{from: location}} />;
});

export default RequireAuth;
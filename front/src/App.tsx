import React from 'react';
import './App.scss';
import AppRoutes from "./pages/routes/appRoutes";
import {NavLink} from "react-router-dom";
import routesPaths from "./pages/routes/routesPaths";

function App() {
    return (<>
        <div style={{position:'relative'}}>
            <NavLink to={routesPaths.home}>home</NavLink>
            <NavLink to={routesPaths.login}>login</NavLink>
        </div>
        <AppRoutes />
    </>);
}

export default App;

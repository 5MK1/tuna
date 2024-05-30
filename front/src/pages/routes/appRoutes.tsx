import { Routes, Route } from "react-router-dom";
import routesPaths from "./routesPaths";
import HomePage from "../homePage";
import LoginPage from "../loginPage";
import TunaEditor from "../tunaEditor";

function AppRoutes() {
    return (
        <Routes>
            <Route path={routesPaths.home} element={<HomePage />} />
            <Route path={routesPaths.login} element={<LoginPage />} />
            <Route path={routesPaths.editor} element={<TunaEditor />} />
        </Routes>
    );
}

export default AppRoutes;

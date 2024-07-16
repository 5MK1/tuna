import {Routes, Route} from "react-router-dom";
import routesPaths from "./routesPaths";
import HomePage from "../homePage";
import LoginPage from "../loginPage";
import TunaEditor from "../tunaEditor";
import ContentPagesLayout from "../layout/ContentPagesLayout";
import EditorPagesLayout from "../layout/EditorPagesLayout";
import RequireAuth from "./RequireAuth";
import MyDocumentsPage from "../myDocumentsPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path={routesPaths.home}
                   element={
                       <ContentPagesLayout
                           className="app-root--content-pages app-root--full-size"/>
                   }>
                <Route index={true} element={<HomePage/>}/>
            </Route>
            <Route element={
                <ContentPagesLayout
                    className="app-root--content-pages app-root--simple-form"/>
            }>
                <Route path={routesPaths.login} element={<LoginPage/>}/>
            </Route>
            <Route element={
                <ContentPagesLayout
                    className="app-root--content-pages app-root--full-size"/>
            }>
                <Route path={routesPaths.myDocuments}
                       element={
                           <RequireAuth>
                               <MyDocumentsPage/>
                           </RequireAuth>}/>
            </Route>


            <Route path={routesPaths.editor}
                   element={
                       <RequireAuth>
                           <EditorPagesLayout/>
                       </RequireAuth>
                   }>
                <Route path={routesPaths.editor}
                       element={<TunaEditor/>}/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;

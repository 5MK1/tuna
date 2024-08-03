import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import myDocuments from "../models/myDocuments/myDocuments";
import {Link} from "react-router-dom";
import routesPaths from "./routes/routesPaths";

const MyDocumentsPage = observer(() => {
    useEffect(() => {
        myDocuments.fetchDocuments().then();
    }, []);

    return (<>
        <ul className="tuna-list">
            {myDocuments.documents.map(doc =>
                <li>
                    <Link to={routesPaths.editor.createPath(doc.id!)}>{doc.title ?? doc.id}</Link>
                </li>
            )}
        </ul>
    </>);
});

export default MyDocumentsPage;
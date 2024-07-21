import {observer} from "mobx-react-lite";
import {useCallback, useEffect} from "react";
import myDocuments from "../models/myDocuments/myDocuments";

const MyDocumentsPage = observer(() => {
    useEffect(() => {
        myDocuments.fetchDocuments().then();
    }, []);

    return (<>
        {myDocuments.documents.map(doc =>
            <p>{doc.id}</p>
        )}
    </>);
});

export default MyDocumentsPage;
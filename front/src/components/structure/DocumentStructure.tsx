import {observer} from "mobx-react-lite";

import StructureElement from "./StructureElement";
import project from "../../models/DocumentStructure/tunaProject";

const DocumentStructure = observer(() => {
    const rootNodes = project.selectedDocument?.rootNodes;
    return (
        <>
            {rootNodes &&
                rootNodes.map((node, index) =>
                    <StructureElement node={node} key={`struct_nav_${node.id}`} />)}
        </>
    );
});

export default DocumentStructure;

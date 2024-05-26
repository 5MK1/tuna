import {observer} from "mobx-react-lite";

import StructureElement from "./StructureElement";
import documentNodesStructure from "../../models/DocumentStructure/documentNodesStructure";

const DocumentStructure = observer(() => {
    return (
        <>
            {documentNodesStructure.rootNodes.map((node, index) =>
                <StructureElement key={`${node.name}_${index}`}
                                  node={node}
                                  parentIndex={index.toString()} />)}
        </>
    );
});

export default DocumentStructure;

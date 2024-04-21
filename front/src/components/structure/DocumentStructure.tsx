import {useEffect, useState} from "react";
import nodesService from "../../services/structureService";
import StructureElement from "./StructureElement";
import DocumentNode from "../../models/DocumentStructure/documentNode";

export default function DocumentStructure() {
    const [nodes, setNodes] = useState<DocumentNode[]>([]);

    useEffect(() => {
        nodesService.nodes$.subscribe(nodes => {
            setNodes(nodes ?? []);
        });
    }, []);

    return (
        <>
            {nodes.map((node, index) =>
                <StructureElement key={`${node.name}_${index}`}
                                  node={node}
                                  parentIndex={index.toString()} />)}
        </>
    );
}

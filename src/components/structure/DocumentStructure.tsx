import {useEffect, useState} from "react";
import nodesService from "../../services/structureService";
import StructureElement from "./StructureElement";
import DescribedNode from "../../models/DocumentStructure/describedNode";

export default function DocumentStructure() {
    const [nodes, setNodes] = useState<DescribedNode[]>([]);

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

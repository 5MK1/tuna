import "./StructureElement.scss"
import {DescribedNode} from "../../services/describedNode";

export type LayerProps = {
    node: DescribedNode,
    parentIndex: string,
}

export default function StructureElement(props: LayerProps) {
    const node = props.node;
    return (
        <div className="struct-element">
            <div className="struct-element__header">
                {node.name && <div className="struct-element__name">{node.name}</div>}
                {!node.name && <div className="struct-element__name--tag-name">
                    <span className="tag">
                        <span className="tag__brace">&lt;</span>
                        <span className="tag__name">{node.node.nodeName}</span>
                        <span className="tag__brace">&gt;</span>
                    </span>
                </div>}
            </div>
            {!!node.children.length && <div className="struct-element__children">
                {node.children.map((childNode, index) =>
                    <StructureElement key={`${node.name}_${props.parentIndex}_${index}`}
                                      node={childNode}
                                      parentIndex={`${props.parentIndex}-${index}`} />)}
            </div>}
        </div>
    );
}

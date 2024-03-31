import "./StructureElement.scss"
import DescribedNode from "../../models/DocumentStructure/describedNode";
import selectedNodeService from "../../services/selectedNodeService";
import StructIcon, {StructIconType} from "../ui/StructIcon";
import {useEffect, useState} from "react";

export type LayerProps = {
    node: DescribedNode,
    parentIndex: string,
}

export default function StructureElement(props: LayerProps) {
    const node = props.node;
    const [buttonIco, setButtonIco] = useState<StructIconType>('triangleRight');

    useEffect(() => {
        setButtonIco(node.children.length !== 0 ? 'triangleDown' : 'triangleRight')
    }, []);

    function headerClick() {
        selectedNodeService.select(node);
    }

    return (
        <div className="struct-element">
            <div className="struct-element__header" onClick={headerClick}>
                <button className="struct-element__level-button">
                    <StructIcon type={buttonIco} filled={false} />
                </button>
                {node.name && <div className="struct-element__name">{node.name}</div>}
                {!node.name && <div className="struct-element__name--tag-name">
                    <span className="tag">
                        <span className="tag__brace">&lt;</span>
                        <span className="tag__name">{node.nativeNode.tagName}</span>
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

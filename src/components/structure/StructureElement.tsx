import "./StructureElement.scss"
import DocumentNode from "../../models/DocumentStructure/documentNode";
import selectedNodeService from "../../services/selectedNodeService";
import StructIcon, {StructIconType} from "../ui/StructIcon";
import {useEffect, useState} from "react";

export type LayerProps = {
    node: DocumentNode,
    parentIndex: string,
}

type CollapsedState = {
    collapsed: boolean,
    icon: StructIconType,
    childrenCssClass: string
}

export default function StructureElement(props: LayerProps) {
    const node = props.node;
    const empty = node.children.length === 0;
    const filledIcon = selectedNodeService.getValue() === node;
    const [collapsedState, setCollapsedState] = useState<CollapsedState>({
        collapsed: false,
        icon: empty ? 'circle' : 'triangleDown',
        childrenCssClass: ''
    });

    useEffect(() => {
        setCollapsedState({
            collapsed: collapsedState.collapsed,
            icon: empty ? 'circle' : collapsedState.collapsed ? 'triangleRight' : 'triangleDown',
            childrenCssClass: collapsedState.collapsed ? ' struct-element__children--collapsed' : ''
        });
    }, [props]);

    function headerClick() {
        selectedNodeService.select(node);
    }

    function levelButtonClicked() {
        if (empty) {
            return
        }
        const invertedState = !collapsedState.collapsed;
        setCollapsedState({
            collapsed: invertedState,
            icon: invertedState ? 'triangleRight' : 'triangleDown',
            childrenCssClass: invertedState ? ' struct-element__children--collapsed' : ''
        });
    }

    return (
        <div className="struct-element">
            <div className="struct-element__header" onClick={headerClick}>
                <button className="struct-element__level-button" onClick={levelButtonClicked}>
                    <StructIcon type={collapsedState.icon} filled={filledIcon} />
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
            {!!node.children.length && <div className={'struct-element__children' + collapsedState.childrenCssClass}>
                {node.children.map((childNode, index) =>
                    <StructureElement key={`${node.name}_${props.parentIndex}_${index}`}
                                      node={childNode}
                                      parentIndex={`${props.parentIndex}-${index}`} />)}
            </div>}
        </div>
    );
}

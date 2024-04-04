import "./StructureElement.scss"
import DocumentNode from "../../models/DocumentStructure/documentNode";
import selectedNodeService from "../../services/selectedNodeService";
import StructIcon, {StructIconType} from "../ui/StructIcon";
import {useEffect, useState} from "react";

export type LayerProps = {
    node: DocumentNode,
    parentIndex: string,
}

class CollapsedState {
    collapsed: boolean;
    icon: StructIconType;

    get childrenCssClass(): string {
        return this.collapsed ? ' struct-element__children--collapsed' : '';
    }

    private constructor(collapsed: boolean, icon: StructIconType) {
        this.collapsed = collapsed;
        this.icon = icon;
    }

    createInverted(): CollapsedState {
        return CollapsedState.collapsed(!this.collapsed);
    }

    static collapsed(collapsed: boolean): CollapsedState {
        return new CollapsedState(collapsed, collapsed ? 'triangleRight' : 'triangleDown');
    }

    static empty(): CollapsedState {
        return new CollapsedState(false, 'circle');
    }
}

export default function StructureElement(props: LayerProps) {
    const node = props.node;
    const empty = node.children.length === 0;
    const filledIcon = selectedNodeService.getValue() === node;
    const [collapsedState, setCollapsedState] = useState<CollapsedState>(
        empty ? CollapsedState.empty() : CollapsedState.collapsed(false)
    );

    useEffect(() => {
        const value = empty ? CollapsedState.empty() : CollapsedState.collapsed(collapsedState.collapsed);
        setCollapsedState(value);
    }, [props.node.children]);

    function headerClick() {
        selectedNodeService.select(node);
    }

    function levelButtonClicked() {
        if (!empty) {
            setCollapsedState(collapsedState.createInverted());
        }
    }

    return (
        <div className="struct-element">
            <div className="struct-element__header" onClick={headerClick}>
                <button className="struct-element__level-button" onClick={levelButtonClicked}>
                    <StructIcon type={collapsedState.icon} filled={filledIcon}/>
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
                                      parentIndex={`${props.parentIndex}-${index}`}/>)}
			</div>}
        </div>
    );
}

import "./StructureElement.scss"
import {DocumentNode} from "../../models/DocumentStructure/documentNode";
import {StructIcon, StructIconType} from "../ui/StructIcon";
import {observer} from "mobx-react-lite";
import documentNodesStructure from "../../models/DocumentStructure/documentNodesStructure";

export type LayerProps = {
    node: DocumentNode,
    parentIndex: string,
}

const StructureElement = observer(({node, parentIndex}: LayerProps) => {
    function headerClick() {
        documentNodesStructure.select(node);
    }

    function levelButtonClicked() {
        if (node.children.length > 0) {
            node.toggleCollapse();
        }
    }

    function structIconType(): StructIconType {
        return node.children.length === 0
            ? 'circle'
            : node.navigationCollapsed
                ? 'triangleRight'
                : 'triangleDown'
    }

    function childrenCssClass(cssClass: string = 'struct-element__children') {
        return  node.navigationCollapsed
            ? `${cssClass} struct-element__children--collapsed`
            : cssClass;
    }

    return (
        <div className="struct-element">
            <div className="struct-element__header" onClick={headerClick}>
                <button className="struct-element__level-button" onClick={levelButtonClicked}>
                    <StructIcon type={structIconType()} filled={node.selected}/>
                </button>
                {node.name && <div className="struct-element__name">{node.name}</div>}
                {!node.name &&
					<div className="struct-element__name--tag-name">
                        <span className="tag">
                            <span className="tag__brace">&lt;</span>
                            <span className="tag__name">{node.nativeNode.tagName}</span>
                            <span className="tag__brace">&gt;</span>
                        </span>
					</div>}
            </div>
            {!!node.children.length && <div className={childrenCssClass()}>
                {node.children.map((childNode, index) =>
                    <StructureElement key={`${node.name}_${parentIndex}_${index}`}
                                      node={childNode}
                                      parentIndex={`${parentIndex}-${index}`}/>)}
			</div>}
        </div>
    );
});

export default StructureElement;

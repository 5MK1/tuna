import "./StructureElement.scss"
import {StructIcon, StructIconType} from "../ui/StructIcon";
import {observer} from "mobx-react-lite";
import {TunaDocumentNode} from "../../models/DocumentStructure/TunaDocumentNode";
import project from "../../models/DocumentStructure/tunaProject";

export type LayerProps = {
    node: TunaDocumentNode,
}

const StructureElement = observer(({node}: LayerProps) => {
    const selectedDocument = project?.selectedDocument;

    function headerClick() {
        selectedDocument && selectedDocument.select(node.id);
    }

    function levelButtonClicked() {
        if (node.children.length > 0) {
            node.toggleCollapse();
        }
    }

    function structIconType(): StructIconType {
        return node.children.length === 0
            ? 'circle'
            : node.navCollapsed
                ? 'triangleRight'
                : 'triangleDown'
    }

    function childrenCssClass(cssClass: string = 'struct-element__children') {
        return node.navCollapsed
            ? `${cssClass} struct-element__children--collapsed`
            : cssClass;
    }

    return (
        <div className="struct-element">
            <div className="struct-element__header" onClick={headerClick}>
                <button className="struct-element__level-button" onClick={levelButtonClicked}>
                    <StructIcon type={structIconType()} filled={node.selected}/>
                </button>
                <div className="struct-element__name--tag-name">
                        <span className="tag">
                            <span className="tag__brace">&lt;</span>
                            <span className="tag__name">{node.tag}</span>
                            <span className="tag__brace">&gt;</span>
                        </span>
                </div>
            </div>
            {!!node.children.length && <div className={childrenCssClass()}>
                {node.children.map((childNode, index) =>
                    <StructureElement key={`struct_nav_${node.id}`} node={childNode}/>)}
			</div>}
        </div>
    );
});

export default StructureElement;

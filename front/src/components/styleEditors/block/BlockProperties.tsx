import {observer} from "mobx-react-lite";
import DisplayEditor from "./DisplayEditor";
import documentNodesStructure from "../../../models/DocumentStructure/documentNodesStructure";
import "./BlockPorperties.scss"
import {EditorSupportedCssDisplay} from "../../../models/htmlNativeWrappers/EditorSupportedCssDisplay";

const BlockProperties = observer(() => {
    const selectedNode = documentNodesStructure.selectedNode;

    if (selectedNode === undefined) {
        return <></>;
    }

    return (
        <div className="properties-group">
            <div className="sidebar-form-item">
                <label className="sidebar-form-item__label">display:</label>
                <div className="sidebar-item__editor">
                    <DisplayEditor node={selectedNode}/>
                </div>
            </div>
            {selectedNode.style.display === EditorSupportedCssDisplay.flex
                &&
				<div className="sidebar-form-item">
					<label className="sidebar-form-item__label">flex direction:</label>
					<div className="sidebar-item__editor">FLEX DIRECTION</div>
				</div>
            }
        </div>
    );
});

export default BlockProperties;

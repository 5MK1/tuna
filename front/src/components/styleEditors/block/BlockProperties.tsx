import {observer} from "mobx-react-lite";
import DisplayEditor from "./DisplayEditor";
import documentNodesStructure from "../../../models/DocumentStructure/documentNodesStructure";
import "./BlockPorperties.scss"
import {EditorSupportedCssDisplay} from "../../../models/htmlNativeWrappers/EditorSupportedCssDisplay";
import FlexDirectionEditor from "./FlexDirectionEditor";

const BlockProperties = observer(() => {
    const selectedNode = documentNodesStructure.selectedNode;

    if (selectedNode === undefined) {
        return <></>;
    }

    return (
        <div className="properties-group">
            <DisplayEditor style={selectedNode.style}/>
            {selectedNode.style.display === EditorSupportedCssDisplay.flex
                && (
                    <FlexDirectionEditor style={selectedNode.style}/>
                )
            }
        </div>
    );
});

export default BlockProperties;
import {observer} from "mobx-react-lite";
import DisplayEditor from "./DisplayEditor";
import documentNodesStructure from "../../../models/DocumentStructure/documentNodesStructure";
import "./BlockPorperties.scss"
import FlexDirectionEditor from "./FlexDirectionEditor";
import JustifyContentEditor from "./JustifyContentEditor";
import AlignItemsEditor from "./AlignItemsEditor";

const BlockProperties = observer(() => {
    const selectedNode = documentNodesStructure.selectedNode;

    if (selectedNode === undefined) {
        return <></>;
    }

    return (
        <div className="properties-group">
            <DisplayEditor style={selectedNode.style}/>
            {selectedNode.style.display === 'flex'
                && <>
					<FlexDirectionEditor style={selectedNode.style}/>
					<JustifyContentEditor style={selectedNode.style}/>
					<AlignItemsEditor style={selectedNode.style}/>
				</>
            }
        </div>
    );
});

export default BlockProperties;

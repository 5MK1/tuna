import {observer} from "mobx-react-lite";
import DisplayEditor from "./DisplayEditor";
import "./BlockPorperties.scss"
import FlexDirectionEditor from "./FlexDirectionEditor";
import JustifyContentEditor from "./JustifyContentEditor";
import AlignItemsEditor from "./AlignItemsEditor";
import project from "../../../models/DocumentStructure/tunaProject";

const BlockProperties = observer(() => {
    const selectedNodeStyles = project.selectedDocument
        ?.selectedNode
        ?.styles;

    if (selectedNodeStyles === undefined) {
        return <></>;
    }

    return (
        <div className="properties-group">
            <DisplayEditor styles={selectedNodeStyles}/>
            {selectedNodeStyles.declaration.display === 'flex'
                && <>
					<FlexDirectionEditor styles={selectedNodeStyles}/>
					<JustifyContentEditor styles={selectedNodeStyles}/>
					<AlignItemsEditor styles={selectedNodeStyles}/>
				</>
            }
        </div>
    );
});

export default BlockProperties;

import "./Properties.scss";
import DocumentStructure from "../structure/DocumentStructure";
import Border from "../styleEditors/common/Border";
import MarginEditor from "../styleEditors/common/MarginEditor";
import {observer} from "mobx-react-lite";
import documentNodesStructure from "../../models/DocumentStructure/documentNodesStructure";
import BlockProperties from "../styleEditors/block/BlockProperties";

const Properties = observer(() => {
    const selectedNode = documentNodesStructure.selectedNode;
    return (
        <aside className="properties">
            <div className="settings">
                <div className="property-settings">
                    {selectedNode && <>
                        <p className="property-settings__title">Properties</p>
                        <div className="property-settings__body">
                            <BlockProperties />
                        </div>
                    </>}

                    <p className="property-settings__title">Common</p>
                    <div className="property-settings__body">
                        {selectedNode && <>
                            <div style={{marginBottom: '1em'}}>
                                <Border selectedNode={selectedNode}/>
                            </div>
                            <div style={{marginBottom: '1em'}}>
                                <MarginEditor node={selectedNode}/>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <div className="settings-layers-divider"/>
            <div className="layers">
                <div className="property-settings">
                    <p className="property-settings__title">Structure</p>
                    <div className="property-settings__body">
                        <DocumentStructure/>
                    </div>
                </div>
            </div>
        </aside>
    );
});

export default Properties;

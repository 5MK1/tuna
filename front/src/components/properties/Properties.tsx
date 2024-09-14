import "./Properties.scss";
import DocumentStructure from "../structure/DocumentStructure";
import Border from "../styleEditors/common/Border";
import MarginEditor from "../styleEditors/common/MarginEditor";
import {observer} from "mobx-react-lite";
import BlockProperties from "../styleEditors/block/BlockProperties";
import project from "../../models/DocumentStructure/tunaProject";

const Properties = observer(() => {
    const selectedNode = project.selectedDocument?.selectedNode;
    return (
        <aside className="properties">
            <div className="settings">
                <div className="property-settings">
                    {selectedNode && <>
                        <p className="property-settings__title">Display</p>
                        <div className="property-settings__body">
                            <BlockProperties />
                        </div>
                        <div className="property-settings__body">
                            <div className="properties-group">
                                <Border />
                                <MarginEditor />
                            </div>
                        </div>
                    </>}
                </div>
            </div>
            <div className="settings-layers-divider"/>
            <div className="layers">
                <div className="property-settings">
                    <p className="property-settings__title">Structure</p>
                    <div className="property-settings__body">
                        <DocumentStructure />
                    </div>
                </div>
            </div>
        </aside>
    );
});

export default Properties;

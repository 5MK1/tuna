import './Properties.scss';
import DocumentStructure from "../structure/DocumentStructure";
import Border from "../styleEditors/common/Border";
import {useEffect, useState} from "react";
import selectedNodeService from "../../services/selectedNodeService";
import DocumentNode from "../../models/DocumentStructure/documentNode";

const styleEditors = [Border];

export default function Properties() {
    const [selectedNode, setSelectedNode] = useState<DocumentNode | undefined>();

    useEffect(() => {
        const subscription = selectedNodeService.selectedNode$
            .subscribe(selectedNode => {
                setSelectedNode(selectedNode);
            });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <aside className="properties">
            <div className="settings">
                <div className="property-settings">
                    <p className="property-settings__title">Common</p>
                    <div className="property-settings__body">
                        {selectedNode && <Border selectedNode={selectedNode}/>}
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
}

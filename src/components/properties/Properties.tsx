import './Properties.scss';
import Structure from "../structure/Structure";
import Border from "../styleEditors/common/Border";
import {useEffect, useState} from "react";
import selectedNodeService from "../../services/selectedNodeService";
import DescribedNode from "../../models/DocumentStructure/describedNode";

const styleEditors = [Border];

export default function Properties() {
    const [selectedNode, setSelectedNode] = useState<DescribedNode | undefined>();

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
                        <Structure/>
                    </div>
                </div>
            </div>
        </aside>
    );
}

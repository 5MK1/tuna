import './Toolbox.scss'
import toolboxContext from "../../models/ToolboxContext/toolboxContext";
import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";

export default function Toolbox() {
    return (
        <aside className="toolbox">
            <button className="toolbox__button"
                    onClick={(e) => {toolboxContext.setTool(ToolboxTool.flexbox)}}>
                <img src="/flex-box.svg" alt="flex box block" />
            </button>
            <button className="toolbox__button"
                    onClick={(e) => {toolboxContext.setTool(ToolboxTool.text)}}>
                <img src="/txt.svg" alt="text block" />
            </button>
        </aside>
    );
}

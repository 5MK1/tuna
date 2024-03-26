import './Toolbox.scss'
import toolboxService, {Tool} from "../../services/toolboxService";

export default function Toolbox() {
    return (
        <aside className="toolbox">
            <button className="toolbox__button"
                    onClick={(e) => {toolboxService.setTool(Tool.flexbox)}}>
                <img src="flex-box.svg" alt="flex box block" />
            </button>
        </aside>
    );
}
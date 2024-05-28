import './Cursor.scss';
import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";
import toolboxContext from "../../models/ToolboxContext/toolboxContext";
import {observer} from "mobx-react-lite";

const Cursor = observer(() => {

    function toolBoxCursorImage(tool: ToolboxTool): string {
        switch (tool) {
            case ToolboxTool.flexbox:
                return 'flex-box--compact.svg';
            case ToolboxTool.text:
                return 'txt--compact.svg';
            case ToolboxTool.image:
                return '';
            default:
                return '';
        }
    }

    return toolboxContext.tool !== undefined
        ? <div className="cursor"
               style={
                   {
                       left: (toolboxContext.cursorPosition?.x ?? 0) + 10,
                       top: (toolboxContext.cursorPosition?.y ?? 0) + 12
                   }
               }>
            <img src={toolBoxCursorImage(toolboxContext.tool!)} alt="cursor"/>
        </div>
        : <></>;
});

export default Cursor;

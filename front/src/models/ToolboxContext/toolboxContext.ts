import {makeAutoObservable} from "mobx";
import {ToolboxTool} from "./toolboxTool";
import Coordinates from "../htmlNativeWrappers/coordinates";

export class ToolboxContext {
    tool: ToolboxTool | undefined;
    cursorPosition: Coordinates;

    constructor() {
        makeAutoObservable(this);
        this.cursorPosition = Coordinates.origin();
    }

    setTool(tool: ToolboxTool) {
        this.tool = tool;
    }

    unsetTool() {
        this.tool = undefined;
    }

    setCursorPosition(position: Coordinates) {
        this.cursorPosition = position;
    }
}

const toolboxContext = new ToolboxContext();
export default toolboxContext;

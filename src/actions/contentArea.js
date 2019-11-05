import { createAction } from "redux-actions";
import { ActionTypes } from "../types";

export const canvasBottomBar = createAction(ActionTypes.CANVAS_BOTTOM_BAR);

export const canvasWarningAndErrorBar = createAction(ActionTypes.CANVAS_WARNING_AND_ERROR_BAR);
export const canvasStatusBar = createAction(ActionTypes.CANVAS_STATUS_BAR);
export const canvasStatisticsBar = createAction(ActionTypes.CANVAS_STATISTICS_BAR);
export const canvasControlFlowBar = createAction(ActionTypes.CANVAS_CONTROL_FLOW_BAR);


export const contentAreaWorkspaceSelectTab = createAction(ActionTypes.WORKSPACE_SELECT_TAB)
export const contentAreaWorkspaceCloseTab = createAction(ActionTypes.WORKSPACE_CLOSE_TAB)
export const contentAreaWorkspaceCreateNewTab = createAction(ActionTypes.WORKSPACE_ADD_TAB)

export const contentAreaWorkspaceCanvasAddNode = createAction(ActionTypes.WORKSPACE_CANVAS_ADD_NODE);
export const contentAreaWorkspaceCanvasUpdateNode = createAction(ActionTypes.WORKSPACE_UPDATE_NODE);
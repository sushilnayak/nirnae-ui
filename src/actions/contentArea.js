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
export const contentAreaWorkspaceCanvasUpdateNode = createAction(ActionTypes.WORKSPACE_CANVAS_UPDATE_NODE);
export const contentAreaWorkspaceCanvasDeleteNode = createAction(ActionTypes.WORKSPACE_CANVAS_DELETE_NODE);
export const contentAreaWorkspaceCanvasSelectNode = createAction(ActionTypes.WORKSPACE_CANVAS_SELECT_NODE);
export const contentAreaWorkspaceCanvasSelectLink = createAction(ActionTypes.WORKSPACE_CANVAS_SELECT_LINK);

export const contentAreaWorkspaceCanvasPropertiesShow   = createAction(ActionTypes.WORKSPACE_CANVAS_SHOW_PROPERTIES  )
export const contentAreaWorkspaceCanvasPropertiesCancel = createAction(ActionTypes.WORKSPACE_CANVAS_CANCEL_PROPERTIES)
export const contentAreaWorkspaceCanvasPropertiesOk     = createAction(ActionTypes.WORKSPACE_CANVAS_OK_PROPERTIES    )
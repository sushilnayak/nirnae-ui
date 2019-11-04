import { createAction } from "redux-actions";
import { ActionTypes } from "../types";

export const canvasBottomBar = createAction(ActionTypes.CANVAS_BOTTOM_BAR);

export const canvasWarningAndErrorBar = createAction(ActionTypes.CANVAS_WARNING_AND_ERROR_BAR);
export const canvasStatusBar = createAction(ActionTypes.CANVAS_STATUS_BAR);
export const canvasStatisticsBar = createAction(ActionTypes.CANVAS_STATISTICS_BAR);
export const canvasControlFlowBar = createAction(ActionTypes.CANVAS_CONTROL_FLOW_BAR);

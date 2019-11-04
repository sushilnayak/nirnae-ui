import { handleActions } from "redux-actions";
import { ActionTypes } from "../types";

const intialState = {
  canvasBottomBar: false,
  canvasWarningAndErrorBar: false,
  canvasStatusBar: false,
  canvasStatisticsBar: false,
  canvasControlFlowBar: false
};

export default {
  canvasSidebar: handleActions({
      [ActionTypes.CANVAS_STATISTICS_BAR]: (state, action) => {
        let status = !state.canvasStatisticsBar;
        return Object.assign({}, state, {
          canvasBottomBar: status,
          canvasWarningAndErrorBar: false,
          canvasStatusBar: false,
          canvasStatisticsBar: status,
          canvasControlFlowBar: false
        });
      },
      [ActionTypes.CANVAS_CONTROL_FLOW_BAR]: (state, action) => {
        let status = !state.canvasControlFlowBar;
        return Object.assign({}, state, {
          canvasBottomBar: status,
          canvasWarningAndErrorBar: false,
          canvasStatusBar: false,
          canvasStatisticsBar: false,
          canvasControlFlowBar: status
        });
      },
      [ActionTypes.CANVAS_WARNING_AND_ERROR_BAR]: (state, action) => {
        let status = !state.canvasWarningAndErrorBar;
        return Object.assign({}, state, {
          canvasBottomBar: status,
          canvasWarningAndErrorBar: status,
          canvasStatusBar: false,
          canvasStatisticsBar: false,
          canvasControlFlowBar: false
        });
      },
      [ActionTypes.CANVAS_STATUS_BAR]: (state, action) => {
        let status = !state.canvasStatusBar;
        return Object.assign({}, state, {
          canvasBottomBar: status,
          canvasWarningAndErrorBar: false,
          canvasStatusBar: status,
          canvasStatisticsBar: false,
          canvasControlFlowBar: false
        });
      }
    }
    , intialState)
};
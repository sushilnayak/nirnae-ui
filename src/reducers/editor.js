import { handleActions } from "redux-actions";
import { ActionTypes } from "../types";

const intialState = {
  editorLeftSidebar: false,
  editorRightSidebar: false,
  editorComponentSidebar: false,
  editorComponentSidebarWidth: "0",
  editorProjectSidebar: false,
  editorProjectSidebarWidth: "0"
};

export default {
  editorSidebar: handleActions({
      [ActionTypes.EDITOR_COMPONENTS_SIDEBAR]: (state, action) => {
        let status = !state.editorComponentSidebar;
        return Object.assign({}, state, {
          editorLeftSidebar: status,
          editorComponentSidebarWidth: status? "170px" : "0",
          editorProjectSidebarWidth: "0",
          editorComponentSidebar: status,
          editorProjectSidebar: false
        });
      },
      [ActionTypes.EDITOR_PROJECTS_SIDEBAR]: (state, action) => {
        let status = !state.editorProjectSidebar;
        return Object.assign({}, state, {
          editorLeftSidebar: status,
          editorComponentSidebar: false,
          editorComponentSidebarWidth: "0",
          editorProjectSidebarWidth: status? "200px" : "0",
          editorProjectSidebar: status
        });
      }
    }
    , intialState)
};
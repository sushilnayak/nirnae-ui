import { handleActions } from "redux-actions";
import { ActionTypes, STATUS } from "../types";

const menuBarInitialState={
  showToolbar: false,
  deleteType: "",
  deleteId: ""
}

const componentSidebarInitialState={
  drag_status: STATUS.IDLE,
  drag_data: {
    nodeType: "",
    offsetLeft: null,
    offsetTop: null
  }
}

const editorSidebarIntialState = {
  editorLeftSidebar: false,
  editorRightSidebar: false,
  editorComponentSidebar: false,
  editorComponentSidebarWidth: "0",
  editorProjectSidebar: false,
  editorProjectSidebarWidth: "0"
};


export default {
  menuBar : handleActions({
    [ActionTypes.EDITOR_TOGGLE_TOOLBAR] : (state, action) => Object.assign({}, state, {
      showToolbar: !state.showToolbar
    }),
    [ActionTypes.EDITOR_TOOLBAR_DELETE_ACTION]: (state,{payload:{deleteType, deleteId}}) =>{
      return Object.assign({}, state, {
        deleteType,
        deleteId
      })
    }
  }, menuBarInitialState),

  componentSidebar: handleActions({
    [ActionTypes.COMPONENT_NODE_DRAG_START]: (state, action) => Object.assign({}, state, {
      drag_status: STATUS.RUNNING,
      drag_data: {
          nodeType: action.payload.nodeType,
          offsetLeft: action.payload.offsetLeft,
          offsetTop: action.payload.offsetTop
      }
    }),
    [ActionTypes.COMPONENT_NODE_DRAG_END]: (state, action) => Object.assign({}, state, {
      drag_status:  STATUS.IDLE,
      drag_data: {
          nodeType: "",
          offsetLeft: null,
          offsetTop: null
      }
    })
  },componentSidebarInitialState),
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
    , editorSidebarIntialState)
};
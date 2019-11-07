import { createAction } from 'redux-actions'
import { ActionTypes } from "../types";

// export const editorLeftSidebar=createAction(ActionTypes.EDITOR_LEFT_SIDEBAR);
// export const editorRightSidebar=createAction(ActionTypes.EDITOR_RIGHT_SIDEBAR);

export const editorComponentsSidebar=createAction(ActionTypes.EDITOR_COMPONENTS_SIDEBAR);
export const editorProjectsSidebar=createAction(ActionTypes.EDITOR_PROJECTS_SIDEBAR);


export const editorComponentNodeDragStart = createAction(ActionTypes.COMPONENT_NODE_DRAG_START);
export const editorComponentNodeDragEnd = createAction(ActionTypes.COMPONENT_NODE_DRAG_END);


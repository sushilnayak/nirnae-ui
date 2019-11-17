import keyMirror from "fbjs/lib/keyMirror";

export const ActionTypes = keyMirror({
    // EDITOR_LEFT_SIDEBAR: undefined,
    // EDITOR_RIGHT_SIDEBAR: undefined,

    EDITOR_TOGGLE_TOOLBAR: undefined,
    EDITOR_TOOLBAR_DELETE_ACTION: undefined,
    EDITOR_TOOLBAR_CUT_ACTION: undefined,
    EDITOR_TOOLBAR_COPY_ACTION: undefined,
    EDITOR_TOOLBAR_PASTE_ACTION: undefined,
    EDITOR_TOOLBAR_ALIGN_ACTION: undefined,
    EDITOR_TOOLBAR_SNAP2GRID_ACTION: undefined,


    EDITOR_COMPONENTS_SIDEBAR: undefined,
    EDITOR_PROJECTS_SIDEBAR: undefined,

    CANVAS_BOTTOM_BAR: undefined,
    CANVAS_WARNING_AND_ERROR_BAR: undefined,
    CANVAS_STATUS_BAR: undefined,
    CANVAS_STATISTICS_BAR: undefined,
    CANVAS_CONTROL_FLOW_BAR: undefined,

    WORKSPACE_ADD_TAB: undefined,
    WORKSPACE_SELECT_TAB: undefined,
    WORKSPACE_CLOSE_TAB: undefined,
    WORKSPACE_OPEN_TAB: undefined,

    WORKSPACE_CANVAS_ADD_NODE: undefined,
    WORKSPACE_CANVAS_UPDATE_NODE: undefined,

    COMPONENT_NODE_DRAG_START: undefined,
    COMPONENT_NODE_DRAG_END: undefined,

    WORKSPACE_CANVAS_SHOW_PROPERTIES  : undefined,
    WORKSPACE_CANVAS_CANCEL_PROPERTIES: undefined,
    WORKSPACE_CANVAS_OK_PROPERTIES    : undefined,

    WORKSPACE_CANVAS_SELECT_NODE: undefined,
    WORKSPACE_CANVAS_SELECT_LINK: undefined,

});

export const STATUS = keyMirror({
    IDLE: undefined,
    RUNNING: undefined,
    READY: undefined,
    SUCCESS: undefined,
    ERROR: undefined
});
export const CANVAS_STATUS = keyMirror({
    DEFAULT: undefined,
    MOVING: undefined,
    JOINING: undefined,
    MOVING_ACTIVE: undefined,
    ADDING: undefined,
    EDITING: undefined,
    EXPORT: undefined,
    IMPORT: undefined,
    IMPORT_DRAGGING: undefined,
    QUICK_JOINING: undefined,
    PANNING: undefined
});

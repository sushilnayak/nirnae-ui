import keyMirror from "fbjs/lib/keyMirror";

export const ActionTypes = keyMirror({
    // EDITOR_LEFT_SIDEBAR: undefined,
    // EDITOR_RIGHT_SIDEBAR: undefined,

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
    WORKSPACE_UPDATE_NODE: undefined,

    COMPONENT_NODE_DRAG_START: undefined,
    COMPONENT_NODE_DRAG_END: undefined,

    WORKSPACE_CANVAS_SHOW_PROPERTIES  : undefined,
    WORKSPACE_CANVAS_CANCEL_PROPERTIES: undefined,
    WORKSPACE_CANVAS_OK_PROPERTIES    : undefined
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

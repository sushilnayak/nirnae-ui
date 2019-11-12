import {handleActions} from "redux-actions";
import {ActionTypes} from "../types";

const contentAreaSidebarIntialState = {
    canvasBottomBar: false,
    canvasWarningAndErrorBar: false,
    canvasStatusBar: false,
    canvasStatisticsBar: false,
    canvasControlFlowBar: false,
};

const contentAreaWorkspaceInitialState = {
    editorTabs: [],
    activeEditortab: "",
    editorTabCanvas:{}
}
const contentAreaOperationsInitialState = {
    propertiesShow: false,
    propertiesNodeType: "",
    propertiesNodeId: ""
}


export default {
    contentAreaOperations: handleActions({
        [ActionTypes.WORKSPACE_CANVAS_SHOW_PROPERTIES]: (state, action) => {
            return Object.assign({}, state, {
                propertiesShow: true,
                propertiesNodeType: action.payload.nodeType,
                propertiesNodeId: action.payload.nodeId
            })
        },
        [ActionTypes.WORKSPACE_CANVAS_CANCEL_PROPERTIES]: (state, action) => {
            return Object.assign({}, state, {
                propertiesShow: false,
                propertiesNodeType: "",
                propertiesNodeId: ""
            })
        },
        [ActionTypes.WORKSPACE_CANVAS_OK_PROPERTIES]: (state, action) => {
            return Object.assign({}, state, {
                propertiesShow: false,
                propertiesNodeType: "",
                propertiesNodeId: ""
            })
        }
    }, contentAreaOperationsInitialState),
    contentAreaWorkspace: handleActions({
        [ActionTypes.WORKSPACE_ADD_TAB]: (state, action) =>{
            let existingTabsList= state.editorTabs;
            existingTabsList.push(action.payload)

            const canvasGraphData={
                activeNodes:[],
                activeLinks:[]
            }

            let existingEditorTabCanvas=Object.assign({}, state.editorTabCanvas, {
                [action.payload] : canvasGraphData
            })

            return Object.assign({}, state, {
                activeEditortab: action.payload,
                editorTabs: existingTabsList,
                editorTabCanvas: existingEditorTabCanvas
            })
        },
        [ActionTypes.WORKSPACE_SELECT_TAB]:(state, action)=>{
            return Object.assign({}, state,{
                activeEditortab: action.payload,
            })
        },
        [ActionTypes.WORKSPACE_CLOSE_TAB]: (state, action) =>{
            let newEditorTabs= state.editorTabs.filter(tab => tab!== action.payload)
            let activeTab =state.activeEditortab===action.payload? (newEditorTabs[0]!==undefined ? newEditorTabs[0] : "") : state.activeEditortab

            let existingEditorTabCanvas=state.editorTabCanvas;
            delete existingEditorTabCanvas[action.payload]

            return { ...state,
                activeEditortab: activeTab,
                editorTabs: newEditorTabs,
                editorTabCanvas: existingEditorTabCanvas
            }
        },
        [ActionTypes.WORKSPACE_OPEN_TAB]: (state, action) =>{
            return Object.assign({}, state, {
                activeEditortab: action.payload,
                // editorTabs: state.editorTabs.filter(tab => tab== action.payload)
                //TODO: ADD information like activeNodes & activeLinks if existing tab/project is being open
            })
        },
        [ActionTypes.WORKSPACE_CANVAS_ADD_NODE]: (state, action) =>{
            let activeTab = state.activeEditortab
            let nodeData=state.editorTabCanvas[activeTab].activeNodes

            const canvasGraphData={
                activeNodes: nodeData,
                activeLinks: state.editorTabCanvas[activeTab].activeLinks
            }

            let existingEditorTabCanvas=Object.assign({}, state.editorTabCanvas, {
                [activeTab] : canvasGraphData
            })

            return Object.assign({}, state, {
                editorTabCanvas: existingEditorTabCanvas
            })
        },
        [ActionTypes.WORKSPACE_UPDATE_NODE]: (state, action) =>{
            let activeTab = state.activeEditortab

            const canvasGraphData={
                activeNodes: action.payload.nodeData,
                activeLinks: action.payload.linkData
            }

            let existingEditorTabCanvas=Object.assign({}, state.editorTabCanvas, {
                [activeTab] : canvasGraphData
            })

            return Object.assign({}, state, {
                editorTabCanvas: existingEditorTabCanvas
            })
        }
    }, contentAreaWorkspaceInitialState),
    contentAreaSidebar: handleActions({
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
        , contentAreaSidebarIntialState)
};
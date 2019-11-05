import {handleActions} from "redux-actions";
import {ActionTypes} from "../types";

const intialState = {
    canvasBottomBar: false,
    canvasWarningAndErrorBar: false,
    canvasStatusBar: false,
    canvasStatisticsBar: false,
    canvasControlFlowBar: false
};

const contentAreaWorkspaceInitialState = {
    editorTabs: [],
    activeEditortab: "",
    editorTabCanvas:{}
}

export default {
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

            const canvasGraphData={
                activeNodes: action.payload.nodeData,
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
        , intialState)
};
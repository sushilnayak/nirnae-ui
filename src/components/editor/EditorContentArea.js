import React from 'react'
import {ComponentDrawer, ProjectDrawer} from "../drawers";
import {connect} from 'react-redux'
import {
    canvasControlFlowBar,
    canvasStatisticsBar,
    canvasStatusBar,
    canvasWarningAndErrorBar
} from "../../actions/contentArea";
import EditorContentAreaWorkspace from "./editor-content-area/EditorContentAreaWorkspaces";

const mapStateToProps = ({contentAreaSidebar, editorSidebar}) => ({contentAreaSidebar, editorSidebar});

const mapDispatchToProps = (dispatch) => ({
    canvasWarningAndErrorBar: () => dispatch(canvasWarningAndErrorBar()),
    canvasStatusBar: () => dispatch(canvasStatusBar()),
    canvasStatisticsBar: () => dispatch(canvasStatisticsBar()),
    canvasControlFlowBar: () => dispatch(canvasControlFlowBar())
});

function EditorContentArea(props) {
    const {canvasBottomBar, canvasWarningAndErrorBar, canvasStatusBar, canvasStatisticsBar, canvasControlFlowBar} = props.contentAreaSidebar;
    const {editorLeftSidebar, editorComponentSidebar, editorComponentSidebarWidth, editorProjectSidebar, editorProjectSidebarWidth} = props.editorSidebar;

    let style = {
        gridTemplateColumns: `30vh auto`,
        gridTemplateAreas: `"app-editor-content-area-left-sidebar    app-editor-content-area-workspaces"`
    };

    style.gridTemplateColumns = editorLeftSidebar ? (editorComponentSidebar ? `${editorComponentSidebarWidth} repeat(auto-fit, minmax(100px, 1fr))` : `${editorProjectSidebarWidth}  repeat(auto-fit, minmax(100px, 1fr))`) : `repeat(auto-fit, minmax(100px, 1fr))`
    style.gridTemplateAreas = editorLeftSidebar ? style.gridTemplateAreas : `"app-editor-content-area-workspaces"`

    return <div className={"app-editor-content-area"} style={style}>
        {editorLeftSidebar && <div className={"app-editor-content-area-left-sidebar"}>
            {editorComponentSidebar && <ComponentDrawer/>}
            {editorProjectSidebar && <ProjectDrawer/>}
        </div>}
        <EditorContentAreaWorkspace/>

    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentArea);
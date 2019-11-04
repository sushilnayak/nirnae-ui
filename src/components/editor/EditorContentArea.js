import React from 'react'
import {ComponentDrawer, ProjectDrawer} from "../drawers";
import {connect} from 'react-redux'
import EditorContentAreaFooter from "./editor-content-area/EditorContentAreaFooter";
import {
    canvasControlFlowBar,
    canvasStatisticsBar,
    canvasStatusBar,
    canvasWarningAndErrorBar
} from "../../actions/canvas";

const mapStateToProps = ({canvasSidebar, editorSidebar}) => ({canvasSidebar, editorSidebar});

const mapDispatchToProps = (dispatch) => ({
    canvasWarningAndErrorBar: () => dispatch(canvasWarningAndErrorBar()),
    canvasStatusBar: () => dispatch(canvasStatusBar()),
    canvasStatisticsBar: () => dispatch(canvasStatisticsBar()),
    canvasControlFlowBar: () => dispatch(canvasControlFlowBar())
});

function EditorContentArea(props) {
    const {canvasBottomBar, canvasWarningAndErrorBar, canvasStatusBar, canvasStatisticsBar, canvasControlFlowBar} = props.canvasSidebar;
    const {editorLeftSidebar, editorComponentSidebar, editorComponentSidebarWidth, editorProjectSidebar, editorProjectSidebarWidth} = props.editorSidebar;

    let style = {
        gridTemplateColumns: `30vh auto`,
        gridTemplateRows: `auto 20px`,
        gridTemplateAreas: `"app-editor-content-area-left-sidebar    app-editor-content-area-canvas"
                            "app-editor-content-area-left-sidebar    app-editor-content-area-bottom-bar"`
    };

    style.gridTemplateRows = canvasBottomBar ? `auto 30vh` : `auto 20px`
    style.gridTemplateColumns = editorLeftSidebar ? ( editorComponentSidebar ? `${editorComponentSidebarWidth} auto` : `${editorProjectSidebarWidth} auto`) : `auto`
    style.gridTemplateAreas = editorLeftSidebar ? style.gridTemplateAreas : `"app-editor-content-area-canvas" "app-editor-content-area-bottom-bar"`

    return <div className={"app-editor-content-area"} style={style}>
        {editorLeftSidebar && <div className={"app-editor-content-area-left-sidebar"}>
            {editorComponentSidebar && <ComponentDrawer/>}
            {editorProjectSidebar && <ProjectDrawer />}
        </div>}
        <div className={"app-editor-content-area-canvas"}>ppppp</div>
        <div className={"app-editor-content-area-bottom-bar"}>
            <EditorContentAreaFooter  { ...props} />
        </div>
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentArea);
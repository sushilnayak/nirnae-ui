import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import EditorContentAreaWorkspacesTab from "./EditorContentAreaWorkspacesTab";
import EditorContentAreaWorkspacesCanvas from "./EditorContentAreaWorkspacesCanvas";
import EditorContentAreaWorkspacesFooter from "./EditorContentAreaWorkspacesFooter";

const mapStateToProps = ({contentAreaWorkspace, contentAreaSidebar}) => ({
    contentAreaWorkspace,
    contentAreaSidebar
})

const mapDispatchToProps = (dispatch) => ({})

function EditorContentAreaWorkspaces(props) {
    const {activeEditortab, editorTabs} = props.contentAreaWorkspace
    const {canvasBottomBar} =props.contentAreaSidebar
    const style={
        gridTemplateRows: `25px auto 20px`,
        gridTemplateAreas: `"app-editor-content-area-workspaces-tabs" "app-editor-content-area-workspaces-canvas" "app-editor-content-area-workspaces-footer"`,
    }

    let tabHeight = activeEditortab==="" && editorTabs.length===0 ? `` : `25px`
    let canvasHeight = canvasBottomBar ? `30vh` : `20px`;

    style.gridTemplateRows =  `${tabHeight} auto ${canvasHeight}`
    style.gridTemplateAreas = `${tabHeight.length>0 && "app-editor-content-area-workspaces-tabs"} "app-editor-content-area-workspaces-canvas" "app-editor-content-area-workspaces-footer"`

    return <div className={"app-editor-content-area-workspaces"} style={style}>
        {tabHeight.length>0 && <EditorContentAreaWorkspacesTab/>}
        {activeEditortab !== "" ?
            <Fragment>
                <EditorContentAreaWorkspacesCanvas/>
                <EditorContentAreaWorkspacesFooter/>
            </Fragment> : null}
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspaces)
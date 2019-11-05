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
    const {activeEditortab} = props.contentAreaWorkspace
    const {canvasBottomBar} =props.contentAreaSidebar
    const style={
        gridTemplateRows: `25px auto 20px`
    }

    style.gridTemplateRows =  canvasBottomBar ? `25px auto 30vh` : style.gridTemplateRows

    return <div className={"app-editor-content-area-workspaces"} style={style}>
        <EditorContentAreaWorkspacesTab/>
        {activeEditortab !== "" ?
            <Fragment>
                <EditorContentAreaWorkspacesCanvas/>
                <EditorContentAreaWorkspacesFooter/>
            </Fragment> : null}
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspaces)
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {connect} from "react-redux";
import {contentAreaWorkspaceCloseTab, contentAreaWorkspaceSelectTab} from "../../../actions/contentArea";

const mapStateToProps=({contentAreaWorkspace})=>({
    contentAreaWorkspace
})

const mapDispatchToProps=(dispatch)=>({
    contentAreaWorkspaceSelectTab: (data)=> dispatch(contentAreaWorkspaceSelectTab(data)),
    contentAreaWorkspaceCloseTab:(data) => dispatch(contentAreaWorkspaceCloseTab(data))
})
function EditorContentAreaWorkspacesTab(props) {
    const {editorTabs, activeEditortab} = props.contentAreaWorkspace

    return <div className={"app-editor-content-area-workspaces-tabs noselect"}>
        { editorTabs.map( (tab,i) => {
            let style= tab===activeEditortab ? {borderBottom: "3px solid #4083C9"} : {};
            return <div key={i}
                        style={style} ><span style={{paddingLeft: "10px", display: "inline-block"}} onClick={()=>props.contentAreaWorkspaceSelectTab(tab)}>{tab}</span><span onClick={()=>props.contentAreaWorkspaceCloseTab(tab) }><FontAwesomeIcon size="sm" style={{color: "#C1C7CA"}} icon={faTimes}/></span></div>
        })}
    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspacesTab);
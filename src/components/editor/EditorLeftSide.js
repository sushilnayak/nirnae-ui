import React, {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faProjectDiagram} from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import {editorComponentsSidebar, editorProjectsSidebar} from "../../actions/editor";
import {connect} from "react-redux";

const mapStateToProps = ({editorSidebar, contentAreaWorkspace}) => ({
    editorSidebar,
    contentAreaWorkspace
});

const mapDispatchToProps = (dispatch) => ({
    componentsSidebar: () => dispatch(editorComponentsSidebar()),
    projectsSidebar: () => dispatch(editorProjectsSidebar())
});

function EditorLeftSide(props) {

    const {editorLeftSidebar, editorRightSidebar, editorComponentSidebar, editorProjectSidebar} = props.editorSidebar;
    const {activeEditortab} = props.contentAreaWorkspace
    return (
        <Fragment>
            <div className={"app-editor-left-side noselect"}>
                <div className={"rotate-left"}>
                    {activeEditortab ? <div style={{backgroundColor: editorComponentSidebar ? "#BDBDBD" : ""}} onClick={props.componentsSidebar} ><span><FontAwesomeIcon size="sm" icon={faFolder}/></span>Components</div> : null}
                    <div style={{backgroundColor: editorProjectSidebar ? "#BDBDBD" : "" }} onClick={props.projectsSidebar}><span><FontAwesomeIcon size="sm" icon={faProjectDiagram}/></span>Project</div>
                </div>
            </div>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorLeftSide);
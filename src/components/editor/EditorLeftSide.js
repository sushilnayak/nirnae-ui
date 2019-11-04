import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { editorComponentsSidebar, editorProjectsSidebar } from "../../actions/editor";
import { connect } from "react-redux";

const mapStateToProps = ({ editorSidebar }) => ({
    editorSidebar
});

const mapDispatchToProps = (dispatch) => ({
    componentsSidebar: () => dispatch(editorComponentsSidebar()),
    projectsSidebar: () => dispatch(editorProjectsSidebar())
});

function EditorLeftSide(props) {

    const { editorLeftSidebar, editorRightSidebar, editorComponentSidebar, editorProjectSidebar } = props.editorSidebar;

    return (
        <Fragment>
            <div className={"app-editor-left-side noselect"}>
                <div className={"rotate-left"}>
                    <div
                        style={{ backgroundColor: editorProjectSidebar ? "#BDBDBD" : "" }}
                        onClick={props.projectsSidebar}>
            <span>
              <FontAwesomeIcon size="sm" icon={faProjectDiagram}/>
            </span>
                        Project
                    </div>
                    <div
                        style={{ backgroundColor: editorComponentSidebar ? "#BDBDBD" : "" }}
                        onClick={props.componentsSidebar}
                    >
            <span>
              <FontAwesomeIcon size="sm" icon={faFolder}/>
            </span>
                        Components
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorLeftSide);
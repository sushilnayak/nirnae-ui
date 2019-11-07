import React, {useRef, useState, useEffect} from "react";
import {connect} from 'react-redux'
import Modal from "../../common/Modal";
import {contentAreaWorkspaceCreateNewTab} from "../../actions/contentArea";
import {editorProjectsSidebar} from "../../actions/editor";

const mapStateToProps = (props) => ({})
const mapDispatchToProps = dispatch => ({
    contentAreaWorkspaceCreateNewTab: (data) => dispatch(contentAreaWorkspaceCreateNewTab(data)),
    editorProjectsSidebar:()=> dispatch(editorProjectsSidebar())
})

function ProjectDrawer(props) {

    const [showNewProjectModal, setShowNewProjectModal] = useState(false)
    const inputRef = useRef(null)

    useEffect(()=>{
        if( showNewProjectModal) inputRef.current.focus()
    },[showNewProjectModal])

    return <div className={"project-drawer"}>
        <h3>Dummy Projects</h3>
        <button onClick={(e) => {
            e.preventDefault();
            setShowNewProjectModal(!showNewProjectModal)
        }}>Create New Project
        </button>

        {showNewProjectModal && (
            <Modal onClick={() => setShowNewProjectModal(!showNewProjectModal)}>
                <div className="modal-content new-project-modal"  onKeyDown={(e) => e.keyCode===27 ? setShowNewProjectModal(!showNewProjectModal) : null}>
                    <div>
                        <span className="close" onClick={() => setShowNewProjectModal(!showNewProjectModal)}>
                      &times;
                    </span>
                    </div>
                    <div className={"content"}>
                        <p>Enter Project Name</p>
                        <input type={"text"} placeholder={"Project Name..."} ref={inputRef}/>
                    </div>
                    <div className={"button-group"}>
                        <button onClick={() => {
                            props.contentAreaWorkspaceCreateNewTab(inputRef.current.value)
                            setShowNewProjectModal(!showNewProjectModal)
                            props.editorProjectsSidebar()
                        }}>Create
                        </button>
                        <button onClick={() => setShowNewProjectModal(!showNewProjectModal)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        )}
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDrawer)
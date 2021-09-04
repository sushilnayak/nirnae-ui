import React, {Fragment, useState} from "react";
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRunning} from "@fortawesome/free-solid-svg-icons/faRunning";
import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {faCode} from "@fortawesome/free-solid-svg-icons/faCode";
import {faServer} from "@fortawesome/free-solid-svg-icons/faServer";
import {faCut} from "@fortawesome/free-solid-svg-icons/faCut";
import {faCopy} from "@fortawesome/free-solid-svg-icons/faCopy";
import {faPaste} from "@fortawesome/free-solid-svg-icons/faPaste";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import {faRedo} from "@fortawesome/free-solid-svg-icons/faRedo";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons/faAlignCenter";
import {faTh} from "@fortawesome/free-solid-svg-icons/faTh";
import Modal from "../../common/Modal";
import {editorToggleToolbar, editorToolbarDeleteAction} from "../../actions/editor";

const mapStateToProps = ({contentAreaWorkspace, menuBar, contentAreaOperations}) => ({
    contentAreaWorkspace,
    menuBar,
    contentAreaOperations
})

const mapDispatchToProps = (dispatch) => ({
    editorToggleToolbar: () => dispatch(editorToggleToolbar()),
    editorToolbarDeleteAction: (data)=> dispatch(editorToolbarDeleteAction(data))
})

function EditorHeader(props) {
    const [showJson, setShowJson] = useState(false);
    const {activeEditortab, editorTabs} = props.contentAreaWorkspace
    const {selectedNode,  selectedNodeId, selectedLink, selectedLinkId} = props.contentAreaOperations
    const {showToolbar} = props.menuBar

    let deleteType = selectedNode ? "node" : "link"
    let deleteId = selectedNode ? selectedNodeId : selectedLinkId

    return (
        <Fragment>
            <div className={"app-editor-header noselect"}>

                <ul>
                    <li>
                        File
                        <ul className="dropdown">
                            <li onClick={() => console.log("New was clicked")}>New</li>
                            <li onClick={() => console.log("Save was clicked")}>Save</li>
                            <li onClick={() => console.log("Exit Editor was clicked")}>
                                Exit Editor
                            </li>
                        </ul>
                    </li>
                    <li>
                        Edit
                        <ul className="dropdown">
                            <li onClick={() => console.log("Cut was clicked")}>Cut</li>
                            <li onClick={() => console.log("Copy was clicked")}>Copy</li>
                            <li onClick={() => console.log("Paste was clicked")}>Paste</li>
                        </ul>
                    </li>
                    <li>
                        View
                        <ul className="dropdown">
                            <li onClick={props.editorToggleToolbar}>Show Toolbar</li>
                        </ul>
                    </li>
                    <li>
                        Help
                        <ul className="dropdown">
                            <li onClick={() => console.log("Keyboard shortcut was clicked")}>Keyboard Shortcut</li>
                            <li onClick={() => console.log("About was clicked")}>About</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className={"app-editor-sub-header noselect"}>
                {activeEditortab !== "" && editorTabs.length > 0 && <Fragment>
                    <div className={"app-editor-sub-header-left"}>
                        {showToolbar && <Fragment>
                            <div>
                            <span>
                            <FontAwesomeIcon size="sm" icon={faCut}/>
                            </span>
                                Cut
                            </div>
                            <div>
                            <span>
                            <FontAwesomeIcon size="sm" icon={faCopy}/>
                            </span>
                                Copy
                            </div>
                            <div>
                            <span>
                            <FontAwesomeIcon size="sm" icon={faPaste}/>
                            </span>
                                Paste
                            </div>
                            <div onClick={()=> {
                                 props.editorToolbarDeleteAction({deleteType , deleteId })}

                            }>
                                <span>
                                <FontAwesomeIcon size="sm" icon={faTimes}/>
                                </span>
                                Delete
                            </div>
                            <div>
                            <span>
                            <FontAwesomeIcon size="sm" icon={faUndo}/>
                            </span>
                                Undo
                            </div>
                            <div>
                                <span>
                                <FontAwesomeIcon size="sm" icon={faRedo}/>
                                </span>
                                Redo
                            </div>
                            <div>
                                <span>
                                <FontAwesomeIcon size="sm" icon={faAlignCenter}/>
                                </span>
                                Align Graph
                            </div>
                            <div>
                                <span>
                                <FontAwesomeIcon size="sm" icon={faTh}/>
                                </span>
                                Snap to grid
                            </div>
                        </Fragment>}
                    </div>
                    <div className={"app-editor-sub-header-right"}>
                        <div>
          <span style={{color: "green"}}>
          <FontAwesomeIcon size="sm" icon={faServer}/>
          </span>
                            Deploy
                            <ul>
                                <li>Deploy to Server</li>
                                <li>Update Deployment</li>
                            </ul>
                        </div>
                        <div>
          <span style={{color: "green"}}>
          <FontAwesomeIcon size="sm" icon={faRunning}/>
          </span>
                            Run
                        </div>
                        <div>
          <span style={{color: "green"}}>
          <FontAwesomeIcon size="sm" icon={faSync}/>
          </span>
                            ReRun
                        </div>
                        <div>
          <span style={{color: "red"}}>
          <FontAwesomeIcon size="sm" icon={faStop}/>
          </span>
                            Stop
                        </div>
                        <div onClick={() => setShowJson(!showJson)}>
          <span>
          <FontAwesomeIcon size="sm" icon={faCode}/>
          </span>
                            JSON
                        </div>
                    </div>
                </Fragment>}
            </div>

            {showJson && (
                <Modal onClick={() => setShowJson(!showJson)}>
                    <div className="modal-content">
            <span className="close" onClick={() => setShowJson(!showJson)}>
              &times;
            </span>
                        <p>Some text in the Modal..</p>
                    </div>
                </Modal>
            )}
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorHeader)
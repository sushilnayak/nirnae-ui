import React, { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons/faRunning";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import Modal from "../../common/Modal";
import { faServer } from "@fortawesome/free-solid-svg-icons/faServer";

export default function EditorHeader() {
  const [showJson, setShowJson] = useState(false);

  return (
    <Fragment>
      <div className={"header noselect"}>
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
          <li>View</li>
          <li>
            Help
            <ul className="dropdown">
              <li onClick={() => console.log("Keyboard shortcut was clicked")}>Keyboard Shortcut</li>
              <li onClick={() => console.log("About was clicked")}>About</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={"sub-header noselect"}>
        <div className={"sub-header-left"}></div>
        <div className={"sub-header-right"}>
          <div>
            <span style={{ color: "green" }}>
              <FontAwesomeIcon size="sm" icon={faServer} />
            </span>
            Deloy
            <ul>
              <li>Deploy to Server</li>
              <li>Update Deployment</li>
            </ul>
          </div>
          <div>
            <span style={{ color: "green" }}>
              <FontAwesomeIcon size="sm" icon={faRunning} />
            </span>
            Run
          </div>
          <div>
            <span style={{ color: "green" }}>
              <FontAwesomeIcon size="sm" icon={faSync} />
            </span>
            ReRun
          </div>
          <div>
            <span style={{ color: "red" }}>
              <FontAwesomeIcon size="sm" icon={faStop} />
            </span>
            Stop
          </div>
          <div onClick={() => setShowJson(!showJson)}>
            <span>
              <FontAwesomeIcon size="sm" icon={faCode} />
            </span>
            JSON
          </div>
        </div>
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

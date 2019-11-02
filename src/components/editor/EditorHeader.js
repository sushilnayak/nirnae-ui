import React,{Fragment} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons/faRunning";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faBug } from "@fortawesome/free-solid-svg-icons/faBug";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";

export default function EditorHeader() {
  return <Fragment>
    <div className={"header noselect"}>
      <ul>
        <li>File</li>
        <li>Edit</li>
        <li>View</li>
        <li>Help</li>
      </ul>
    </div>

    <div className={"sub-header noselect"}>
      <div className={"sub-header-left"}></div>
      <div className={"sub-header-right"}>
        <div><span style={{ color: "green" }}><FontAwesomeIcon size="sm" icon={faRunning}/></span>Run</div>
        <div><span style={{ color: "green" }}><FontAwesomeIcon size="sm" icon={faSync}/></span>ReRun</div>
        <div><span style={{ color: "green" }}><FontAwesomeIcon size="sm" icon={faBug}/></span>Debug</div>
        <div><span style={{ color: "red" }}><FontAwesomeIcon size="sm" icon={faStop}/></span>Stop</div>
        <div><span><FontAwesomeIcon size="sm" icon={faCode}/></span>JSON</div>
      </div>
    </div>
  </Fragment>;
}
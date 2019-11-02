import React, {Fragment} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";

export default function EditorRightSidebar() {
  return <Fragment>
    <div className={"sidebar-right noselect"}>
      <div className={"rotate-right"}>
        <div><span><FontAwesomeIcon size="sm" icon={faCog}/></span>Maven</div>
        <div><span><FontAwesomeIcon size="sm" icon={faCog}/></span>Gradle</div>
      </div>
    </div>
  </Fragment>;
}


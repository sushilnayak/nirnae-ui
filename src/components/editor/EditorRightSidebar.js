import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { faBug } from "@fortawesome/free-solid-svg-icons/faBug";

function closeAllSideDrawer(drawers) {
  drawers.forEach(x => x(false));
}

export default function EditorRightSidebar() {
  const [infoSidebar, setInfoSidebar] = useState(false);
  const [debugSidebar, setDebugSidebar] = useState(false);

  const rightSideDrawersSetters = [setInfoSidebar, setDebugSidebar];

  return (
    <Fragment>
      <div className={"sidebar-right noselect"}>
        <div className={"rotate-right"}>
          <div style={{ backgroundColor: infoSidebar ? "#BDBDBD" : "" }}
               onClick={() => {
                 closeAllSideDrawer(rightSideDrawersSetters)
                 setInfoSidebar(!infoSidebar)
               }}>
            <span>
              <FontAwesomeIcon size="sm" icon={faInfo}/>
            </span>
            Info
          </div>
          <div style={{ backgroundColor: debugSidebar ? "#BDBDBD" : "" }}
               onClick={() => {
                 closeAllSideDrawer(rightSideDrawersSetters)
                 setDebugSidebar(!debugSidebar)
               }}>
            <span>
              <FontAwesomeIcon size="sm" icon={faBug}/>
            </span>
            Debug
          </div>
        </div>
      </div>
      {infoSidebar && <div className="right-side-drawer"></div>}
      {debugSidebar && <div className="right-side-drawer"></div>}
    </Fragment>
  );
}

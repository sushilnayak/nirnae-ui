import React, { Fragment, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";
import { ComponentDrawer, ProjectDrawer } from "../sidebar/drawer";

import EditorContext from "../../context/EditorContext";

function closeAllSideDrawer(drawers) {
  drawers.forEach(x => x(false));
}

export default function EditorLeftSidebar() {
  const [componentSidebar, setComponentSidebar] = useState(false);
  const [projectSidebar, setProjectSidebar] = useState(false);

  const leftSideDrawersSetters = [setComponentSidebar, setProjectSidebar];
  const leftSideDrawers = [componentSidebar, projectSidebar];

  const [, setEditorContext] = useContext(EditorContext);
  // console.log( useContext(EditorContext))

  return (
    <Fragment>
      <div className={"sidebar-left noselect"}>
        <div className={"rotate-left"}>
          <div
            style={{ backgroundColor: projectSidebar ? "#BDBDBD" : "" }}
            onClick={e => {
              closeAllSideDrawer(leftSideDrawersSetters);
              setProjectSidebar(!projectSidebar);
              setEditorContext(state => ({
                ...state,
                leftSideDrawerOpen:
                  leftSideDrawers.filter(x => x === true).length > 0
              }));
            }}
          >
            <span>
              <FontAwesomeIcon size="sm" icon={faProjectDiagram} />
            </span>
            Project
          </div>
          <div
            style={{ backgroundColor: componentSidebar ? "#BDBDBD" : "" }}
            onClick={e => {
              closeAllSideDrawer(leftSideDrawersSetters);
              setComponentSidebar(!componentSidebar);
              setEditorContext(state => ({
                ...state,
                leftSideDrawerOpen:
                  leftSideDrawers.filter(x => x === true).length > 0
              }));
            }}
          >
            <span>
              <FontAwesomeIcon size="sm" icon={faFolder} />
            </span>
            Components
          </div>
        </div>
      </div>

      {componentSidebar && (
        <div className="left-side-drawer">
          <ComponentDrawer />
        </div>
      )}
      {projectSidebar && (
        <div className="left-side-drawer">
          <ProjectDrawer />
        </div>
      )}
    </Fragment>
  );
}

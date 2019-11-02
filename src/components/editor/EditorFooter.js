import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons/faExchangeAlt";
import {
  StatusDrawer,
  WarningAndErrorDrawer,
  StatisticsDrawer,
  ControlFlowDrawer
} from "../sidebar/drawer";

function closeAllSideDrawer(drawers) {
  drawers.forEach(x => x(false));
}

export default function EditorFooter() {
  const [statusFooter, setStatusFooter] = useState(false);
  const [warningErrorFooter, setWarningErrorFooter] = useState(false);
  const [statisticsFooter, setStatisticsFooter] = useState(false);
  const [controlFlowFooter, setControlFlowFooter] = useState(false);

  const footerDrawersSetters = [
    setStatusFooter,
    setWarningErrorFooter,
    setStatisticsFooter,
    setControlFlowFooter
  ];

  return (
    <Fragment>
      <div className={"footer noselect"}>
        <div
          style={{ backgroundColor: statusFooter ? "#BDBDBD" : "" }}
          onClick={e => {
            closeAllSideDrawer(footerDrawersSetters);
            setStatusFooter(!statusFooter);
          }}
        >
          <span>
            <FontAwesomeIcon size="sm" icon={faCheck} />
          </span>
          Status
        </div>
        <div
          style={{ backgroundColor: warningErrorFooter ? "#BDBDBD" : "" }}
          onClick={e => {
            closeAllSideDrawer(footerDrawersSetters);
            setWarningErrorFooter(!warningErrorFooter);
          }}
        >
          <span>
            <FontAwesomeIcon size="sm" icon={faExclamationTriangle} />
          </span>
          Warning &amp; Errors
        </div>
        <div
          style={{ backgroundColor: statisticsFooter ? "#BDBDBD" : "" }}
          onClick={e => {
            closeAllSideDrawer(footerDrawersSetters);
            setStatisticsFooter(!statisticsFooter);
          }}
        >
          <span>
            <FontAwesomeIcon size="sm" icon={faChartBar} />
          </span>
          Statistics
        </div>
        <div
          style={{ backgroundColor: controlFlowFooter ? "#BDBDBD" : "" }}
          onClick={e => {
            closeAllSideDrawer(footerDrawersSetters);
            setControlFlowFooter(!controlFlowFooter);
          }}
        >
          <span>
            <FontAwesomeIcon size="sm" icon={faExchangeAlt} />
          </span>
          Control Flow
        </div>
      </div>

      {statusFooter && (
        <div className="bottom-footer-drawer">
          <StatusDrawer />
        </div>
      )}
      {warningErrorFooter && (
        <div className="bottom-footer-drawer">
          <WarningAndErrorDrawer />
        </div>
      )}
      {statisticsFooter && (
        <div className="bottom-footer-drawer">
          <StatisticsDrawer />
        </div>
      )}
      {controlFlowFooter && (
        <div className="bottom-footer-drawer">
          <ControlFlowDrawer />
        </div>
      )}
    </Fragment>
  );
}

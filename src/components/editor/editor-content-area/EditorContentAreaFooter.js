import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import {faChartBar} from "@fortawesome/free-solid-svg-icons/faChartBar";
import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons/faExchangeAlt";
import {ControlFlowDrawer, StatisticsDrawer, StatusDrawer, WarningAndErrorDrawer} from "../../drawers";


export default function EditorContentAreaFooter(props) {
    const {canvasBottomBar, canvasWarningAndErrorBar, canvasStatusBar, canvasStatisticsBar, canvasControlFlowBar} = props.canvasSidebar;
    // canvasSidebar:
    //     canvasBottomBar: false
    // canvasControlFlowBar: false
    // canvasStatisticsBar: false
    // canvasStatusBar: false
    // canvasWarningAndErrorBar: false
    return <Fragment>
        <div className={"footer-bar"}>
            <div style={{backgroundColor: canvasStatusBar ? "#BDBDBD" : ""}} onClick={props.canvasStatusBar}>
             <span><FontAwesomeIcon size="sm" icon={faCheck}/></span>Status
            </div>
            <div
                style={{backgroundColor: canvasWarningAndErrorBar ? "#BDBDBD" : ""}}
                onClick={props.canvasWarningAndErrorBar}>
          <span>
            <FontAwesomeIcon size="sm" icon={faExclamationTriangle}/>
          </span>
                Warning &amp; Errors
            </div>
            <div style={{backgroundColor: canvasStatisticsBar ? "#BDBDBD" : ""}} onClick={props.canvasStatisticsBar}>
                <span><FontAwesomeIcon size="sm" icon={faChartBar}/></span>Statistics
            </div>
            <div style={{backgroundColor: canvasControlFlowBar ? "#BDBDBD" : ""}} onClick={props.canvasControlFlowBar}>
             <span><FontAwesomeIcon size="sm" icon={faExchangeAlt}/></span>Control Flow</div>
            </div>

        { canvasBottomBar && <div className={"bottom-footer-drawer"}>
            {canvasStatusBar && <StatusDrawer />}
            {canvasWarningAndErrorBar && <WarningAndErrorDrawer/>}
            {canvasStatisticsBar && <StatisticsDrawer/>}
            {canvasControlFlowBar && <ControlFlowDrawer/>}
        </div>}
    </Fragment>

}

// export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaFooter)
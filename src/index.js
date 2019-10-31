import React, { Fragment, useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import "./styles/index.scss";
import { css, jsx } from "@emotion/core";
import * as d3 from "d3";

import {
  faCog,
  faBolt,
  faStop,
  faCheck,
  faFolder,
  faWind,
  faAlignJustify,
  faExclamationTriangle,
  faChartBar,
  faRetweet, faBug, faSync, faCode, faRunning
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "re-resizable";

class Canvas {
  constructor(element) {
    this.lasso = null;
    this.mouse_position = null;

    this.gridSize = 20;
    let svg = d3.select(element).append("svg")
      .attr("class", "outerCanvas")
      .attr("height", "100%")
      .attr("width", "100%")
      .style("cursor", "crosshair")
      .on("contextmenu", function() {
        //TODO: add context menu thingy for future
        d3.event.preventDefault();
      });

    this.canvasHeight = parseInt(svg.style("height"), 10);
    this.canvasWidth = parseInt(svg.style("width"), 10);


    //
    //     mouseenter: Fires when the mouse enters the canvas.
    //     mouseleave: Fires when the mouse leaves the canvas.
    //     mousemove: Fires on any mouse movement over the canvas.
    //     mouseout: Fires when the mouse leaves the canvas or any of its children.
    //     mouseover: Fires when the mouse enters the canvas or any of its children.
    //
    // svg.on("mouseenter", () => console.log([d3.event.pageX, d3.event.pageY]))
    //     .on("mouseleave", () => console.log([d3.event.pageX, d3.event.pageY]))
    //     .on("mousemove", () => console.log([d3.event.pageX, d3.event.pageY]))
    //     .on("mouseout", () => console.log([d3.event.pageX, d3.event.pageY]))
    //     .on("mouseover", () => console.log([d3.event.pageX, d3.event.pageY]))

    svg.on("mousedown", function (d) {
      console.log("xxxxxxxx")

      // if (this.lasso) {
      //     this.lasso.remove();
      //     this.lasso = null;
      // }

      let point = d3.mouse(this);

      this.lasso = svg.append("rect")
        .attr("ox", point[0])
        .attr("oy", point[1])
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("x", point[0])
        .attr("y", point[1])
        .attr("width", 0)
        .attr("height", 0)
        .attr("class", "nr-ui-view-lasso");
      d3.event.preventDefault();
    })

    svg.on("mousemove", function (d) {

      this.mouse_position = d3.touches(this)[0] || d3.mouse(this);

      if (this.lasso) {
        let ox = parseInt(this.lasso.attr("ox"));
        let oy = parseInt(this.lasso.attr("oy"));
        let x = parseInt(this.lasso.attr("x"));
        let y = parseInt(this.lasso.attr("y"));
        let w;
        let h;
        if (this.mouse_position[0] < ox) {
          x = this.mouse_position[0];
          w = ox - x;
        } else {
          w = this.mouse_position[0] - x;
        }
        if (this.mouse_position[1] < oy) {
          y = this.mouse_position[1];
          h = oy - y;
        } else {
          h = this.mouse_position[1] - y;
        }
        this.lasso
          .attr("x", x)
          .attr("y", y)
          .attr("width", w)
          .attr("height", h)
        ;
        return;
      }
    })

    svg.on("mouseup", function (d) {
      if (this.lasso) {
        let x = parseInt(this.lasso.attr("x"));
        let y = parseInt(this.lasso.attr("y"));
        let x2 = x + parseInt(this.lasso.attr("width"));
        let y2 = y + parseInt(this.lasso.attr("height"));

        console.log(x , y , x2, y2)
        // TODO : Add logic to get all the nodes to that are there in the range
        this.lasso.remove();
        this.lasso = null;
      }
    })

    svg.on("mouseleave",function (d) {
      if (this.lasso) {
        this.lasso.remove();
        this.lasso = null;
      }
    })

    this.vis = svg.append("g")
      .on("dblclick.zoom", null)
      .append("g")
      .attr("class", "innerCanvas");


    this.outer_background = this.vis.append("rect")
      .attr("width", this.canvasWidth)
      .attr("height", this.canvasHeight)
      .attr("fill", "#fff");

    this.updateGrid(this.vis.append("g"));
    this.linkLayer = this.vis.append("g");
    this.dragGroup = this.vis.append("g");
    this.nodeLayer = this.vis.append("g");
    this.miniMapLayer = this.vis.append("g");
    this.drag_lines = [];
  }


  updateGrid(grid) {
    let gridTicks = [];
    for (let i = 0; i < this.canvasWidth; i += +this.gridSize) {
      gridTicks.push(i);
    }

    grid.selectAll("line.horizontal").remove();

    grid.selectAll("line.horizontal")
      .data(gridTicks)
      .enter()
      .append("line")
      .attr("class", "horizontal")
      .attr("x1", 0)
      .attr("x2", this.canvasWidth)
      .attr("y1", d => d)
      .attr("y2", d => d)
      .attr("fill", "none")
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", "#eee")
      .attr("stroke-width", "1px");

    grid.selectAll("line.vertical").remove();
    grid.selectAll("line.vertical").data(gridTicks).enter()
      .append("line")
      .attr("class", "vertical")
      .attr("y1", 0)
      .attr("y2", this.canvasWidth)
      .attr("x1", d => d)
      .attr("x2", d => d)
      .attr("fill", "none")
      .attr("shape-rendering", "crispEdges")
      .attr("stroke", "#eee")
      .attr("stroke-width", "1px");
  }
}

function closeAllSideDrawer(drawers) {
  drawers.forEach(x => x(false));
}

function App() {
  return <div className={"app"}>
    <EditorHeader/>
    <EditorLeftSidebar/>
    <EditorCanvas/>
    <EditorRightSidebar/>
    <EditorFooter/>
  </div>;
}

function EditorCanvas() {
  let canvas = null;
  let canvasRef = useRef(null);

  useEffect(() => {
    canvas = new Canvas(canvasRef.current);

    return () => canvas = null;
  }, []);
  return <div className={"main-content"} ref={canvasRef}/>;
}


function EditorHeader() {
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
        <div><span><FontAwesomeIcon size="sm" icon={faBug}/></span>Debug</div>
        <div><span style={{ color: "red" }}><FontAwesomeIcon size="sm" icon={faStop}/></span>Stop</div>
        <div><span><FontAwesomeIcon size="sm" icon={faCode}/></span>JSON</div>
      </div>
    </div>
  </Fragment>;
}

function EditorRightSidebar() {
  return <Fragment>
    <div className={"sidebar-right noselect"}>
      <div className={"rotate-right"}>
        <div><span><FontAwesomeIcon size="sm" icon={faCog}/></span>Maven</div>
        <div><span><FontAwesomeIcon size="sm" icon={faCog}/></span>Gradle</div>
      </div>
    </div>
  </Fragment>;
}

function EditorLeftSidebar() {

  const [componentSidebar, setComponentSidebar] = useState(false);
  const [projectSidebar, setProjectSidebar] = useState(false);

  const leftSideDrawersSetters = [setComponentSidebar, setProjectSidebar];


  return <Fragment>
    <div className={"sidebar-left noselect"}>
      <div className={"rotate-left"}>
        <div  style={{backgroundColor: projectSidebar ? "#BDBDBD" : ""}} onClick={e => {
          closeAllSideDrawer(leftSideDrawersSetters);
          setProjectSidebar(!projectSidebar);
        }}><span><FontAwesomeIcon size="sm" icon={faAlignJustify}/></span>Project
        </div>
        <div style={{backgroundColor: componentSidebar ? "#BDBDBD" : ""}} onClick={e => {
          closeAllSideDrawer(leftSideDrawersSetters);
          setComponentSidebar(!componentSidebar);
        }}><span><FontAwesomeIcon size="sm" icon={faFolder}/></span>Components
        </div>
      </div>
    </div>


    {/*<Resizable className={"mypopup"} style={{position: "absolute"}} defaultSize={{*/}
    {/*  height: "90vh",*/}
    {/*}} >*/}
    {/*    <h3>Popup title</h3>*/}
    {/*    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
    {/*    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
    {/*</Resizable>*/}
    {componentSidebar && <div className="left-side-drawer">
      <h3>Components</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
    {projectSidebar && <div className="left-side-drawer">
      <h3>Projects</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
  </Fragment>;
}

function EditorFooter() {
  const [statusFooter, setStatusFooter] = useState(false);
  const [warningErrorFooter, setWarningErrorFooter] = useState(false);
  const [statisticsFooter, setStatisticsFooter] = useState(false);
  const [controlFlowFooter, setControlFlowFooter] = useState(false);

  const footerDrawersSetters = [setStatusFooter, setWarningErrorFooter, setStatisticsFooter, setControlFlowFooter];

  return <Fragment>
    <div className={"footer noselect"}>
      <div  style={{backgroundColor: statusFooter ? "#BDBDBD" : ""}}  onClick={e => {
        closeAllSideDrawer(footerDrawersSetters);
        setStatusFooter(!statusFooter);
      }}><span><FontAwesomeIcon size="sm" icon={faCheck}/></span>Status
      </div>
      <div  style={{backgroundColor: warningErrorFooter ? "#BDBDBD" : ""}} onClick={e => {
        closeAllSideDrawer(footerDrawersSetters);
        setWarningErrorFooter(!warningErrorFooter);
      }}><span><FontAwesomeIcon size="sm" icon={faExclamationTriangle}/></span>Warning &amp; Errors
      </div>
      <div  style={{backgroundColor: statisticsFooter ? "#BDBDBD" : ""}} onClick={e => {
        closeAllSideDrawer(footerDrawersSetters);
        setStatisticsFooter(!statisticsFooter);
      }}><span><FontAwesomeIcon size="sm" icon={faChartBar}/></span>Statistics
      </div>
      <div  style={{backgroundColor: controlFlowFooter ? "#BDBDBD" : ""}} onClick={e => {
        closeAllSideDrawer(footerDrawersSetters);
        setControlFlowFooter(!controlFlowFooter);
      }}><span><FontAwesomeIcon size="sm" icon={faWind}/></span>Control Flow
      </div>
    </div>
    {statusFooter && <div className="bottom-footer-drawer">
      <h3>Status</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
    {warningErrorFooter && <div className="bottom-footer-drawer">
      <h3>Warning &amp; Errors</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
    {statisticsFooter && <div className="bottom-footer-drawer">
      <h3>Statistics</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
    {controlFlowFooter && <div className="bottom-footer-drawer">
      <h3>Control Flow</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.</p>
    </div>}
  </Fragment>;
}

render(<App/>, document.getElementById("root"));
;
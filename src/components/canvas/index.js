import {select, event, mouse, touches}  from 'd3';

const d3 = {select, event, mouse, touches}

export default class Canvas {
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
      //TODO: check why below is now causing erroo
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

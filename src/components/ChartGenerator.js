import * as d3 from 'd3';
// import { CANVAS_STATUS } from "./types";
import { store } from './../store';
import { contentAreaWorkspaceCanvasAddNode, contentAreaWorkspaceCanvasUpdateNode } from './../actions/contentArea';
import { CANVAS_STATUS } from './../types';
import { FillColor, StrokeColor } from './../utils/color';

function ChartGenerator(graphId, chartRef, canvasWidth, canvasHeight, gridSize = 20) {
  console.log("Chart initialized")
  this.PORT_TYPE_INPUT = 1;
  this.PORT_TYPE_OUTPUT = 0;

  this.graphId = graphId;
  this.svgRef = chartRef.current;

  this.scaleFactor = 1;
  this.mouse_mode = CANVAS_STATUS.DEFAULT;
  this.lasso = null;
  this.mouse_position = null;

  this.lineCurveScale = 0.75;

  this.node_width = 120;
  this.node_height = 36;

  this.mousedown_node = null;
  this.mousedown_port_type = null;
  this.mousedown_port_index = null;

  this.mouseup_node = null;
  this.mousedown_link = null;

  this.activeSpliceLink = null;
  this.showAllLinkPorts = -1;
  this.spliceActive = false;
  this.spliceTimer = null;
  this.activeSubflow = null;

  this.touchStartTime = 0;
  this.ghostNode = null;
  this.quickAddLink = null;

  this.canvasWidth = 1500;
  this.canvasHeight = 800;
  this.gridSize = gridSize;

  this.moving_set = [];

  this.activeNodes = [];
  this.activeLinks = [];

  const that = this;

  this.outer = d3.select(this.svgRef)
    .append('svg')
    .attr('class', 'outerCanvas')
    .attr('width', this.canvasWidth)
    .attr('height', this.canvasHeight)
    // .attr('width', 1300)
    // .attr('height', 900)
    // .attr("pointer-events", "all")
    .style('cursor', 'crosshair')
    .on('contextmenu', function() {
      //TODO: add context menu thingy for future
      d3.event.preventDefault();
    });

  this.vis = this.outer.append('g')
    .on('dblclick.zoom', null)
    .append('g')
    .attr('class', 'innerCanvas')
    .on('mousemove', function() {

      that.mouse_position = d3.touches(this)[0] || d3.mouse(this);

      if (that.lasso) {
        let ox = parseInt(that.lasso.attr("ox"));
        let oy = parseInt(that.lasso.attr("oy"));
        let x = parseInt(that.lasso.attr("x"));
        let y = parseInt(that.lasso.attr("y"));
        let w;
        let h;
        if (that.mouse_position[0] < ox) {
          x = that.mouse_position[0];
          w = ox - x;
        } else {
          w = that.mouse_position[0] - x;
        }
        if (that.mouse_position[1] < oy) {
          y = that.mouse_position[1];
          h = oy - y;
        } else {
          h = that.mouse_position[1] - y;
        }
        that.lasso
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h)
        ;
        return;
      }

      if (that.mouse_mode === CANVAS_STATUS.JOINING) {

        if (that.drag_lines.length === 0 && that.mousedown_port_type !== null) {
          if (that.mousedown_node && !that.quickAddLink) {
            that.showDragLines([{
              node: that.mousedown_node,
              port: that.mousedown_port_index,
              portType: that.mousedown_port_type
            }]);
          }
          that.selected_link = null;
        }

        let mousePos = that.mouse_position;

        for (let i = 0; i < that.drag_lines.length; i++) {
          let drag_line = that.drag_lines[i];
          var numOutputs = (drag_line.portType === that.PORT_TYPE_OUTPUT) ? (drag_line.node.outputs || 1) : 1;
          let sourcePort = drag_line.port;
          let portY = -((numOutputs - 1) / 2) * 13 + 13 * sourcePort;

          let sc = (drag_line.portType === that.PORT_TYPE_OUTPUT) ? 1 : -1;
          drag_line.el.attr('d', that.generateLinkPath((drag_line.node.x + sc * drag_line.node.w / 2) + drag_line.node.w / 2, drag_line.node.y + (that.node_height / 2), mousePos[0], mousePos[1], sc));
        }
        d3.event.preventDefault();
      }

      if (that.mouse_mode !== CANVAS_STATUS.DEFAULT) {
        that.redraw();
      }

    })
    .on('mousedown', function() {
      let point = d3.mouse(this);

      that.lasso = that.vis.append("rect")
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
    .on('mouseup', function() {
      if (that.lasso) {
        let x = parseInt(that.lasso.attr("x"));
        let y = parseInt(that.lasso.attr("y"));
        let x2 = x + parseInt(that.lasso.attr("width"));
        let y2 = y + parseInt(that.lasso.attr("height"));

        console.log(x , y , x2, y2)
        // TODO : Add logic to get all the nodes to that are there in the range
        that.lasso.remove();
        that.lasso = null;
      }
    })
    .on('mouseenter', function() {
      console.log('canvas-mouseenter');
    })
    .on("mouseleave",function (d) {
        if (that.lasso) {
          that.lasso.remove();
          that.lasso = null;
        }
      })

  this.outer_background = this.vis.append('rect')
    .attr('width', this.canvasWidth)
    .attr('height', this.canvasHeight)
    .attr('fill', '#fff');

  // Adding grid lines

  this.updateGrid(this.vis.append('g'));

  this.linkLayer = this.vis.append('g');
  this.dragGroup = this.vis.append('g');
  this.nodeLayer = this.vis.append('g');
  this.miniMapLayer = this.vis.append('g');
  this.drag_lines = [];
}

/**
 * This function takes care of converting px to svg coordinates
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
ChartGenerator.prototype.convertDomToSvgCoordinate = function(x, y) {
  let node = d3.select('#chart>svg').node();
  let svgRect = node.createSVGPoint();
  console.log(x,y)
  svgRect.x = x;
  svgRect.y = y;

  const _svgRect = svgRect.matrixTransform(node.getScreenCTM().inverse());

  return {
    x: _svgRect.x,
    y: _svgRect.y
  };
};

ChartGenerator.prototype.canvasMouseMove = function() {
  // console.log("canvas-mousemove");
  let i;
  this.mouse_position = [d3.event.pageX, d3.event.pageY];

  if (this.mouse_mode !== CANVAS_STATUS.QUICK_JOINING
    && this.mouse_mode !== CANVAS_STATUS.IMPORT_DRAGGING
    && !this.mousedown_node && this.selected_link == null) {
    return;
  }

  let mousePos;

  if (this.mouse_mode === CANVAS_STATUS.JOINING || this.mouse_mode === CANVAS_STATUS.QUICK_JOINING) {

    if (this.drag_lines.length === 0 && this.mousedown_port_type !== null) {
      if (this.mousedown_node && !this.quickAddLink) {
        this.showDragLines([{
          node: this.mousedown_node,
          port: this.mousedown_port_index,
          portType: this.mousedown_port_type
        }]);
      }
      this.selected_link = null;
    }
    mousePos = this.mouse_position;
    for (i = 0; i < this.drag_lines.length; i++) {

      let drag_line = this.drag_lines[i];
      let numOutputs = (drag_line.portType === this.PORT_TYPE_OUTPUT) ? (drag_line.node.outputs || 1) : 1;
      let sourcePort = drag_line.port;
      let portY = -((numOutputs - 1) / 2) * 13 + 13 * sourcePort;

      let sc = (drag_line.portType === this.PORT_TYPE_OUTPUT) ? 1 : -1;
      drag_line.el.attr('d', this.generateLinkPath(drag_line.node.x + sc * drag_line.node.w / 2, drag_line.node.y + portY, mousePos[0], mousePos[1], sc));
    }
    d3.event.preventDefault();
  }

  if (this.mouse_mode !== 0) {
    this.redraw();
  }

};

ChartGenerator.prototype.clearSelection = function() {
  for (let i = 0; i < this.moving_set.length; i++) {
    let n = this.moving_set[i];
    n.n.dirty = true;
    n.n.selected = false;
  }
  this.moving_set = [];
  this.selected_link = null;
};

ChartGenerator.prototype.resetMouseVars = function() {
  this.mousedown_node = null;
  this.mouseup_node = null;
  this.mousedown_link = null;
  this.mouse_mode = CANVAS_STATUS.DEFAULT;
  this.mousedown_port_type = null;
  this.activeSpliceLink = null;
  this.spliceActive = false;

  d3.select('.link_splice').classed('link_splice', false);
  if (this.spliceTimer) {
    clearTimeout(this.spliceTimer);
    this.spliceTimer = null;
  }
};

ChartGenerator.prototype.setActiveNodes = function(activeNodes) {
  this.activeNodes = activeNodes;
};

ChartGenerator.prototype.setActiveLinks = function(activeLinks) {
  const that = this;
  activeLinks.map(x => {

    for (let i = 0; i < that.activeNodes.length; i++) {
      if (x.source.id === that.activeNodes[i].id) {
        delete x.source;
        x.source = that.activeNodes[i];
      }
      if (x.target.id === that.activeNodes[i].id) {
        delete x.target;
        x.target = that.activeNodes[i];
      }
    }
  });

  this.activeLinks = activeLinks;

};

ChartGenerator.prototype.addNodeToCanvas = function(nodetype, _x, _y) {

  let { x, y } = this.convertDomToSvgCoordinate(_x, _y);

  const id = (1 + Math.random() * 4294967295).toString(16);
  let add = {
    id,
    nodetype,
    x,
    y,
    inputs: 1,
    outputs: 1,
    changed: false,
    dirty: false,
    valid: true,
    selected: false
  };

  this.activeNodes.push(add);

  store.dispatch(contentAreaWorkspaceCanvasAddNode({ id: this.graphId, nodeData: add }));
  this.redraw();
};

ChartGenerator.prototype.updateGrid = function(grid) {

  let gridTicks = [];
  for (let i = 0; i < this.canvasWidth; i += +this.gridSize) {
    gridTicks.push(i);
  }

  grid.selectAll('line.horizontal').remove();

  grid.selectAll('line.horizontal')
    .data(gridTicks)
    .enter()
    .append('line')
    .attr('class', 'horizontal')
    .attr('x1', 0)
    .attr('x2', this.canvasWidth)
    .attr('y1', d => d)
    .attr('y2', d => d)
    .attr('fill', 'none')
    .attr('shape-rendering', 'crispEdges')
    .attr('stroke', '#eee')
    .attr('stroke-width', '1px');

  grid.selectAll('line.vertical').remove();
  grid.selectAll('line.vertical').data(gridTicks).enter()
    .append('line')
    .attr('class', 'vertical')
    .attr('y1', 0)
    .attr('y2', this.canvasWidth)
    .attr('x1', d => d)
    .attr('x2', d => d)
    .attr('fill', 'none')
    .attr('shape-rendering', 'crispEdges')
    .attr('stroke', '#eee')
    .attr('stroke-width', '1px');
};

ChartGenerator.prototype.redraw = function() {
  let that = this;
  console.log("Redraw initiated")
  // console.log('-------------------------');
  // console.log(that.activeLinks);
  // console.log('-------------------------');

  // this.vis.attr("transform", d3.event.transform );
  this.outer.attr('width', this.canvasWidth * this.scaleFactor).attr('height', this.canvasHeight * this.scaleFactor);

  const node = this.nodeLayer.selectAll('.nodegroup')
    .data(this.activeNodes, function(d) {
      return d.id;
    });

  node.exit().remove();

  const nodeEnter = node.enter()
    .insert('svg:g')
    .attr('class', 'node nodegroup');
  // .classed('node_link', function(d) {
  //   return d.type === 'link in' || d.type === 'link out';
  // });

  nodeEnter.attr('id', d => d.id)
    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .on('dblclick', function() {

      //TODO: add properties popup.. Similar to airflow output
      //
      // store.dispatch(nodeDoubleClickPopup(d))
    })

    //TODO: node.each loop to clicl selector
    //
    .on('click', function(d) {
      d.selected = !d.selected;
    });

  nodeEnter.append('rect')
    .attr('class', 'node')
    .classed('node_unknown', function(d) {
      return d.nodetype === 'unknown';
    })
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', function(d) {
      return FillColor(d.nodetype);
    })
    .attr("stroke-width", function(d) {
      if(d.selected){
        return 2;
      }
      else return 1;
    })
    .attr('stroke', function(d) {
      if(d.selected){
        return "#ff7f0e"
      }
      else return StrokeColor(d.nodetype);
    })
    .attr('height', function(d) {
      d.h = that.node_height;
      return d.h;
    })
    // TODO: revisit length logic
    .attr('width', function(d) {
      d.w = that.calculateTextWidth(d.nodetype, 'node_label', 10) + 10;
      return d.w;
    });

  nodeEnter.append('text')
    .attr('class', 'node_label')
    .attr('x', 10)
    .attr('y', 16)
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .text(d => d.nodetype);

  let nodePortInput = nodeEnter.append('g')
    .attr('class', 'port_input')
    .attr('transform', d => 'translate(-5,' + ((d.h / 2) - 5) + ')');

  nodePortInput.append('rect')
    .attr('class', 'port')
    .attr('rx', '3')
    .attr('ry', '3')
    .attr('width', '10')
    .attr('height', '10')
    .on('mousedown', function(d, i) {
      console.log('input-port-mouse-down' + i);
      that.portMouseDown(d, that.PORT_TYPE_INPUT, i);
    })
    .on('mouseup', function(d, i) {
      console.log('input-port-mouse-mouseup');
      that.portMouseUp(d, that.PORT_TYPE_INPUT, 0);
    })
    .on('mousedown', function(d, i) {
      that.portMouseDown(d, that.PORT_TYPE_INPUT, 0);
    })
    .on('mouseover', function(d) {
      console.log('input-port-mouse-mouseover');
      that.portMouseOver(d3.select(this), d, that.PORT_TYPE_INPUT, 0);
    })
    .on('mouseout', function(d) {
      console.log('input-port-mouse-mouseout');
      that.portMouseOut(d3.select(this), d, that.PORT_TYPE_INPUT, 0);
    });

  let nodePortOutput = nodeEnter.append('g')
    .attr('class', 'port_output')
    // .attr("transform", "translate(115,10)")
    .attr('transform', function(d) {
      let i = 0;
      let y = (d.h / 2);
      /*-((numOutputs-1)/2)*13*/
      let x = d.w - 5;
      return 'translate(' + x + ',' + ((y + 13 * i) - 5) + ')';
    });

  nodePortOutput.append('rect')
    .attr('class', 'port')
    .attr('rx', '3')
    .attr('ry', '3')
    .attr('width', '10')
    .attr('height', '10')
    .on('mousedown', function(d, j) {
      console.log('output-port-mouse-down' + j);
      that.portMouseDown(d, that.PORT_TYPE_OUTPUT, 0);
    })
    .on('mouseup', function(d) {
      that.portMouseUp(d, that.PORT_TYPE_OUTPUT, 0);
    })
    .on('mouseover', function(d) {
      that.portMouseOver(d3.select(this), d, that.PORT_TYPE_OUTPUT, 0);
    })
    .on('mouseout', function(d) {
      that.portMouseOut(d3.select(this), d, that.PORT_TYPE_OUTPUT, 0);
    });


  function dragstarted(d) {
    d3.select(this).raise().classed('active', true);
  }

  function dragged(d) {
    this.x = this.x || d.x;
    this.y = this.y || d.y;
    this.x += d3.event.dx;
    this.y += d3.event.dy;

    d3.select(this).attr('transform', 'translate(' + this.x + ',' + this.y + ')');

    that.activeNodes = that.activeNodes.map(a => {
      if (a.id === d.id) {
        a.x = this.x;
        a.y = this.y;
      }
      return a;
    });

    store.dispatch(contentAreaWorkspaceCanvasUpdateNode({ id: that.graphId, nodeData: that.activeNodes, linkData: that.activeLinks }));
    that.redraw();
  }

  function dragended(d) {
    d3.select(this).classed('active', false);
  }

  let link = that.linkLayer.selectAll('path').data(that.activeLinks);

  link.exit().remove()

  link.transition().duration(500).attr('class', 'link').attr('class', 'link_background link_path').attr('d', function(_d) {
    var numOutputs = _d.source.outputs || 1;
    var sourcePort = _d.sourcePort || 0;
    var y = -((numOutputs - 1) / 2) * 13 + 13 * sourcePort;
    _d.x1 = _d.source.x + _d.source.w;
    _d.y1 = _d.source.y + _d.source.h / 2;
    _d.x2 = _d.target.x;
    _d.y2 = _d.target.y + _d.target.h / 2;

    // return "M "+d.x1+" "+d.y1+
    //     " C "+(d.x1+scale*node_width)+" "+(d.y1+scaleY*node_height)+" "+
    //     (d.x2-scale*node_width)+" "+(d.y2-scaleY*node_height)+" "+
    //     d.x2+" "+d.y2;
    console.log(_d)
    var path = that.generateLinkPath(_d.x1, _d.y1, _d.x2, _d.y2, 1);

    // that.generateLinkPath((drag_line.node.x + sc * drag_line.node.w / 2) + drag_line.node.w / 2, drag_line.node.y + (that.node_height / 2), mousePos[0], mousePos[1], sc));

    if (/NaN/.test(path)) {
      return '';
    }
    return path;
  });

  // let linkEnter = link.enter().append("path").attr('class', 'link').attr('class', 'link_background link_path')

  // var links = that.linkLayer.selectAll('.link_path');

  // links.each(function(_d) {

    // var link = d3.select(this);
    // if (_d.added || _d === that.selected_link || _d.selected) {
    //   if (/link_line/.test(link.attr('class'))) {
    //     link.classed('link_subflow', function(_d) {
    //       return !_d.link;
    //     });
    //   }
  link.enter().append("path").attr('class', 'link').attr('class', 'link_background link_path')
      .attr('d', function(_d) {
        var numOutputs = _d.source.outputs || 1;
        var sourcePort = _d.sourcePort || 0;
        var y = -((numOutputs - 1) / 2) * 13 + 13 * sourcePort;
        _d.x1 = _d.source.x + _d.source.w;
        _d.y1 = _d.source.y + _d.source.h / 2;
        _d.x2 = _d.target.x;
        _d.y2 = _d.target.y + _d.target.h / 2;

        // return "M "+d.x1+" "+d.y1+
        //     " C "+(d.x1+scale*node_width)+" "+(d.y1+scaleY*node_height)+" "+
        //     (d.x2-scale*node_width)+" "+(d.y2-scaleY*node_height)+" "+
        //     d.x2+" "+d.y2;
        var path = that.generateLinkPath(_d.x1, _d.y1, _d.x2, _d.y2, 1);

        // that.generateLinkPath((drag_line.node.x + sc * drag_line.node.w / 2) + drag_line.node.w / 2, drag_line.node.y + (that.node_height / 2), mousePos[0], mousePos[1], sc));

        if (/NaN/.test(path)) {
          return '';
        }
        return path;
      });
  //   }
  // });

  link.classed('link_selected', function(d) {
    return d === that.selected_link || d.selected;
  });
  // this.miniMapDraw()
};

ChartGenerator.prototype.miniMapDraw = function() {

  let miniMap = this.miniMapLayer.attr('class', 'minimapMain')
    .append('svg')
    .attr('width', '19.5%')
    .attr('height', '20%')
    .attr('x', '80%')
    .attr('y', '80%');

  miniMap.append('rect')
    .attr('class', 'minimap-background')
    .style('fill', '#DDD')
    .style('fill-opacity', '0.5')
    .attr('height', '100%')
    .attr('width', '100%');

  let contents = miniMap
    .append('svg')
    .attr('class', 'minimap')
    .append('g')
    .attr('class', 'contents')
    .append('rect')
    .attr('class', 'viewfinder')
    .attr('stroke', 'black')
    .attr('fill', 'black')
    .attr('opacity', 0.1);

  d3.selectAll('.nodegroup').each(function(d) {

    miniMap.select('.contents').node().appendChild(this.cloneNode(true));

  });

  miniMap.select('.minimap').attr('viewBox', (d3.select('.contents').node().getBBox().x - 50) + ' ' +
    (d3.select('.contents').node().getBBox().y - 50) + ' ' +
    (d3.select('.contents').node().getBBox().width + 100) + ' ' +
    (d3.select('.contents').node().getBBox().height + 100)
  );

  contents.select('.viewfinder').attr('x', d3.select('.contents').node().getBBox().x)
    .attr('y', d3.select('.contents').node().getBBox().y)
    .attr('width', d3.select('.contents').node().getBBox().width)
    .attr('height', d3.select('.contents').node().getBBox().height);

};

// Action on pressing cursor down on port
ChartGenerator.prototype.portMouseDown = function(d, portType, portIndex) {
  console.log('portMouseDown ' + portType);
  if (d3.event.button === 1) {
    return;
  }

  this.mousedown_node = d;
  this.mousedown_port_type = portType;
  this.mousedown_port_index = portIndex;

  if (this.mouse_mode !== CANVAS_STATUS.QUICK_JOINING) {
    this.mouse_mode = CANVAS_STATUS.JOINING;
    document.body.style.cursor = 'crosshair';

    if (d3.event.ctrlKey || d3.event.metaKey) {
      this.mouse_mode = CANVAS_STATUS.QUICK_JOINING;
      this.showDragLines([{
        node: this.mousedown_node,
        port: this.mousedown_port_index,
        portType: this.mousedown_port_type
      }]);
    }
  }
  d3.event.stopPropagation();
  d3.event.preventDefault();
};

ChartGenerator.prototype.portMouseUp = function(d, portType, portIndex) {

  const that = this;
  let i;
  if (this.mouse_mode === CANVAS_STATUS.QUICK_JOINING && this.drag_lines.length > 0) {
    if (this.drag_lines[0].node === d) {
      // Cannot quick-join to self
      return;
    }
    if (this.drag_lines[0].virtualLink &&
      (
        (this.drag_lines[0].node.type === 'link in' && d.type !== 'link out') ||
        (this.drag_lines[0].node.type === 'link out' && d.type !== 'link in')
      )
    ) {
      return;
    }
  }

  document.body.style.cursor = '';

  if (this.mouse_mode === CANVAS_STATUS.JOINING || this.mouse_mode === CANVAS_STATUS.QUICK_JOINING) {
    if (typeof TouchEvent !== 'undefined' && d3.event instanceof TouchEvent) {
      this.activeNodes.forEach(function(n) {

        let hw = n.w / 2;
        let hh = n.h / 2;
        // console.log(hw, hh);
        if (n.x - hw < this.mouse_position[0] && n.x + hw > this.mouse_position[0] &&
          n.y - hh < this.mouse_position[1] && n.y + hh > this.mouse_position[1]) {
          that.mouseup_node = n;
          portType = that.mouseup_node.inputs > 0 ? that.PORT_TYPE_INPUT : that.PORT_TYPE_OUTPUT;
          portIndex = 0;
        }

      });
    } else {
      that.mouseup_node = d;
    }
    let addedLinks = [];
    let removedLinks = [];
    let modifiedNodes = []; // joining link nodes

    var select_link = null;

    for (i = 0; i < this.drag_lines.length; i++) {
      if (this.drag_lines[i].link) {
        removedLinks.push(this.drag_lines[i].link);
      }
    }
    var linkEditEvents = [];

    for (i = 0; i < this.drag_lines.length; i++) {
      if (portType !== this.drag_lines[i].portType && this.mouseup_node !== this.drag_lines[i].node) {
        var drag_line = this.drag_lines[i];
        var src, dst, src_port;
        if (drag_line.portType === this.PORT_TYPE_OUTPUT) {
          src = drag_line.node;
          src_port = drag_line.port;
          dst = this.mouseup_node;
        } else if (drag_line.portType === this.PORT_TYPE_INPUT) {
          src = this.mouseup_node;
          dst = drag_line.node;
          src_port = portIndex;
        }
        var link = { source: src, sourcePort: src_port, target: dst };
        // console.log(link);
        if (!(
          (d.type === 'link out' && portType === that.PORT_TYPE_OUTPUT) ||
          (d.type === 'link in' && portType === that.PORT_TYPE_INPUT)
        )) {
          // addedLinks.push(link);
          that.activeLinks.push(link);
          that.mouse_mode = CANVAS_STATUS.DEFAULT;
          console.log(d);
          store.dispatch(contentAreaWorkspaceCanvasUpdateNode({ id: that.graphId, nodeData: that.activeNodes, linkData: that.activeLinks }));
          that.redraw();
        }
      }
    }

    // if (addedLinks.length > 0 || removedLinks.length > 0 || modifiedNodes.length > 0) {
    //   that.updateActiveNodes();
    // }

    if (this.mouse_mode === CANVAS_STATUS.QUICK_JOINING) {
      if (addedLinks.length > 0 || modifiedNodes.length > 0) {
        this.hideDragLines();
        if (portType === this.PORT_TYPE_INPUT && d.outputs > 0) {
          this.showDragLines([{ node: d, port: 0, portType: this.PORT_TYPE_OUTPUT }]);
        } else if (portType === this.PORT_TYPE_OUTPUT && d.inputs > 0) {
          this.showDragLines([{ node: d, port: 0, portType: this.PORT_TYPE_INPUT }]);
        } else {
          this.resetMouseVars();
        }
        this.selected_link = select_link;
        this.mousedown_link = select_link;

      }
      this.redraw();
      return;
    }

    this.resetMouseVars();
    this.hideDragLines();
    this.selected_link = select_link;
    this.mousedown_link = select_link;

    this.redraw();
  }
};
ChartGenerator.prototype.portMouseOut = function(port, d, portType, portIndex) {
  port.classed('port_hovered', false);
};

ChartGenerator.prototype.portMouseOver = function(port, d, portType, portIndex) {
  console.log('port-mouseover');

  let active = (this.mouse_mode !== CANVAS_STATUS.JOINING && this.mouse_mode !== CANVAS_STATUS.QUICK_JOINING) || // Not currently joining - all ports active
    (
      this.drag_lines.length > 0 && // Currently joining
      this.drag_lines[0].portType !== portType && // INPUT->OUTPUT OUTPUT->INPUT
      (
        !this.drag_lines[0].virtualLink || // Not a link wire
        (this.drag_lines[0].node.type === 'link in' && d.type === 'link out') ||
        (this.drag_lines[0].node.type === 'link out' && d.type === 'link in')
      )
    );

  port.classed('port_hovered', active);
};

ChartGenerator.prototype.calculateTextWidth = function(str, className, offset) {
  return this.calculateTextDimensions(str, className, offset, 0)[0];
};

ChartGenerator.prototype.showDragLines = function(nodes) {

  this.showAllLinkPorts = -1;
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    node.el = this.dragGroup.append('svg:path').attr('class', 'drag_line');
    if ((node.node.type === 'link out' && node.portType === this.PORT_TYPE_OUTPUT) ||
      (node.node.type === 'link in' && node.portType === this.PORT_TYPE_INPUT)) {
      node.el.attr('class', 'link_link drag_line');
      node.virtualLink = true;
      this.showAllLinkPorts = (node.portType === this.PORT_TYPE_OUTPUT) ? this.PORT_TYPE_INPUT : this.PORT_TYPE_OUTPUT;
    }
    this.drag_lines.push(node);
  }
  if (this.showAllLinkPorts !== -1) {
    this.activeNodes.forEach(function(n) {
      if (n.type === 'link in' || n.type === 'link out') {
        n.dirty = true;
      }
    });
  }
};

ChartGenerator.prototype.hideDragLines = function() {
  if (this.showAllLinkPorts !== -1) {
    this.activeNodes.forEach(function(n) {
      if (n.type === 'link in' || n.type === 'link out') {
        n.dirty = true;
      }
    });
  }
  this.showAllLinkPorts = -1;
  while (this.drag_lines.length) {
    let line = this.drag_lines.pop();
    if (line.el) {
      line.el.remove();
    }
  }
};

ChartGenerator.prototype.calculateTextDimensions = function(str, className, offsetW, offsetH) {
  let sp = document.createElement('span');
  sp.className = className;
  sp.style.position = 'absolute';
  sp.style.top = '-1000px';
  sp.textContent = (str || '');
  document.body.appendChild(sp);
  let w = sp.offsetWidth;
  let h = sp.offsetHeight;
  document.body.removeChild(sp);
  return [offsetW + w, offsetH + h];
};

ChartGenerator.prototype.canvasMouseDown = function() {
  let that = this;
  this.mouse_mode = CANVAS_STATUS.DEFAULT;

  let point;

  if (d3.event.button === 1) {
    // Middle Click pan
    this.mouse_mode = CANVAS_STATUS.PANNING;
    this.mouse_position = [d3.event.pageX, d3.event.pageY];
    // this.scroll_position = [chart.scrollLeft(),chart.scrollTop()];
    return;
  }
  if (!this.mousedown_node && !this.mousedown_link) {
    this.selected_link = null;
    // this.updateSelection(); //TODO: Fix this
  }
  if (this.mouse_mode === CANVAS_STATUS.DEFAULT) {
    if (this.lasso) {
      this.lasso.remove();
      this.lasso = null;
    }
  }

  if (this.mouse_mode === CANVAS_STATUS.DEFAULT || this.mouse_mode === CANVAS_STATUS.QUICK_JOINING) {
    if (d3.event.metaKey || d3.event.ctrlKey) {
      point = d3.mouse(this);
      let ox = point[0];
      let oy = point[1];

      d3.event.stopPropagation();

      if (this.mouse_mode !== CANVAS_STATUS.QUICK_JOINING) {
        this.mouse_mode = CANVAS_STATUS.QUICK_JOINING;
      }
      this.quickAddActive = true;

      if (this.ghostNode) {
        this.ghostNode.remove();
      }
      this.ghostNode = this.vis.append('g').attr('transform', 'translate(' + (point[0] - this.node_width / 2) + ',' + (point[1] - this.node_height / 2) + ')');

      this.ghostNode.append('rect')
        .attr('class', 'node_placeholder')
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', this.node_width)
        .attr('height', this.node_height)
        .attr('fill', 'none');

      let filter = undefined;
      if (this.drag_lines.length > 0) {
        if (this.drag_lines[0].virtualLink) {
          filter = { type: this.drag_lines[0].node.type === 'link in' ? 'link out' : 'link in' };
        } else if (this.drag_lines[0].portType === this.PORT_TYPE_OUTPUT) {
          filter = { input: true };
        } else {
          filter = { output: true };
        }

        this.quickAddLink = {
          node: this.drag_lines[0].node,
          port: this.drag_lines[0].port,
          portType: this.drag_lines[0].portType
        };
        if (this.drag_lines[0].virtualLink) {
          this.quickAddLink.virtualLink = true;
        }
        this.hideDragLines();
      }
      let rebuildQuickAddLink = function() {
        if (!that.quickAddLink) {
          return;
        }
        if (!that.quickAddLink.el) {
          that.quickAddLink.el = this.dragGroup.append('svg:path').attr('class', 'drag_line');
        }
        var numOutputs = (that.quickAddLink.portType === that.PORT_TYPE_OUTPUT) ? (that.quickAddLink.node.outputs || 1) : 1;
        var sourcePort = that.quickAddLink.port;
        var portY = -((numOutputs - 1) / 2) * 13 + 13 * sourcePort;
        var sc = (that.quickAddLink.portType === that.PORT_TYPE_OUTPUT) ? 1 : -1;
        that.quickAddLink.el.attr('d', this.generateLinkPath(that.quickAddLink.node.x + sc * that.quickAddLink.node.w / 2, that.quickAddLink.node.y + portY, point[0] - sc * this.node_width / 2, point[1], sc));
      };
      if (this.quickAddLink) {
        rebuildQuickAddLink();
      }

      // this.updateActiveNodes();
      this.redraw();
    }
  }
  if (this.mouse_mode === CANVAS_STATUS.DEFAULT && !(d3.event.metaKey || d3.event.ctrlKey)) {

    if (!this.touchStartTime) {
      point = d3.mouse(this);

      this.lasso = this.vis.append('rect')
        .attr('ox', point[0])
        .attr('oy', point[1])
        .attr('rx', 1)
        .attr('ry', 1)
        .attr('x', point[0])
        .attr('y', point[1])
        .attr('width', 0)
        .attr('height', 0)
        .attr('class', 'lasso');
      d3.event.preventDefault();
    }
  }
};

ChartGenerator.prototype.generateLinkPath = function(origX, origY, destX, destY, sc) {

  let node_width = this.node_width;
  let node_height = this.node_height;

  let dy = destY - origY;
  let dx = destX - origX;
  let delta = Math.sqrt(dy * dy + dx * dx);
  let scale = this.lineCurveScale;
  let scaleY = 0;
  if (dx * sc > 0) {
    if (delta < node_width) {
      scale = 0.75 - 0.75 * ((node_width - delta) / node_width);
    }
  } else {
    scale = 0.4 - 0.2 * (Math.max(0, (node_width - Math.min(Math.abs(dx), Math.abs(dy))) / node_width));
  }
  if (dx * sc > 0) {
    return 'M ' + origX + ' ' + origY +
      ' C ' + (origX + sc * (node_width * scale)) + ' ' + (origY + scaleY * node_height) + ' ' +
      (destX - sc * (scale) * node_width) + ' ' + (destY - scaleY * node_height) + ' ' +
      destX + ' ' + destY;
  } else {

    let midX = Math.floor(destX - dx / 2);
    let midY = Math.floor(destY - dy / 2);
    //
    if (dy === 0) {
      midY = destY + node_height;
    }
    let cp_height = node_height / 2;
    let y1 = (destY + midY) / 2;
    let topX = origX + sc * node_width * scale;
    let topY = dy > 0 ? Math.min(y1 - dy / 2, origY + cp_height) : Math.max(y1 - dy / 2, origY - cp_height);
    let bottomX = destX - sc * node_width * scale;
    let bottomY = dy > 0 ? Math.max(y1, destY - cp_height) : Math.min(y1, destY + cp_height);
    let x1 = (origX + topX) / 2;
    let scy = dy > 0 ? 1 : -1;
    let cp = [
      // Orig -> Top
      [x1, origY],
      [topX, dy > 0 ? Math.max(origY, topY - cp_height) : Math.min(origY, topY + cp_height)],
      // Top -> Mid
      // [Mirror previous cp]
      [x1, dy > 0 ? Math.min(midY, topY + cp_height) : Math.max(midY, topY - cp_height)],
      // Mid -> Bottom
      // [Mirror previous cp]
      [bottomX, dy > 0 ? Math.max(midY, bottomY - cp_height) : Math.min(midY, bottomY + cp_height)],
      // Bottom -> Dest
      // [Mirror previous cp]
      [(destX + bottomX) / 2, destY]
    ];
    if (cp[2][1] === topY + scy * cp_height) {
      if (Math.abs(dy) < cp_height * 10) {
        cp[1][1] = topY - scy * cp_height / 2;
        cp[3][1] = bottomY - scy * cp_height / 2;
      }
      cp[2][0] = topX;
    }
    return 'M ' + origX + ' ' + origY +
      ' C ' +
      cp[0][0] + ' ' + cp[0][1] + ' ' +
      cp[1][0] + ' ' + cp[1][1] + ' ' +
      topX + ' ' + topY +
      ' S ' +
      cp[2][0] + ' ' + cp[2][1] + ' ' +
      midX + ' ' + midY +
      ' S ' +
      cp[3][0] + ' ' + cp[3][1] + ' ' +
      bottomX + ' ' + bottomY +
      ' S ' +
      cp[4][0] + ' ' + cp[4][1] + ' ' +
      destX + ' ' + destY;
  }
};

export default ChartGenerator;


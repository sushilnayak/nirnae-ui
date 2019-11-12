import { scaleOrdinal as d3_scaleOrdinal } from 'd3-scale'
import { hsl as d3_hsl } from 'd3-color'

const ColorSet = ["#8dd3c7",
  "#ffffb3",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffed6f",
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
];

export const componentList = [
  { order: 1,  id: "http-request"   , inPorts: 0 , outPorts: 1, type: "Request" , name: "HTTP Request"  , description: "This component creates a http request based on the data it recieves" },
  { order: 2,  id: "http-response"  , inPorts: 1 , outPorts: 0, type: "Request" , name: "HTTP Response"   , description: "SSHOperator" },
  { order: 3,  id: "mq-send"        , inPorts: 1 , outPorts: 0, type: "MQ" , name: "MQ Sender", description: "PythonOperator" },
  { order: 4,  id: "mq-recieve"     , inPorts: 0 , outPorts: 1, type: "MQ" , name: "MQ Reciever" , description: "DummyOperator" },
  { order: 5,  id: "function"       , inPorts: 1 , outPorts: 1, type: "Singular" , name: "Function", description: "SubDagOperator" },
  { order: 5,  id: "sas"            , inPorts: 1 , outPorts: 1, type: "Analytics" , name: "SAS", description: "This component let's you run SAS code based on data passed by previous node" },
  { order: 6,  id: "excel"          , inPorts: 1 , outPorts: 1, type: "Analytics" , name: "Excel", description: "This component let's you run Excel formulae on data passed by previous node" },
  { order: 7,  id: "truth-table"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Truth Table"   , description: "Truth Table" },
  { order: 8,  id: "statement-rule"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Statement Rule"   , description: "Truth Table" },
  { order: 9,  id: "sequential-rule"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Sequential Rule"   , description: "Truth Table" },
  { order: 10, id: "expression-rule"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Expression Rule"   , description: "Truth Table" },
  { order: 11, id: "matrix-rule"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Matrix Rule"   , description: "Truth Table" },
  { order: 12, id: "tree-rule"    , inPorts: 1 , outPorts: 1, type: "SDS" , name: "Tree Rule"   , description: "Truth Table" },
];

const ColorScale = function(darkness) {
  return d3_scaleOrdinal()
    .domain(componentList.map(operator => operator.id))
    .range(ColorSet.map(function(c) {
      return d3_hsl(c).darker(darkness).toString();
    }));
};

export default ColorScale

export const FillColor = ColorScale(-0.1);
export const StrokeColor = ColorScale(0.7);


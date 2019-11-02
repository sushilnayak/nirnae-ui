import {hsl, scaleOrdinal } from "d3";

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
  "#ffed6f"];

export const componentList = [
  { order: 1, id: "http-request"   , type: "Request" , name: "HTTP Request"  , description: "This component creates a http request based on the data it recieves" },
  { order: 2, id: "http-response"  , type: "Request" , name: "HTTP Response"   , description: "SSHOperator" },
  { order: 3, id: "mq-send"        , type: "MQ" , name: "MQ Sender", description: "PythonOperator" },
  { order: 4, id: "mq-recieve"     , type: "MQ" , name: "MQ Reciever" , description: "DummyOperator" },
  { order: 5, id: "function"       , type: "Singular" , name: "Function", description: "SubDagOperator" },
  { order: 5, id: "sas"       , type: "Analytics" , name: "SAS", description: "This component let's you run SAS code based on data passed by previous node" },
  { order: 6, id: "s3keysensor"    , type: "Multiple" , name: "S3KeySensor"   , description: "S3KeySensor" },
];

const ColorScale = function(darkness) {
  return scaleOrdinal()
    .domain(componentList.map(operator => operator.id))
    .range(ColorSet.map(function(c) {
      return hsl(c).darker(darkness).toString();
    }));
};

export default ColorScale

export const FillColor = ColorScale(-0.1);
export const StrokeColor = ColorScale(0.7);


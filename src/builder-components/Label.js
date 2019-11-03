import React from "react";
import styled from "@emotion/styled";

const div = styled.div`
  display: inline-block;
  min-width: 36px;
  padding: 4.8px 9.996px;
  
`;
export default function Label({ buttonLabel, backgroundColor, color }) {
  return <div style={{
    display: "inline-block",
    minWidth: "36px",
    paddingBottom: "4.8px",
    paddingLeft: "9.996px",
    paddingRight: "9.996px",
    paddingTop: "4.8px",
    cursor: "pointer",
    marginRight: "6px",

    // padding: "10px",
    backgroundColor: `${backgroundColor}`,
    color: `${color}`,
    borderRadius: "4px",
    backgroundImage: "none"
  }}>{buttonLabel}</div>;
}
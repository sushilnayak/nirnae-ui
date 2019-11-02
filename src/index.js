import React from "react";
import { render } from "react-dom";
import "./styles/index.scss";
import { EditorCanvas, EditorFooter, EditorHeader, EditorLeftSidebar, EditorRightSidebar } from "./components/editor";

function App() {
  return <div className={"editor"}>
    <EditorHeader/>
    <EditorLeftSidebar/>
    <EditorCanvas/>
    <EditorRightSidebar/>
    <EditorFooter/>
  </div>;
}

render(<App/>, document.getElementById("root"));

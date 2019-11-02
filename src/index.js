import React, { useState } from "react";
import { render } from "react-dom";
import "./styles/index.scss";
import {
  EditorCanvas,
  EditorFooter,
  EditorHeader,
  EditorLeftSidebar,
  EditorRightSidebar
} from "./components/editor";
import EditorContext, {
  editorContextDefaultValue
} from "./context/EditorContext";

function App() {
  const editorContextState = useState(editorContextDefaultValue);

  return (
    <div className={"editor"}>
      <EditorContext.Provider value={editorContextState}>
        <EditorHeader />
        <EditorLeftSidebar />
        <EditorCanvas />
        <EditorRightSidebar />
        <EditorFooter />
      </EditorContext.Provider>
    </div>
  );
}

render(<App />, document.getElementById("root"));

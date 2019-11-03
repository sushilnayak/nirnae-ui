import React, { useState } from "react";
import EditorContext, { editorContextDefaultValue } from "../../context/EditorContext";
import { EditorCanvas, EditorFooter, EditorHeader, EditorLeftSidebar, EditorRightSidebar } from "./index";

export default function Editor() {

  const editorContextState = useState(editorContextDefaultValue);

  return <div className={"editor"} data-testid={"app-editor"}>
    <EditorContext.Provider value={editorContextState}>
      <EditorHeader/>
      <EditorLeftSidebar/>
      <EditorCanvas/>
      <EditorRightSidebar/>
      <EditorFooter/>
    </EditorContext.Provider>
  </div>;
}

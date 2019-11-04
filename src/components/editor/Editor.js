import React from 'react'
import {EditorContentArea, EditorHeader, EditorLeftSide, EditorRightSide} from "./index";

export default function Editor() {
    return <div className={"app-editor"} data-testid={"app-editor"}>
        <EditorHeader/>
        <EditorLeftSide/>
        <EditorContentArea/>
        <EditorRightSide/>
    </div>
}

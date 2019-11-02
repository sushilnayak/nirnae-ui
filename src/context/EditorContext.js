import { createContext } from "react";

export const editorContextDefaultValue = {
  leftSideDrawerOpen: false,
  rightSideDrawerOpen: false,
  footerSideDrawerOpen: false
};

const EditorContext = createContext([{}, () => {}]);

export default EditorContext;

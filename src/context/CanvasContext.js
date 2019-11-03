import { createContext } from "react";

export const canvasContextDefaultValue = {
  canvasList: [
    {
      canvasId: "",
      canvasNodes: [],
      canvasLinks: []
    }
  ],
  activeCanvasId: ""
};

const CanvasContext = createContext([{}, () => {
}]);

export default CanvasContext;

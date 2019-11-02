import React, {useRef, useEffect} from 'react'
import Canvas from "../canvas";

export default function EditorCanvas() {
  let canvas = null;
  let canvasRef = useRef(null);

  useEffect(() => {
    canvas = new Canvas(canvasRef.current);

    return () => canvas = null;
  }, []);
  return <div className={"main-content"} ref={canvasRef}/>;
}
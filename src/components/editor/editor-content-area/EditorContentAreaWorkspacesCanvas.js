import React,{useRef, useEffect} from 'react'
import Canvas from "../../Canvas";
import ChartGenerator from "../../ChartGenerator";
import {connect} from 'react-redux'
import {
    canvasControlFlowBar,
    canvasStatisticsBar,
    canvasStatusBar,
    canvasWarningAndErrorBar
} from "../../../actions/contentArea";

const mapStateToProps = ({contentAreaWorkspace}) => ({contentAreaWorkspace});

const mapDispatchToProps = (dispatch) => ({
});


function EditorContentAreaWorkspacesCanvas(props) {
    let canvasRef = useRef(null)
    let canvas;
    useEffect(()=>{
        canvas=new Canvas(canvasRef.current)
        // canvas=new ChartGenerator("1", canvasRef, window.innerWidth, window.innerHeight - 5);
        return ()=> canvas=null
    },[])

    // const [scale, setScale] = React.useState({ x: 1, y: 1 });
    // const calculateScaleX = () => (!canvas.current ? 0 : canvas.current.clientWidth / scaleWidth);
    // const calculateScaleY = () => (!canvas.current ? 0 : canvas.current.clientHeight / scaleHeight);
    //
    // const resized = () => {
    //     canvas.current.width = canvas.current.clientWidth;
    //     canvas.current.height = canvas.current.clientHeight;
    //     setScale({ x: calculateScaleX(), y: calculateScaleY() });
    // };
    //
    // React.useEffect(() => resized(), []);
    // React.useEffect(() => {
    //     const currentCanvas = canvas.current;
    //     currentCanvas.addEventListener("resize", resized);
    //     return () => currentCanvas.removeEventListener("resize", resized);
    // });
    //
    // React.useEffect(() => {
    //     new Canvas(canvas.current, scale.x, scale.y);
    // }, [scale]);

    return <div className={"app-editor-content-area-workspaces-canvas"}  ref={canvasRef} />
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspacesCanvas)
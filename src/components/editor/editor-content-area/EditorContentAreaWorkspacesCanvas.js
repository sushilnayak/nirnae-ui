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

const mapStateToProps = ({contentAreaWorkspace, componentSidebar}) => ({contentAreaWorkspace, componentSidebar});

const mapDispatchToProps = (dispatch) => ({
});


function EditorContentAreaWorkspacesCanvas(props) {
    const {activeEditortab, editorTabs, editorTabCanvas} = props.contentAreaWorkspace
    const {drag_data} = props.componentSidebar

    let canvasRef = useRef(null)
    let canvas=useRef(null);
    let onDrop;

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    useEffect(()=>{
        console.log("Tab Loaded!!")
        // canvas=new Canvas(canvasRef.current)
        canvas.current=new ChartGenerator(activeEditortab, canvasRef, canvasRef.current.clientWidth, canvasRef.current.clientHeight);

        let activeNodes = editorTabCanvas[activeEditortab].activeNodes;
        let activeLinks = editorTabCanvas[activeEditortab].activeLinks;
        console.log(activeNodes)
        console.log(activeLinks)
        canvas.current.setActiveNodes(activeNodes);
        canvas.current.setActiveLinks(activeLinks);

        canvas.current.redraw()
        return ()=> canvas.current=null
    },[activeEditortab ])

    // useEffect(()=>{
    //
    //     let activeNodes = editorTabCanvas[activeEditortab].activeNodes;
    //     let activeLinks = editorTabCanvas[activeEditortab].activeLinks;
    //
    //     canvas.current.setActiveNodes(activeNodes);
    //     canvas.current.setActiveLinks(activeLinks);
    //
    //     canvas.current.redraw()
    //
    // },[editorTabCanvas, activeEditortab, editorTabCanvas[activeEditortab].activeLinks,editorTabCanvas[activeEditortab].activeNodes ])

    onDrop = (event) => {
        console.log("canvas")
        const { nodeType, color, offsetLeft, offsetTop } = props.componentSidebar.drag_data;
        let x = event.pageX ;
        let y = event.pageY ;
        canvas.current.addNodeToCanvas(nodeType, x, y);
    }



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

    return <div className={"app-editor-content-area-workspaces-canvas"}
                id={"chart"}
                ref={canvasRef}
                onDragOver={onDragOver}
                onDrop={onDrop}
    />
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspacesCanvas)
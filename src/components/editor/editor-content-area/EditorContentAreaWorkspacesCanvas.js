import React, {useRef, useEffect, Fragment, useState} from 'react'
import Canvas from "../../Canvas";
import ChartGenerator from "../../ChartGenerator";
import {connect} from 'react-redux'
import {
    canvasControlFlowBar,
    canvasStatisticsBar,
    canvasStatusBar,
    canvasWarningAndErrorBar, contentAreaWorkspaceCanvasPropertiesCancel
} from "../../../actions/contentArea";
import Modal from "../../../common/Modal";

const mapStateToProps = ({contentAreaWorkspace, componentSidebar, contentAreaOperations}) => ({
    contentAreaWorkspace,
    componentSidebar,
    contentAreaOperations
});

const mapDispatchToProps = (dispatch) => ({
    contentAreaWorkspaceCanvasPropertiesCancel: ()=> dispatch(contentAreaWorkspaceCanvasPropertiesCancel())
});


function EditorContentAreaWorkspacesCanvas(props) {
    const {activeEditortab, editorTabs, editorTabCanvas} = props.contentAreaWorkspace
    const {drag_data} = props.componentSidebar
    const {propertiesShow, propertiesNodeType, propertiesNodeId} = props.contentAreaOperations

    let canvasRef = useRef(null)
    let canvas = useRef(null);
    let onDrop;

    const propertiesWindowCancel=()=>{
        props.contentAreaWorkspaceCanvasPropertiesCancel()
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    };

    useEffect(() => {
        console.log("Tab Loaded!!")
        canvas.current = new ChartGenerator(activeEditortab, canvasRef.current, canvasRef.current.clientWidth, canvasRef.current.clientHeight, 20);

        canvas.current.width = canvas.current.clientWidth;
        canvas.current.height = canvas.current.clientHeight;
        // let activeNodes = editorTabCanvas[activeEditortab].activeNodes;
        // let activeLinks = editorTabCanvas[activeEditortab].activeLinks;
        // console.log(activeNodes)
        // console.log(activeLinks)
        // canvas.current.setActiveNodes(activeNodes);
        // canvas.current.setActiveLinks(activeLinks);

        // canvas.current.redraw()
        return () => canvas.current = null
    }, [])

    useEffect(() => {

        let activeNodes = editorTabCanvas[activeEditortab].activeNodes;
        let activeLinks = editorTabCanvas[activeEditortab].activeLinks;

        canvas.current.setActiveNodes(activeNodes);
        canvas.current.setActiveLinks(activeLinks);

        canvas.current.redraw()

    }, [editorTabCanvas, activeEditortab, editorTabCanvas[activeEditortab].activeLinks, editorTabCanvas[activeEditortab].activeNodes])

    onDrop = (event) => {
        console.log("canvas")
        const {nodeType, color, offsetLeft, offsetTop} = props.componentSidebar.drag_data;
        let x = event.pageX;
        let y = event.pageY;
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



    return <Fragment>
        <div className={"app-editor-content-area-workspaces-canvas"}
             id={"chart"}
             ref={canvasRef}
             onDragOver={onDragOver}
             onDrop={onDrop}
             style={{width: "100%", height: "100%"}}
        />
        {propertiesShow && <Modal>
            <div className="modal-content node-properties" >
                <span className="close" onClick={propertiesWindowCancel}>
                &times;
            </span>

                <pre>
                    <code>{JSON.stringify( editorTabCanvas[activeEditortab].activeNodes.filter(x => x.nodeType===propertiesNodeType && x.id===propertiesNodeId), null ,4 )}</code>
                </pre>


            </div>
        </Modal>}
    </Fragment>
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContentAreaWorkspacesCanvas)
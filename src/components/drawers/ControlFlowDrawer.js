import React, {Fragment} from "react";
import {connect} from 'react-redux'

const mapStateToProps = ({contentAreaWorkspace}) => ({
    contentAreaWorkspace
})
const mapDispatchToProps = dispatch => ({})

function ControlFlowDrawer(props) {

    const {activeEditortab, editorTabCanvas} = props.contentAreaWorkspace
    let nodeData = editorTabCanvas[activeEditortab].activeNodes
    console.log(nodeData)
    return <Fragment>
        <table className={"control-flow"}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Node Type</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {nodeData.map((node, i) => <tr key={i}>
                <td>{node.id}</td>
                <td>{node.nodetype}</td>
                <td>{node.nodetype}</td>
                <td>{node.nodetype}</td>
            </tr>)}

            </tbody>
        </table>
    </Fragment>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlFlowDrawer)
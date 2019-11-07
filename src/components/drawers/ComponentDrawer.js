import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import { componentList, FillColor, StrokeColor } from "../../utils/color";
import {editorComponentNodeDragEnd, editorComponentNodeDragStart} from "../../actions/editor";

const mapStateToProps = ({contentAreaWorkspace}) => ({
    contentAreaWorkspace
})

const mapDispatchToProps = (dispatch) => ({
    editorComponentNodeDragStart: (data)=> dispatch(editorComponentNodeDragStart(data)),
    editorComponentNodeDragEnd: ()=>dispatch(editorComponentNodeDragEnd())
})
function ComponentDrawer(props) {
  // const [showDetail , setShowDetail ] = useState(false)
  const [search, setSearch] = useState("");

  const dragStart=(e)=>{
      console.log("drag started " + e.target.id)
      props.editorComponentNodeDragStart({
          nodeType: e.target.id,
          offsetLeft: e.target.offsetLeft,
          offsetTop: e.target.offsetTop
      })
  }

  const dragEnd=()=>{
      console.log("drag ended")
      props.editorComponentNodeDragEnd()
  }

  return (
    <div className={"component-drawer"}>
      <div className={"input-container"}>
        <input
          type={"text"}
          placeholder={"Search Component..."}
          defaultValue={search}
          onChange={e => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className={"component-container"}>
        {[...new Set(componentList.map(comp => comp.type))].map(
          componentType => {
            const classname = `component-type-` + componentType.toLowerCase();
            const validComponentType = componentList
              .filter(c => c.type === componentType)
              .filter(x =>
                search.length === 0
                  ? true
                  : x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
                  ? true
                  : x.description
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) !== -1
              );
            const validComponentTypeAvailableAfterSearch =
              validComponentType.length > 0;

            return (
              <div className={classname} key={classname}>
                {validComponentTypeAvailableAfterSearch && (
                  <Fragment>
                    <div className={"component-type-header"}>
                      {componentType}
                    </div>
                    <ul>
                      {validComponentType.map((component, i) => (
                        <li
                          key={i}
                          id={component.id}
                          style={{
                            backgroundColor: FillColor(component.id),
                            border: `2px solid ${StrokeColor(component.id)}`
                          }}
                          data-tooltip={component.description}
                          draggable
                          onDragStart={dragStart}
                          onDragEnd={dragEnd}
                        >
                          {component.name}
                        </li>
                      ))}
                    </ul>
                  </Fragment>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentDrawer)
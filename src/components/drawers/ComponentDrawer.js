import React, { Fragment, useState } from "react";
import { componentList, FillColor, StrokeColor } from "../../utils/color";

export default function ComponentDrawer() {
  // const [showDetail , setShowDetail ] = useState(false)
  const [search, setSearch] = useState("");

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
                          style={{
                            backgroundColor: FillColor(component.id),
                            border: `2px solid ${StrokeColor(component.id)}`
                          }}
                          data-tooltip={component.description}
                          draggable
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

import { Label } from "../../builder-components";
import React, { useContext } from "react";

export default function Settings() {

  return <div className={"app-settings"}>
    <div style={{margin: "0px"}}><h4>Sushil Nayak</h4></div>
    <div style={{margin: '0px', paddingBottom: "1rem"}}><p>sushil.nayak@gmail.com</p></div>

    <div style={{margin: '0px', paddingBottom: "1rem"}}>
      <h4>Permissions : </h4>
      <p>You have access to following groups :</p>
      <div>
        <Label backgroundColor={"#00b5ad"}  color={"white"} buttonLabel={"Powercurve"}/>
        <Label backgroundColor={"#db2828"}  color={"white"} buttonLabel={"CDE"}/>
      </div>
      <p>You have access to following Projects :</p>
      <div>
        <Label backgroundColor={"#00b5ad"}  color={"white"} buttonLabel={"Powercurve"}/>
        <Label backgroundColor={"#db2828"}  color={"white"} buttonLabel={"CDE"}/>
      </div>
    </div>

    {/*<div style={{margin: "0px"}}></div>*/}

    {/*<div style={{margin: "0px"}}><p>You have access to following Projects :</p></div>*/}

    <div style={{margin: "0px", paddingBottom: ".25em"}}><h4>Dark Theme</h4></div>
    <input type={"checkbox"}/>
  </div>;
}

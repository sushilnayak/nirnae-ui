import { Router } from "@reach/router";
import Home from "../home";
import Executions from "../executions";
import Reports from "../reports";
import Settings from "../settings";
import React from "react";
import Editor from "../editor/Editor";

export default function AppContent() {
  return <div className={"app-content"}>
    <Router>
      <Home default path={"/"}/>
      <Editor path={"/editor"}/>
      <Executions path={"/executions"}/>
      <Reports path={"/reports"}/>
      <Settings path={"/settings"}/>
    </Router>
  </div>;
}
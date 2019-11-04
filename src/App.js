import React from "react";
import { Link, Router } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import { faTasks } from "@fortawesome/free-solid-svg-icons/faTasks";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import {EditorContentArea, EditorHeader, EditorLeftSide, EditorRightSide} from "./components/editor";
import Settings from "./components/settings";
import Home from "./components/home";
import Reports from "./components/reports";
import Executions from "./components/executions";
import {AppContent, AppHeader} from "./components/app";


function App() {
    return <div id={"app"}>
        <AppHeader />
        <AppContent />
    </div>
}

export default App

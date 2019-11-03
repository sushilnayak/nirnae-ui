import React, { useState } from "react";
import ApplicationContext, { applicationContextDefaultValue } from "./context/ApplicationContext";
import { AppContent, AppHeader } from "./components/app";

export default function App() {
  const applicationState = useState(applicationContextDefaultValue);
  return <ApplicationContext.Provider value={applicationState}>
    <div className={"app " + (applicationState[0].darkMode ? "theme--dark" : "theme--default")}>
      <AppHeader/>
      <AppContent/>
    </div>
  </ApplicationContext.Provider>;
}
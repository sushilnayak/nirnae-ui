import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function InformationDrawer() {

  const [dummyMarkDown, setDummyMarkDown] = useState("# Request\n" +
    "\n" +
    "This component creates a request with received data.\n" +
    "\n" +
    "__Response:__\n" +
    "\n" +
    "```javascript\n" +
    "{\n" +
    "\tdata: String,\n" +
    "\theaders: Object,\n" +
    "\tstatus: Number,\n" +
    "\thost: String\n" +
    "}\n" +
    "```\n" +
    "\n" +
    "__Dynamic arguments__:\n" +
    "Are performed via FlowData repository and can be used for URL address or for custom headers/cookies/auth. Use `repository` component for creating of dynamic arguments. Examples:\n" +
    "\n" +
    "- url address can be in this form `https://hostname.com/{key}/`\n" +
    "- headers values e.g. `{token}`\n" +
    "- cookies values e.g. `{token}`");

  return <div className={"information-drawer"}>
    <ReactMarkdown source={dummyMarkDown} />
  </div>
}
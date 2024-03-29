import React from 'react';
import {render} from 'react-dom'
import "./styles/index.scss";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";
import {persistor, store} from "./store";
import App from "./App";

render(<Provider store={store}>
    <PersistGate persistor={persistor}>
        <App/>
    </PersistGate>
</Provider>, document.getElementById("root"))
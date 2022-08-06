import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserdataStateProvider } from "./context/UserdataContext";

ReactDOM.render(
  <React.StrictMode>
    <UserdataStateProvider>
      <App />
    </UserdataStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

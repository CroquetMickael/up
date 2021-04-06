import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { worker } from "./__mocks__/browser";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import { worker } from "./__mocks__/browser";
import { Routes } from "./layout/routes/routes";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

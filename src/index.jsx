import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import { worker } from "./__mocks__/browser";
import { Routes } from "./layout/routes/routes";
import { TitleBarComponent } from "./layout/Titlebar/Titlebar";
import './i18n/I18N'

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col h-screen overflow-x-hidden bg-brand">
      <TitleBarComponent />
      <Routes />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

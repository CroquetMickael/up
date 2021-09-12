import React from "react";
import { TitleBarComponent } from "./titlebar/Titlebar";

const Layout = ({ children }) => (
  <div className="flex flex-col h-screen overflow-x-hidden">
    <TitleBarComponent />
    <main className="h-full bg-brand  overflow-y-auto overflow-x-hidden">{children}</main>
  </div>
);

export { Layout };

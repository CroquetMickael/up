import React from "react";
import { TitleBarComponent } from "./titlebar/Titlebar";

const Layout = ({ children }) => (
  <div className="flex flex-col">
    <TitleBarComponent />
    <main className="h-screen overflow-y-auto bg-brand pb-8">{children}</main>
  </div>
);

export { Layout };

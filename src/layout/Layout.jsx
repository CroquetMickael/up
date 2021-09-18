import React from "react";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }) => (
  <main className="h-full overflow-y-auto overflow-x-hidden">
    <Sidebar />
    <div className="flex flex-col ml-14">
      {children}
    </div>
  </main>
);

export { Layout };

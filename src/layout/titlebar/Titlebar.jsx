import React from "react";
import { FaTimes, FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";

const TitleBarComponent = (props) => {
  return (
    <div className="flex drag h-8 p-0 m-0 bg-brandDarker font-sans w-full justify-between">
      <div className="ml-1 text-gray-300">up</div>
      <div className="flex noDrag flex-wrap">
        <button
          onClick={() => window.electron.ipcRenderer.send("minimize-me")}
          className="p-1 text-gray-300 hover:bg-white hover:bg-opacity-30"
        >
          <FaWindowMinimize />
        </button>

        <button
          onClick={() => window.electron.ipcRenderer.send("maximize-me")}
          className="p-1 text-gray-300 hover:bg-white hover:bg-opacity-30"
        >
          <FaWindowMaximize />
        </button>

        <button
          onClick={() => window.electron.ipcRenderer.send("close-me")}
          className="p-1 hover:bg-brandRed  text-gray-300"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export { TitleBarComponent };

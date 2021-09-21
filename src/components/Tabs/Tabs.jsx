import React from "react";
import { useState } from "react";

import "./Tabs.css";

const Tabs = ({ tabNames, componentList, backButton, top = 0 }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className={`tab-menu sticky top-${top} bg-brand z-10`}>
        {backButton && backButton}
        {tabNames.map((name, index) => (
          <button
            key={name}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? "focus" : ""}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {componentList.map((component, index) => (
          <>{activeTab === index ? component : null}</>
        ))}
      </div>
    </>
  );
};

export { Tabs };

import React from "react"
import { useState } from "react";

import "./Tabs.css"

const Tabs = ({ tabNames, componentList }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <>
            <div className="tab-menu sticky top-0 bg-brand z-10">
                {tabNames.map((name, index) =>
                    <button
                        onClick={() => setActiveTab(index)}
                        className={activeTab === index ? 'focus' : ''}
                    >
                        {name}
                    </button>)}
            </div>
            <div className="tab-view">
                {componentList.map((component, index) => <>
                    {activeTab === index ? component : null}
                </>)}
            </div>
        </>)
}

export { Tabs }
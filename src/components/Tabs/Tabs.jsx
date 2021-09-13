import React, { useState } from "react";

import "./Tabs.css"

const TabItem = (props) => <div {...props} />;

const Tabs = ({ defaultIndex = 0, onTabClick, children }) => {
    const [bindIndex, setBindIndex] = useState(defaultIndex);
    const changeTab = newIndex => {
        if (typeof onTabClick === 'function') onTabClick(newIndex);
        setBindIndex(newIndex);
    };
    const items = children.filter(item => item.type.name === 'TabItem');

    return (
        <>
            <div className="tab-menu sticky top-0 bg-brand z-10">
                {items.map(({ props: { index, label } }) => (
                    <button
                        key={`tab-btn-${index}`}
                        onClick={() => changeTab(index)}
                        className={bindIndex === index ? 'focus' : ''}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="tab-view">
                {items.map(({ props }) => (
                    <div
                        {...props}
                        className={`tab-content ${bindIndex === props.index ? 'selected' : ''
                            }`}
                        key={`tab-content-${props.index}`}
                    />
                ))}
            </div>
        </>
    );
};

export { Tabs, TabItem }

import React from "react";
import { FiAlertCircle } from "react-icons/fi"


const typeColor = {
    "success": { background: "bg-brandSuccess", text: "text-brandSuccess" },
    "error": { background: "bg-brandRed", text: "text-brandRed" },
    "": { background: "bg-white", text: "text-white" }
};

const Alert = ({ message, type, title }) =>
    <div className={`inline-flex bg-white leading-none ${typeColor[type].text} rounded-full p-2 shadow text-teal text-sm toast`}>
        <div className="flex flex-wrap items-center justify-center">
            <span className={`inline-flex ${typeColor[type].background} text-white rounded-full h-6 px-3 justify-center items-center font-bold`}><FiAlertCircle /></span>
            <div className="flex flex-col">
                <span className="text-base ml-2 font-bold">{title}</span>
                <span className="inline-flex px-2">{message}</span>
            </div>
        </div>
    </div>


export { Alert }
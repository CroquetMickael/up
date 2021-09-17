import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Alert } from "../../components/Alerts/Alert";
import { v4 as uuidv4 } from "@lukeed/uuid"

import "./Notification.css"

const NotificationContext = createContext();


const NotificationContextProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addNewAlert = ({ type, message, title }) => {
        const newAlert = { id: uuidv4(), type, message, title }
        setAlerts([...alerts, newAlert]);
    }

    const cleanAlertFromArray = useCallback((id) => {
        var array = alerts;
        const elemIndex = alerts.findIndex((alert) => alert.id === id);
        array.splice(elemIndex, 1);
        setAlerts([...array]);
    }, [alerts])

    useEffect(() => {
        const interval = setInterval(() => {
            if (alerts.length) {
                cleanAlertFromArray(alerts[0].id);
            }
        }, 3000);
        return () => {
            clearInterval(interval);
        }
    }, [alerts, cleanAlertFromArray]);

    return (
        <NotificationContext.Provider value={{ addNewAlert }} >
            <div className="fixed right-8 top-16 flex flex-col gap-y-4 z-50">
                {alerts.map(alert =>
                    <Alert type={alert.type} key={alert.id} message={alert.message} title={alert.title} />
                )}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}


const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useReplays must be used within a ReplayProvider");
    }
    return context;
}

export { useNotification, NotificationContextProvider }
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDB } from "../hooks/useDB";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { push } = useHistory();
  const { DBGet, DBSet, DBSave } = useDB();
  const [user, setUser] = useState(DBGet("user").value());
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      push("/activate");
    }
  }, [push, user]);

  useEffect(() => {
    DBSet("user", user);
    DBSave();
  }, [DBSave, DBSet, user]);

  useEffect(() => {
    if (user?.path !== "" && user?.autoUpload) {
      window.electron.ipcRenderer.send("autoUpload", user.path);
    } else {
      window.electron.ipcRenderer.send("stopAutoUpload");
    }
  }, [user?.autoUpload, user?.path]);

  useEffect(() => {
    window.electron.ipcRenderer.send("autoLaunch", user?.autoLaunch);
  }, [user?.autoLaunch]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isFirstLoading, setIsFirstLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContextProvider, useUser };

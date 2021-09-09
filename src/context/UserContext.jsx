import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { useDB } from "../hooks/useDB";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { push } = useHistory();
  const { DBGet } = useDB();
  const [user, setUser] = useState(DBGet("user").value());

  useEffect(() => {
    if (!user) {
      push("/activate");
    }
  }, [push, user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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

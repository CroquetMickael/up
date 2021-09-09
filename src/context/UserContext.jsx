import { stringify } from "postcss";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import StormDb from "stormdb";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { push } = useHistory();
  const engine = useMemo(() => new StormDb.browserEngine("up"), []);
  const db = useMemo(() => new StormDb(engine), [engine]);
  const [user, setUser] = useState(db.get("user").value());

  useEffect(() => {
    if (!user) {
      push("/activate");
    }
  }, [db, push, user]);

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

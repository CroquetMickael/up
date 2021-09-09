import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../../App";
import { UserContextProvider } from "../../context/UserContext";
import { Activate } from "../../pages/Activate/Activate";

const Routes = () => (
  <BrowserRouter>
    <UserContextProvider>
      <Switch>
        <Route path="/activate">
          <Activate />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </UserContextProvider>
  </BrowserRouter>
);

export { Routes };

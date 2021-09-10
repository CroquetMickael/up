import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UploadReplay } from "../../components/UploadReplay/UploadReplay";
import { UserContextProvider } from "../../context/UserContext";
import { Activate } from "../../pages/Activate/Activate";
import { Home } from "../../pages/Home/Home";

const Routes = () => (
  <BrowserRouter>
    <UserContextProvider>
      <Switch>
        <Route path="/activate">
          <Activate />
        </Route>
        <UploadReplay>
          <Route path="/">
            <Home />
          </Route>
        </UploadReplay>
      </Switch>
    </UserContextProvider>
  </BrowserRouter>
);

export { Routes };

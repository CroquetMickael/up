import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UploadReplay } from "../../components/UploadReplay/UploadReplay";
import { UserContextProvider } from "../../context/UserContext";
import { Activate } from "../../pages/Activate/Activate";
import { Home } from "../../pages/Home/Home";
import { Layout } from "../Layout";

const Routes = () => (
  <Layout>
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Route exact path="/activate">
            <Activate />
          </Route>
          <UploadReplay>
            <Route exact path="/">
              <Home />
            </Route>
          </UploadReplay>
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  </Layout>
);

export { Routes };

import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { UploadReplay } from "../../components/UploadReplay/UploadReplay";
import { NotificationContextProvider } from "../../context/Notification/NotificationContext";
import { ReplayContextProvider } from "../../context/Replays/ReplaysContext";
import { UserContextProvider } from "../../context/UserContext";
import { Activate } from "../../pages/Activate/Activate";
import { Home } from "../../pages/Home/Home";
import { ReplayDetail } from "../../pages/Replays/Detail/ReplayDetail";
import { Replays } from "../../pages/Replays/Replays";
import { Settings } from "../../pages/Settings/Settings";
import { Layout } from "../Layout";

const Routes = () => (
  <HashRouter>
    <NotificationContextProvider>
      <UserContextProvider>
        <Switch>
          <Route exact path="/activate" component={Activate} />
          <ReplayContextProvider>
            <Layout>
              <UploadReplay>
                <Route exact path="/" component={Home} />
                <Route exact path="/replays" component={Replays} />
                <Route
                  exact
                  path="/replays/:replayId"
                  component={ReplayDetail}
                />
                <Route exact path="/settings" component={Settings} />
              </UploadReplay>
            </Layout>
          </ReplayContextProvider>
        </Switch>
      </UserContextProvider>
    </NotificationContextProvider>
  </HashRouter>
);

export { Routes };

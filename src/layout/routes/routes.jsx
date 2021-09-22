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
                <div
                  className="bg-yellow-100 border-l-4 border-yellow-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p className="font-bold">Be Warned</p>
                  <p>Lot of things to modify / fixed, it's still an alpha !</p>
                  <p>I know these ones: </p>
                  <ul>
                    <li>
                      - Some UI/UX stuff can be broken as the{" "}
                      <strong>Tracking replays</strong>
                    </li>
                    <li>
                      - To upload, just drop a replay file in the application
                    </li>
                    <li>
                      - I will try my best to have more langage, currently only
                      english: /
                    </li>
                  </ul>
                </div>
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

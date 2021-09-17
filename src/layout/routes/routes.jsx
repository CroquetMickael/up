import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { UploadReplay } from "../../components/UploadReplay/UploadReplay";
import { NotificationContextProvider } from "../../context/Notification/NotificationContext";
import { ReplayContextProvider } from "../../context/Replays/ReplaysContext";
import { UserContextProvider } from "../../context/UserContext";
import { Activate } from "../../pages/Activate/Activate";
import { Home } from "../../pages/Home/Home";
import { Layout } from "../Layout";

const Routes = () => (
  <Layout>
    <HashRouter>
      <NotificationContextProvider>
        <UserContextProvider>
          <Switch>
            <Route exact path="/activate" component={Activate} />
            <ReplayContextProvider>
              <UploadReplay>
                <div class="bg-yellow-100 border-l-4 border-yellow-500 text-orange-700 p-4" role="alert">
                  <p class="font-bold">Be Warned</p>
                  <p>Lot of things to modify / fixed, it's still an alpha !</p>
                  <p>I know these ones : </p>
                  <ul>
                    <li>- If ballChasing crash, you will never find the problem right now, press : <br /> CTRL + SHIFT + I {"=>"} network panel and if a call is in red, that's why it's not working</li>
                    <li>- Some UI/UX stuff can be broken as the <strong>Tracking replays</strong></li>
                    <li>- To upload, just drop a replay file in the application, currently no verification about the file type, so if the upload fail, you won't be informed</li>
                    <li>- I will try my best to have more langage, currently only english :/</li>
                  </ul>
                </div>
                <Route exact path="/" component={Home} />
              </UploadReplay>
            </ReplayContextProvider>
          </Switch>
        </UserContextProvider>
      </NotificationContextProvider>
    </HashRouter  >
  </Layout >
);

export { Routes };

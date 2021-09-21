import React from "react";
import { Tabs } from "../../../../../components/Tabs/Tabs";
import { PlayerBoost } from "./PlayerBoost";
import { TeamBoost } from "./TeamBoost";

const BoostSection = ({ game }) => (
  <Tabs
    tabNames={["Teams", "Players"]}
    top="10.5"
    componentList={[
      <TeamBoost gameInformation={game} />,
      <PlayerBoost gameInformation={game} />,
    ]}
  />
);

export { BoostSection };

import React from "react";
import { Tabs } from "../../../../../components/Tabs/Tabs";
import { PlayerMovement } from "./PlayerMovement";
import { TeamMovement } from "./TeamMovement";

const MovementSection = ({ game }) => (
  <Tabs
    tabNames={["Teams", "Players"]}
    top="10.5"
    componentList={[
      <TeamMovement gameInformation={game} />,
      <PlayerMovement gameInformation={game} />,
    ]}
  />
);

export { MovementSection };

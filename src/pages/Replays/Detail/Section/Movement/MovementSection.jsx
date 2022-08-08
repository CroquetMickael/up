import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "../../../../../components/Tabs/Tabs";
import { PlayerMovement } from "./PlayerMovement";
import { TeamMovement } from "./TeamMovement";

const MovementSection = ({ game }) => {
  const { t } = useTranslation();
  return (
    <Tabs
      tabNames={[
        t("replay.replayDetail.teams"),
        t("replay.replayDetail.players"),
      ]}
      top="10.5"
      componentList={[
        <TeamMovement gameInformation={game} />,
        <PlayerMovement gameInformation={game} />,
      ]}
    />
  );
};

export { MovementSection };

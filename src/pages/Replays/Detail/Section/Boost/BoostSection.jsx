import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "../../../../../components/Tabs/Tabs";
import { PlayerBoost } from "./PlayerBoost";
import { TeamBoost } from "./TeamBoost";

const BoostSection = ({ game }) => { 
  const { t } = useTranslation();
  
  return (
  <Tabs
    tabNames={[t('replay.replayDetail.teams'), t('replay.replayDetail.players')]}
    top="10.5"
    componentList={[
      <TeamBoost gameInformation={game} />,
      <PlayerBoost gameInformation={game} />,
    ]}
  />
);
  }

export { BoostSection };

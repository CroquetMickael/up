import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useReplayData } from "../../hooks/useReplayData";
import { BoostSection } from "./Section/BoostSection";
import { MovementSection } from "./Section/MovementSection";
import { useReplays } from "../../context/Replays/ReplaysContext";
import { Tabs } from "../../components/Tabs/Tabs";

import "./Home.css";

function Home() {
  const { user } = useUser();
  const { get: getRanksData, data: rankData } = useFetch();
  const { lastGames, comparedGames } = useReplays();
  const { boost, movement } = useReplayData({ lastGames, comparedGames, user });
  useEffect(() => {
    getRanksData(
      "/population/average/stats?group=grank&min-rank=0&max-rank=0",
      {},
      true
    );
  }, [getRanksData]);

  return (
    <>
      <div className="z-10 relative fade-in">
        <div className="tab-view">
          <Tabs
            tabNames={["Boost", "Movement"]}
            componentList={
              [
                <BoostSection boost={boost} rankData={rankData} key="Boost Component"/>,
                <MovementSection movement={movement} rankData={rankData} key="Movement Component"/>
              ]}
          />
        </div>
      </div>
    </>
  );
}

export { Home };

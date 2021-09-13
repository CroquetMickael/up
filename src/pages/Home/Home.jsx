import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useReplayData } from "../../hooks/useReplayData";
import { BoostSection } from "./Section/BoostSection";
import { MovementSection } from "./Section/MovementSection";
import { useReplays } from "../../context/Replays/ReplaysContext";

import "./Home.css";
import { useHistory } from "react-router";
import { TabItem, Tabs } from "../../components/Tabs/Tabs";

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
        <Tabs defaultIndex={1}>
          <TabItem label="Boost" index={1}>
            <BoostSection boost={boost} rankData={rankData} />
          </TabItem>
          <TabItem label="Movement" index={2}>
            <MovementSection movement={movement} rankData={rankData} />
          </TabItem>
        </Tabs>
      </div>
    </>
  );
}

export { Home };

import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useReplayData } from "../../hooks/useReplayData";
import { BoostSection } from "./Section/BoostSection";
import { MovementSection } from "./Section/MovementSection";
import { useReplays } from "../../context/Replays/ReplaysContext";
import { TabItem, Tabs } from "../../components/Tabs/Tabs";

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
        <Tabs onTabClick={() => {
          // don't remove fix a echarts bug with resize and tabs
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
          }, 0)
        }} defaultIndex={1}>
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

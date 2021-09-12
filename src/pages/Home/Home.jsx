import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useReplayData } from "../../hooks/useReplayData";
import { BoostSection } from "./Section/BoostSection";
import { MovementSection } from "./Section/MovementSection";
import { useReplays } from "../../context/Replays/ReplaysContext";

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
      <div className="z-10 relative">
        <BoostSection boost={boost} rankData={rankData} />
        <MovementSection movement={movement} rankData={rankData} />
      </div>
    </>
  );
}

export { Home };

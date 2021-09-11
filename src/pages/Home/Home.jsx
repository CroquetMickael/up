import React, { useMemo, useRef } from "react";
import "./Home.css";
import { useEffect, useState } from "react/cjs/react.development";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useDB } from "../../hooks/useDB";
import Bottleneck from "bottleneck";
import { getReplaysData, UpdateReplaysData } from "./Home.service";
import { useReplayData } from "../../hooks/useReplayData";
import { BoostSection } from "./Section/BoostSection";
import { MovementSection } from "./Section/MovementSection";

function Home() {
  const { user, isFirstLoading, setIsFirstLoading } = useUser();
  const { get, data, isResolved } = useFetch();
  const {
    get: getReplayData,
    data: replayData,
    isResolved: replayResolved,
  } = useFetch();
  const { get: getRanksData, data: rankData } = useFetch();
  const { DBSet, DBSave, DBGet } = useDB();
  const [lastGames, setLastGames] = useState(
    DBGet("lastReplays").value() || []
  );
  const [comparedGames, setComparedGames] = useState(
    DBGet("comparedReplays").value() || []
  );
  const { boost, movement } = useReplayData({
    lastGames,
    comparedGames,
    user,
  });

  const limiter = useMemo(
    () =>
      new Bottleneck({
        minTime: 500,
        maxConcurrent: 1,
        reservoir: 20,
        reservoirRefreshInterval: 1000,
        reservoirRefreshAmount: 2,
        trackDoneStatus: true,
      }),
    []
  );

  useEffect(() => {
    get(`/replays?player-id=steam:${user?.id}`);
  }, [get, user?.id]);

  useEffect(() => {
    if (isResolved && isFirstLoading) {
      DBSet("lastReplays", []);
      DBSet("comparedReplays", []);
      DBSave();
      getReplaysData({
        data,
        getReplayData,
        DBSave,
        DBSet,
        limiter,
        setIsFirstLoading,
      });
    }
  }, [
    DBSave,
    DBSet,
    data,
    getReplayData,
    isFirstLoading,
    isResolved,
    limiter,
    setIsFirstLoading,
  ]);

  useEffect(() => {
    getRanksData(
      "/population/average/stats?group=grank&min-rank=0&max-rank=0",
      {},
      true
    );
  }, [getRanksData]);

  useEffect(() => {
    const replaysData = DBGet("lastReplays").value() || [];
    const comparedReplays = DBGet("comparedReplays").value() || [];
    const gamesId = DBGet("gamesId").value();
    const doneLimiter = limiter.counts().DONE === 20;

    if (replayResolved) {
      UpdateReplaysData({
        replayData,
        replaysData,
        DBSet,
        DBSave,
        comparedReplays,
        gamesId,
      });
    }

    const maxReplayFound = replaysData.length === 10;
    const maxComparedReplays = comparedReplays.length === 10;
    if (doneLimiter && maxReplayFound && maxComparedReplays) {
      setLastGames(replaysData);
      setComparedGames(comparedReplays);
    }
  }, [DBGet, DBSave, DBSet, limiter, replayData, replayResolved]);

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

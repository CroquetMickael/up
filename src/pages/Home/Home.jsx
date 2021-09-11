import React, { useMemo } from "react";
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
  const [datas, setDatas] = useState(DBGet("replaysDatas").value());

  const { boost, movement } = useReplayData({ user, games: datas });

  const limiter = useMemo(
    () =>
      new Bottleneck({
        minTime: 500,
        maxConcurrent: 1,
        reservoir: 10,
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
    const replaysData = DBGet("replaysDatas").value() || [];
    if (replayResolved) {
      UpdateReplaysData({ replayData, replaysData, DBSet, DBSave });
      const doneLimiter = limiter.counts().DONE === 10;
      const maxReplayFound = replaysData.length === 10;
      if (doneLimiter && maxReplayFound) {
        setDatas(replaysData);
      }
    }
  }, [DBGet, DBSave, DBSet, datas, limiter, replayData, replayResolved]);

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

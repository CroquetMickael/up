import Bottleneck from "bottleneck";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetch } from "../../hooks/useFetch";
import { useUser } from "../UserContext";
import { getReplaysData, UpdateReplaysData } from "./Replays.service";

const ReplayContext = createContext();

const ReplayContextProvider = ({ children }) => {
  const { get, data, isResolved } = useFetch();
  const {
    get: getReplayData,
    data: replayData,
    isResolved: replayResolved,
  } = useFetch();
  const { setIsFirstLoading, isFirstLoading, user } = useUser();
  const [lastGames, setLastGames] = useState([]);
  const [comparedGames, setComparedGames] = useState([]);
  const [gamesIds, setGamesIds] = useState([]);

  let replays = useMemo(() => [], []);
  let comparedReplays = useMemo(() => [], []);

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
      getReplaysData({
        data,
        getReplayData,
        setGamesIds,
        limiter,
        setIsFirstLoading,
      });
    }
  }, [
    data,
    getReplayData,
    isFirstLoading,
    isResolved,
    limiter,
    setIsFirstLoading,
  ]);

  useEffect(() => {
    const doneLimiter = limiter.counts().DONE === 20;

    if (replayResolved) {
      UpdateReplaysData({
        replayData,
        replays,
        comparedReplays,
      });
    }

    const maxReplayFound = replays.length === 10;
    const maxComparedReplays = comparedReplays.length === 10;
    if (doneLimiter && maxReplayFound && maxComparedReplays) {
      replays.sort((a, b) => new Date(a.date) - new Date(b.date));
      comparedReplays.sort((a, b) => new Date(a.date) - new Date(b.date));
      setLastGames(replays);
      setComparedGames(comparedReplays);
    }
  }, [comparedReplays, limiter, replayData, replayResolved, replays]);

  return (
    <ReplayContext.Provider
      value={{ lastGames, setLastGames, comparedGames, setComparedGames }}
    >
      {children}
    </ReplayContext.Provider>
  );
};

const useReplays = () => {
  const context = useContext(ReplayContext);
  if (context === undefined) {
    throw new Error("useReplays must be used within a ReplayProvider");
  }
  return context;
};

export { ReplayContextProvider, useReplays };

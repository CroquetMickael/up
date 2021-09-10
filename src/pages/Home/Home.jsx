import React from "react";
import logo from "./logo.svg";
import "./Home.css";
import { useEffect } from "react/cjs/react.development";
import { useUser } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import { useDB } from "../../hooks/useDB";
import Bottleneck from "bottleneck";

function Home() {
  const { user, isFirstLoading, setIsFirstLoading } = useUser();
  const { get, data, isResolved } = useFetch();
  const {
    get: getReplayData,
    data: replayData,
    isResolved: replayResolved,
  } = useFetch();
  const { DBSet, DBSave, DBGet } = useDB();

  useEffect(() => {
    get(`/replays?player-id=steam:${user?.id}`);
  }, [get, user?.id]);

  useEffect(() => {
    const limiter = new Bottleneck({
      minTime: 500,
      maxConcurrent: 1,
      reservoir: 10,
      reservoirRefreshInterval: 1000,
      reservoirRefreshAmount: 2,
    });

    if (isResolved && isFirstLoading) {
      const games = data?.list.splice(0, 10);
      const ids = games.map((game) => game.id);
      DBSet("gamesId", ids);
      DBSave();
      setIsFirstLoading(false);
      ids.forEach((id) => {
        limiter.schedule(() => getReplayData(`/replays/${id}`));
      });
    }
  }, [
    DBSave,
    DBSet,
    data?.list,
    getReplayData,
    isFirstLoading,
    isResolved,
    setIsFirstLoading,
  ]);

  useEffect(() => {
    const replaysData = DBGet("replaysDatas").value() || [];
    if (replayResolved) {
      replaysData.push(replayData);
      const removeDuplicateReplaysDatas = replaysData.filter(
        (replay, index, array) =>
          array.findIndex((t) => t.id === replay.id) === index
      );
      DBSet("replaysDatas", removeDuplicateReplaysDatas);
      DBSave();
    }
  }, [DBGet, DBSave, DBSet, replayData, replayResolved]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Toto <code>src/App.jsx</code> and save to reload with viteJS.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export { Home };

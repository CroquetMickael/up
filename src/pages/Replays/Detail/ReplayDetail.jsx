import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useReplays } from "../../../context/Replays/ReplaysContext";
import { Tabs } from "../../../components/Tabs/Tabs";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BoostSection } from "./Section/Boost/BoostSection";
import { MovementSection } from "./Section/Movement/MovementSection";

const ReplayDetail = () => {
  const { replayId } = useParams();
  const { lastGames, comparedGames } = useReplays();
  const [replayData, setReplayData] = useState();

  useEffect(() => {
    const currentGame = [...lastGames, ...comparedGames].find(
      (game) => game.id === replayId
    );
    setReplayData(currentGame);
  }, [comparedGames, lastGames, replayId]);

  return (
    <div>
      <Tabs
        backButton={
          <Link
            to="/replays"
            className="text-white inline-flex items-center p-2 mr-8 hover:bg-brandSub hover:bg-opacity-25"
          >
            <FaArrowLeft className="mx-2" />
            Back to replay list
          </Link>
        }
        tabNames={["Boost", "Movement"]}
        componentList={[
          <BoostSection game={replayData} />,
          <MovementSection game={replayData} />,
        ]}
      />
    </div>
  );
};

export { ReplayDetail };

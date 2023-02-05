import React from "react";
import { useTranslation } from "react-i18next";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByPlayers } from "../../DetailChart";

const PlayerMovement = ({ gameInformation }) => {
  const { t } = useTranslation();
  return (
    <>
      <DataTitle Title={t("replay.replayDetail.playersTitle")} />
      <div className="flex flex-wrap">
        <ReactECharts
          className="w-1/2"
          option={dataByPlayers({
            dataToFind: ["avg_speed_percentage"],
            isFixed: true,
            type: "movement",
            gamesData: gameInformation,
            titles: [
              t(
                "replay.replayDetail.charts.movement.SpeedPercentageOfMaxSpeed"
              ),
            ],
          })}
        />
        <ReactECharts
          className="w-1/2"
          option={dataByPlayers({
            dataToFind: ["total_distance"],
            type: "movement",
            gamesData: gameInformation,
            titles: [t("replay.replayDetail.charts.movement.distanceTraveled")],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "percent_supersonic_speed",
              "percent_boost_speed",
              "percent_slow_speed",
            ],
            isFixed: true,
            type: "movement",
            gamesData: gameInformation,
            chartTitle: t("replay.replayDetail.charts.movement.speed"),
            titles: [
              t("replay.replayDetail.charts.movement.percentSupersonicSpeed"),
              t("replay.replayDetail.charts.movement.percentBoostSpeed"),
              t("replay.replayDetail.charts.movement.percentSlowSpeed"),
            ],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "percent_ground",
              "percent_low_air",
              "percent_high_air",
            ],
            type: "movement",
            gamesData: gameInformation,
            isFixed: true,
            chartTitle: t("replay.replayDetail.charts.movement.groundAir"),
            titles: [
              t("replay.replayDetail.charts.movement.percentOnGround"),
              t("replay.replayDetail.charts.movement.percentLowInAir"),
              t("replay.replayDetail.charts.movement.percentHighInAir"),
            ],
          })}
        />
        <ReactECharts
          className="w-1/3"
          option={dataByPlayers({
            dataToFind: ["time_powerslide"],
            type: "movement",
            gamesData: gameInformation,
            titles: [
              t("replay.replayDetail.charts.movement.powerSlideTotDuration"),
            ],
          })}
        />
        <ReactECharts
          className="w-1/3"
          option={dataByPlayers({
            dataToFind: ["avg_powerslide_duration"],
            type: "movement",
            gamesData: gameInformation,
            titles: [
              t("replay.replayDetail.charts.movement.powerSlideAvgDuration"),
            ],
          })}
        />
        <ReactECharts
          className="w-1/3"
          option={dataByPlayers({
            dataToFind: ["count_powerslide"],
            type: "movement",
            gamesData: gameInformation,
            titles: [t("replay.replayDetail.charts.movement.PowerslideCount")],
          })}
        />
      </div>
    </>
  );
};

export { PlayerMovement };

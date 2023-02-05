import React from "react";
import { useTranslation } from "react-i18next";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByTeams } from "../../DetailChart";

const TeamMovement = ({ gameInformation }) => {
  const { t } = useTranslation();
  return (
    <>
      <DataTitle Title={t("replay.replayDetail.teamsTitle")} />
      <div className="flex flex-wrap">
        <ReactECharts
          className="w-full"
          option={dataByTeams({
            gameBlueValue: [
              gameInformation?.blue?.stats?.movement?.time_supersonic_speed.toFixed(
                2
              ),
              gameInformation?.blue?.stats?.movement?.time_boost_speed.toFixed(
                2
              ),
              gameInformation?.blue?.stats?.movement?.time_slow_speed.toFixed(
                2
              ),
            ],
            gameOrangeValue: [
              gameInformation?.orange?.stats?.movement?.time_supersonic_speed.toFixed(
                2
              ),
              gameInformation?.orange?.stats?.movement?.time_boost_speed.toFixed(
                2
              ),
              gameInformation?.orange?.stats?.movement?.time_slow_speed.toFixed(
                2
              ),
            ],
            titles: [
              t('replay.replayDetail.charts.movement.secondsAtSupersonicSpeed'),
              t('replay.replayDetail.charts.movement.secondsAtBoostSpeed'),
              t('replay.replayDetail.charts.movement.secondsAtSlowSpeed'),
            ],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByTeams({
            gameBlueValue: [
              gameInformation?.blue?.stats?.movement?.time_ground.toFixed(2),
              gameInformation?.blue?.stats?.movement?.time_low_air.toFixed(2),
              gameInformation?.blue?.stats?.movement?.time_high_air.toFixed(2),
            ],
            gameOrangeValue: [
              gameInformation?.orange?.stats?.movement?.time_ground.toFixed(2),
              gameInformation?.orange?.stats?.movement?.time_low_air.toFixed(2),
              gameInformation?.orange?.stats?.movement?.time_high_air.toFixed(
                2
              ),
            ],
            titles: [
              t('replay.replayDetail.charts.movement.secondsAtGround'),
              t('replay.replayDetail.charts.movement.secondsLowInAir'),
              t('replay.replayDetail.charts.movement.secondsHighInAir'),
            ],
            chartTitle: t('replay.replayDetail.charts.movement.groundAir'),
          })}
        />
        <ReactECharts
          className="w-1/2"
          option={dataByTeams({
            gameBlueValue: [
              gameInformation?.blue?.stats?.movement?.time_powerslide.toFixed(
                2
              ),
            ],
            gameOrangeValue: [
              gameInformation?.orange?.stats?.movement?.time_powerslide.toFixed(
                2
              ),
            ],
            titles: [t('replay.replayDetail.charts.movement.powerSlideTotDuration')],
            chartTitle: t('replay.replayDetail.charts.movement.TotalTimePowerslide'),
          })}
        />
        <ReactECharts
          className="w-1/2"
          option={dataByTeams({
            gameBlueValue: [
              gameInformation?.blue?.stats?.movement?.count_powerslide,
            ],
            gameOrangeValue: [
              gameInformation?.orange?.stats?.movement?.count_powerslide,
            ],
            titles: [t('replay.replayDetail.charts.movement.PowerslideCount')],
            chartTitle: t('replay.replayDetail.charts.movement.PowerslideCount'),
          })}
        />
      </div>
    </>
  );
};

export { TeamMovement };

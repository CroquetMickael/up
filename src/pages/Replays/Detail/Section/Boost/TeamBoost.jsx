import React from "react";
import { useTranslation } from "react-i18next";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByTeams } from "../../DetailChart";

const TeamBoost = ({ gameInformation }) => {
  const { t } = useTranslation();
  return(
  <>
    <DataTitle Title={t('replay.replayDetail.teamsTitle')} />
    <div className="flex flex-wrap">
      <ReactECharts
        className="w-1/2"
        option={dataByTeams({
          gameBlueValue: gameInformation?.blue?.stats?.boost?.bpm,
          gameOrangeValue: gameInformation?.orange?.stats?.boost?.bpm,
          titles: ["BPM"],
        })}
      />
      <ReactECharts
        className="w-1/2"
        option={dataByTeams({
          gameBlueValue: gameInformation?.blue?.stats?.boost?.avg_amount,
          gameOrangeValue: gameInformation?.orange?.stats?.boost?.avg_amount,
          titles: [t("replay.replayDetail.charts.boost.avgBoost")],
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByTeams({
          gameBlueValue: [
            gameInformation?.blue?.stats?.boost?.time_zero_boost,
            gameInformation?.blue?.stats?.boost?.time_full_boost,
          ],
          gameOrangeValue: [
            gameInformation?.orange?.stats?.boost?.time_zero_boost,
            gameInformation?.orange?.stats?.boost?.time_full_boost,
          ],
          titles: [t("replay.replayDetail.charts.boost.noBoost"), t("replay.replayDetail.charts.boost.fullBoost")],
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByTeams({
          gameBlueValue: [
            gameInformation?.blue?.stats?.boost?.count_collected_big,
            gameInformation?.blue?.stats?.boost?.count_stolen_big,
            gameInformation?.blue?.stats?.boost?.count_collected_small,
            gameInformation?.blue?.stats?.boost?.count_stolen_small,
          ],
          gameOrangeValue: [
            gameInformation?.orange?.stats?.boost?.count_collected_big,
            gameInformation?.orange?.stats?.boost?.count_stolen_big,
            gameInformation?.orange?.stats?.boost?.count_collected_small,
            gameInformation?.orange?.stats?.boost?.count_stolen_small,
          ],
          titles: [
            t("replay.replayDetail.charts.boost.pads.bigPads"),
            t("replay.replayDetail.charts.boost.pads.stolenBigPads"),
            t("replay.replayDetail.charts.boost.pads.smallPads"),
            t("replay.replayDetail.charts.boost.pads.stolenSmallPads"),
          ],    
          chartTitle: t("replay.replayDetail.charts.boost.pads.title")
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByTeams({
          gameBlueValue: [
            gameInformation?.blue?.stats?.boost?.amount_overfill,
            gameInformation?.blue?.stats?.boost?.amount_overfill_stolen,
          ],
          gameOrangeValue: [
            gameInformation?.orange?.stats?.boost?.amount_overfill,
            gameInformation?.orange?.stats?.boost?.amount_overfill_stolen,
          ],
          titles: [
            t("replay.replayDetail.charts.boost.overfill.totalOverfill"),
            t("replay.replayDetail.charts.boost.overfill.overfillStollen"),
          ],
          chartTitle: t("replay.replayDetail.charts.boost.overfill.title")
        })}
      />
    </div>
  </>
);
      }

export { TeamBoost };

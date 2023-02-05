import React from "react";
import { useTranslation } from "react-i18next";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByPlayers } from "../../DetailChart";

const PlayerBoost = ({ gameInformation }) => {
  const { t } = useTranslation();
  return (
    <>
      <DataTitle Title={t('replay.replayDetail.playersTitle')} />
      <div className="flex flex-wrap">
        <ReactECharts
          className="w-1/2"
          option={dataByPlayers({
            dataToFind: ["bpm"],
            type: "boost",
            gamesData: gameInformation,
            titles: ["BPM"],
          })}
        />
        <ReactECharts
          className="w-1/2"
          option={dataByPlayers({
            dataToFind: ["avg_amount"],
            type: "boost",
            gamesData: gameInformation,
            titles: [t("replay.replayDetail.charts.boost.avgBoost")],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: ["time_zero_boost", "time_full_boost"],
            type: "boost",
            gamesData: gameInformation,
            titles: [t("replay.replayDetail.charts.boost.noBoost"), t("replay.replayDetail.charts.boost.fullBoost")],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "percent_boost_0_25",
              "percent_boost_25_50",
              "percent_boost_50_75",
              "percent_boost_75_100",
            ],
            type: "boost",
            gamesData: gameInformation,
            chartTitle: t("replay.replayDetail.charts.boost.Timesboost"),
            isFixed: true,
            titles: [
              t("replay.replayDetail.charts.boost.25Timesboost"),
              t("replay.replayDetail.charts.boost.50Timesboost"),
              t("replay.replayDetail.charts.boost.75Timesboost"),
              t("replay.replayDetail.charts.boost.100Timesboost")
            ],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: ["amount_used_while_supersonic"],
            type: "boost",
            gamesData: gameInformation,
            chartTitle: t("replay.replayDetail.charts.boost.boostSupersonicTitle"),
            titles: [t("replay.replayDetail.charts.boost.boostAmoutSupersonic")],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "count_collected_big",
              "count_stolen_big",
              "count_collected_small",
              "count_stolen_small",
            ],
            type: "boost",
            chartTitle: t("replay.replayDetail.charts.boost.pads.title"),
            gamesData: gameInformation,
            titles: [
              t("replay.replayDetail.charts.boost.pads.bigPads"),
              t("replay.replayDetail.charts.boost.pads.stolenBigPads"),
              t("replay.replayDetail.charts.boost.pads.smallPads"),
              t("replay.replayDetail.charts.boost.pads.stolenSmallPads"),
            ],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "amount_collected_big",
              "amount_stolen_big",
              "amount_collected_small",
              "amount_stolen_small",
            ],
            chartTitle: t("replay.replayDetail.charts.boost.pads.amountTitle"),
            type: "boost",
            gamesData: gameInformation,
            titles: [
              t("replay.replayDetail.charts.boost.pads.amountBigPads"),
              t("replay.replayDetail.charts.boost.pads.amountStolenBigPads"),
              t("replay.replayDetail.charts.boost.pads.amountSmallPads"),
              t("replay.replayDetail.charts.boost.pads.amountStolenSmallPads"),
            ],
          })}
        />
        <ReactECharts
          className="w-full"
          option={dataByPlayers({
            dataToFind: [
              "amount_overfill",
              "amount_overfill_stolen",
            ],
            type: "boost",
            chartTitle: t("replay.replayDetail.charts.boost.overfill.title"),
            gamesData: gameInformation,
            titles: [
              t("replay.replayDetail.charts.boost.overfill.totalOverfill"),
              t("replay.replayDetail.charts.boost.overfill.overfillStollen"),
            ],
          })}
        />
      </div>
    </>
  );
}

export { PlayerBoost };

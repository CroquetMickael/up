import React from "react";
import { useTranslation } from "react-i18next";
import { ReactECharts } from "../../../components/Charts/Charts";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";
import { dataByGames } from "./SectionCharts";

const MovementSection = ({ rankData, movement }) => {
  const { t } = useTranslation();
  return (<>
    <DataTitle Title="Movement Management" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title={t("replay.replayDetail.charts.movement.secondsAtSupersonicSpeed")}
        dataToShow={movement.current.timeSupersonicSpeed.average}
        compareData={movement.compared.timeSupersonicSpeed.average}
      />
      <DataCard
        title={t("replay.replayDetail.charts.movement.secondsAtBoostSpeed")}
        dataToShow={movement.current.timeBoostSpeed.average}
        compareData={movement.compared.timeBoostSpeed.average}
      />
      <DataCard
        title={t("replay.replayDetail.charts.movement.secondsAtSlowSpeed")}
        dataToShow={movement.current.timeSlowSpeed.average}
        compareData={movement.compared.timeSlowSpeed.average}
        reversedPourcentageColor
      />
    </div>

    <div>
      <DataTitle Title="Boost Management charts" />
      <div className="flex flex-wrap">
        <h3 className="text-white text-center w-full text-2xl">{t("replay.replayDetail.charts.movement.secondsAtSupersonicSpeed")}</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: movement.current.timeSupersonicSpeed.gamesValue, average: movement.current.timeSupersonicSpeed.average, distance: 115 })} />
        <h3 className="text-white text-center w-full text-2xl">{t("replay.replayDetail.charts.movement.secondsAtBoostSpeed")}</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: movement.current.timeBoostSpeed.gamesValue, average: movement.current.timeBoostSpeed.average, distance: 115 })} />
        <h3 className="text-white text-center w-full text-2xl">{t("replay.replayDetail.charts.movement.secondsAtSlowSpeed")}</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: movement.current.timeSlowSpeed.gamesValue, average: movement.current.timeSlowSpeed.average, distance: 115, reversed: true })} />
      </div>
    </div>
  </>
  )
};

export { MovementSection };

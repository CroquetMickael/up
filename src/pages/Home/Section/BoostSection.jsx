import React from "react";
import { ReactECharts } from "../../../components/Charts/Charts";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";
import { dataByGames, dataByRanks } from "./SectionCharts";

const BoostSection = ({ rankData, boost }) => (
  <>
    <DataTitle Title="Boost Management dashboard" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title="BPM"
        dataToShow={boost.current.bpm.average}
        compareData={boost.compared.bpm.average}
        rankData={rankData && rankData[10]}
      />
      <DataCard
        title="Time zero boost"
        dataToShow={boost.current.timeZeroBoost.average}
        compareData={boost.compared.timeZeroBoost.average}
        rankData={rankData && rankData[37]}
        reversedPourcentageColor
      />
      <DataCard
        title="Time max boost"
        dataToShow={boost.current.timeMaxBoost.average}
        compareData={boost.compared.timeMaxBoost.average}
        reversedPourcentageColor
      />
      <DataCard
        title="Overfill"
        dataToShow={boost.current.overfill.average}
        compareData={boost.compared.overfill.average}
        reversedPourcentageColor
      />
      <DataCard
        title="Overfill Stolen"
        dataToShow={boost.current.overfillStolen.average}
        compareData={boost.compared.overfillStolen.average}
      />
      <DataCard
        title="Taken Big"
        dataToShow={boost.current.takenBig.average}
        compareData={boost.compared.takenBig.average}
        rankData={rankData && rankData[6]}
      />
      <DataCard
        title="Taken Small"
        dataToShow={boost.current.takenSmall.average}
        compareData={boost.compared.takenSmall.average}
        rankData={rankData && rankData[7]}
      />
      <DataCard
        title="Stolen Big"
        dataToShow={boost.current.stolenBig.average}
        compareData={boost.compared.stolenBig.average}
        rankData={rankData && rankData[8]}
      />
      <DataCard
        title="Stolen Small"
        dataToShow={boost.current.stolenSmall.average}
        compareData={boost.compared.stolenSmall.average}
        rankData={rankData && rankData[9]}
      />
    </div>

    <div>
      <DataTitle Title="Boost Management charts" />
      <div className="flex flex-wrap">
        <h3 className={`text-white text-center w-full text-2xl`}>BPM</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[10], average: boost.current.bpm.average, distance: 125 })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.bpm.gamesValue, average: boost.current.bpm.average, distance: 50 })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Time zero boost</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[37], average: boost.current.timeZeroBoost.average, distance: 85, })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.timeZeroBoost.gamesValue, average: boost.current.timeZeroBoost.average, distance: 140, reversed: true })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Time max boost</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: boost.current.timeMaxBoost.gamesValue, average: boost.current.timeMaxBoost.average, distance: 150, reversed: true })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Overfill</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: boost.current.overfill.gamesValue, average: boost.current.overfill.average, distance: 150, reversed: true })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Overfill Stolen</h3>
        <ReactECharts className="w-full" option={dataByGames({ gamesValue: boost.current.overfillStolen.gamesValue, average: boost.current.overfillStolen.average, distance: 175, reversed: false })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Taken Big</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[6], average: boost.current.takenBig.average, distance: 50 })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.takenBig.gamesValue, average: boost.current.takenBig.average, distance: 140, reversed: false })} />

        <h3 className={`text-white text-center w-full text-2xl`}>Taken Small</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[7], average: boost.current.takenSmall.average, distance: 25 })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.takenSmall.gamesValue, average: boost.current.takenSmall.average, distance: 150, reversed: false })} />


        <h3 className={`text-white text-center w-full text-2xl`}>Stolen Big</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[8], average: boost.current.stolenBig.average, distance: 130 })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.stolenBig.gamesValue, average: boost.current.stolenBig.average, distance: 130, reversed: false })} />


        <h3 className={`text-white text-center w-full text-2xl`}>Stolen Small</h3>
        <ReactECharts className="w-full minApp:w-1/2" option={dataByRanks({ rankData: rankData && rankData[9], average: boost.current.stolenSmall.average, distance: 75 })} />
        <ReactECharts className="w-full minApp:w-1/2" option={dataByGames({ gamesValue: boost.current.stolenSmall.gamesValue, average: boost.current.stolenSmall.average, distance: 175, reversed: false })} />
      </div>
    </div>
  </>
);

export { BoostSection };

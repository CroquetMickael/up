import React from "react";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByPlayers, dataByTeams } from "../../DetailChart";

const PlayerMovement = ({ gameInformation }) => (
  <>
    <DataTitle Title="Players overview" />
    <div className="flex flex-wrap">
      <ReactECharts
        className="w-1/2"
        option={dataByPlayers({
          dataToFind: ["avg_speed_percentage"],
          isFixed: true,
          type: "movement",
          gamesData: gameInformation,
          titles: ["Speed (% of max speed)"],
        })}
      />
      <ReactECharts
        className="w-1/2"
        option={dataByPlayers({
          dataToFind: ["total_distance"],
          type: "movement",
          gamesData: gameInformation,
          titles: ["Distance traveled"],
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
          chartTitle: "Speed",
          titles: ["% supersonic speed", "% boost speed", "% slow speed"],
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByPlayers({
          dataToFind: ["percent_ground", "percent_low_air", "percent_high_air"],
          type: "movement",
          gamesData: gameInformation,
          isFixed: true,
          chartTitle: "Ground/Air",
          titles: ["% on ground", "% on low in air", "% on high in air"],
        })}
      />
      <ReactECharts
        className="w-1/3"
        option={dataByPlayers({
          dataToFind: ["time_powerslide"],
          type: "movement",
          gamesData: gameInformation,
          titles: ["Powerslide tot. duration"],
        })}
      />
      <ReactECharts
        className="w-1/3"
        option={dataByPlayers({
          dataToFind: ["avg_powerslide_duration"],
          type: "movement",
          gamesData: gameInformation,
          titles: ["Powerslide avg. duration"],
        })}
      />
      <ReactECharts
        className="w-1/3"
        option={dataByPlayers({
          dataToFind: ["count_powerslide"],
          type: "movement",
          gamesData: gameInformation,
          titles: ["Powerslide count"],
        })}
      />
    </div>
  </>
);

export { PlayerMovement };

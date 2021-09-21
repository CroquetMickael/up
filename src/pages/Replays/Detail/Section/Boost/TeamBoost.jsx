import React from "react";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByTeams } from "../../DetailChart";

const TeamBoost = ({ gameInformation }) => (
  <>
    <DataTitle Title="Teams overview" />
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
          titles: ["Avg. Boost Amount"],
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
          titles: ["Seconds. with 0 boost", "Seconds with 100 boost"],
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
            "Big pads",
            "Stolen big pads",
            "Small pads",
            "Stolen small pads",
          ],    
          chartTitle: "Collected pads"
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
            "Overfill total",
            "Overfill from stolen",
          ],
          chartTitle: "Overfill"
        })}
      />
    </div>
  </>
);

export { TeamBoost };

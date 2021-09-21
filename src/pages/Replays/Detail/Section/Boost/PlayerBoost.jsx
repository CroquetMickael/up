import React from "react";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByPlayers } from "../../DetailChart";

const PlayerBoost = ({ gameInformation }) => (
  <>
    <DataTitle Title="Players overview" />
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
          titles: ["Avg. Boost Amout"],
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByPlayers({
          dataToFind: ["time_zero_boost", "time_full_boost"],
          type: "boost",
          gamesData: gameInformation,
          titles: ["Seconds. with 0 boost", "Seconds. with 100 boost"],
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
          chartTitle: "Boost ranges",
          isFixed: true,
          titles: [
            "% of time. with boost 0-25",
            "% of time. with boost 25-50",
            "% of time. with boost 50-75",
            "% of time. with boost 75-100",
          ],
        })}
      />
      <ReactECharts
        className="w-full"
        option={dataByPlayers({
          dataToFind: ["amount_used_while_supersonic"],
          type: "boost",
          gamesData: gameInformation,
          chartTitle: "Boost used while supersonic",
          titles: ["Amout used while in supersonic"],
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
          chartTitle: "Collected pads",
          gamesData: gameInformation,
          titles: [
            "Big pads",
            "Stolen big pads",
            "Small pads",
            "Stolen small pads",
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
          chartTitle: "Collected amounts",
          type: "boost",
          gamesData: gameInformation,
          titles: [
            "Amout collected (big pads)",
            "Amout stolen (big pads)",
            "Amout collected (small pads)",
            "Amout stolen (small pads)",
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
          chartTitle: "Overfill",
          gamesData: gameInformation,
          titles: [
            "Overfill total",
            "Overfill from stolen",
          ],
        })}
      />
    </div>
  </>
);

export { PlayerBoost };

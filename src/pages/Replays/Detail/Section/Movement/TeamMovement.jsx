import React from "react";
import { ReactECharts } from "../../../../../components/Charts/Charts";
import { DataTitle } from "../../../../Home/components/DataTitle";
import { dataByTeams } from "../../DetailChart";

const TeamMovement = ({ gameInformation }) => (
  <>
    <DataTitle Title="Teams overview" />
    <div className="flex flex-wrap">
      <ReactECharts
        className="w-full"
        option={dataByTeams({
          gameBlueValue: [
            gameInformation?.blue?.stats?.movement?.time_supersonic_speed.toFixed(
              2
            ),
            gameInformation?.blue?.stats?.movement?.time_boost_speed.toFixed(2),
            gameInformation?.blue?.stats?.movement?.time_slow_speed.toFixed(2),
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
            "Seconds at supersonic speed",
            "Seconds at boost speed",
            "Seconds at slow speed",
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
            gameInformation?.orange?.stats?.movement?.time_high_air.toFixed(2),
          ],
          titles: [
            "Seconds at ground",
            "Seconds low in air",
            "Seconds high in air",
          ],
          chartTitle: "Ground/air"
        })}
      />
      <ReactECharts
        className="w-1/2"
        option={dataByTeams({
          gameBlueValue: [
            gameInformation?.blue?.stats?.movement?.time_powerslide.toFixed(2),
          ],
          gameOrangeValue: [
            gameInformation?.orange?.stats?.movement?.time_powerslide.toFixed(2),
          ],
          titles: ["Powerslide tot. duration"],
          chartTitle: "Total time of powerslide"
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
          titles: ["Powerslide count"],
          chartTitle: "Number of powerslide"
        })}
      />
    </div>
  </>
);

export { TeamMovement };

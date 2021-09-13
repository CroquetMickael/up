import React from "react";
import { ReactECharts } from "../../../components/Charts/Charts";
import { rankColorsHex } from "../../../helpers/colorsHelpers";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";

const BoostSection = ({ rankData, boost }) => (
  <>
    <DataTitle Title="Boost Management dashboard" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title="BPM"
        dataToShow={boost.current.bpm}
        compareData={boost.compared.bpm}
        rankData={rankData && rankData[10]}
      />
      <DataCard
        title="Time zero boost"
        dataToShow={boost.current.timeZeroBoost}
        compareData={boost.compared.timeZeroBoost}
        rankData={rankData && rankData[37]}
        reversedPourcentageColor
      />
      <DataCard
        title="Time max boost"
        dataToShow={boost.current.timeMaxBoost}
        compareData={boost.compared.timeMaxBoost}
        reversedPourcentageColor
      />
      <DataCard
        title="Overfill"
        dataToShow={boost.current.overfill}
        compareData={boost.compared.overfill}
        reversedPourcentageColor
      />
      <DataCard
        title="Overfill Stolen"
        dataToShow={boost.current.overfillStolen}
        compareData={boost.compared.overfillStolen}
      />
      <DataCard
        title="Taken Big"
        dataToShow={boost.current.takenBig}
        compareData={boost.compared.takenBig}
        rankData={rankData && rankData[6]}
      />
      <DataCard
        title="Taken Small"
        dataToShow={boost.current.takenSmall}
        compareData={boost.compared.takenSmall}
        rankData={rankData && rankData[7]}
      />
      <DataCard
        title="Stolen Big"
        dataToShow={boost.current.stolenBig}
        compareData={boost.compared.stolenBig}
        rankData={rankData && rankData[8]}
      />
      <DataCard
        title="Stolen Small"
        dataToShow={boost.current.stolenSmall}
        compareData={boost.compared.stolenSmall}
        rankData={rankData && rankData[9]}
      />
    </div>

    <div>
      <DataTitle Title="Boost Management stats by ranks" />
      <div className="flex flex-wrap">
        <ReactECharts title="BPM" option={{
          xAxis: {
            type: 'category',
            data: ['Bronze', 'Silver', 'Gold', 'Platinium', 'Diamond', 'Champion', 'Grand Champion', 'Pros'],
            axisLabel: {
              interval: 0,
              textStyle: {
                color: 'white'
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: 'white'
              }
            }
          },
          series: [{
            data: rankData && rankData[10].points.map(data => {
              return {
                value: data[2].toFixed(0), itemStyle: {
                  color: rankColorsHex[data[0]]
                }
              }
            }),
            type: 'bar',
            markLine: {
              label: {
                normal: {
                  show: true,
                  position: 'end',
                  formatter: `You : ${boost.current.bpm}`,
                  backgroundColor: "transparent",
                  color: "#00cc8a"
                }
              },
              data: [{ name: 'You', yAxis: boost.current.bpm }],
              lineStyle: {
                type: "solid",
                color: "#00cc8a"
              }
            },
            barWidth: '60%'
          }]
        }} />
      </div>
    </div>
  </>
);

export { BoostSection };

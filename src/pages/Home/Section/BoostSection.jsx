import React from "react";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";

const BoostSection = ({ rankData, boost }) => (
  <>
    <DataTitle Title="Boost Management" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title="BPM"
        dataToShow={boost.bpm}
        compareData={rankData && rankData[10]}
      />
      <DataCard
        title="Time zero boost"
        dataToShow={boost.timeZeroBoost}
        compareData={rankData && rankData[37]}
      />
      <DataCard title="Time max boost" dataToShow={boost.timeMaxBoost} />
      <DataCard title="Overfill" dataToShow={boost.overfill} />
      <DataCard title="Overfill Stolen" dataToShow={boost.overfillStolen} />
      <DataCard
        title="Taken Big"
        dataToShow={boost.takenBig}
        compareData={rankData && rankData[6]}
      />
      <DataCard
        title="Taken Small"
        dataToShow={boost.takenSmall}
        compareData={rankData && rankData[7]}
      />
      <DataCard
        title="Stolen Big"
        dataToShow={boost.stolenBig}
        compareData={rankData && rankData[8]}
      />
      <DataCard
        title="Stolen Small"
        dataToShow={boost.stolenSmall}
        compareData={rankData && rankData[9]}
      />
    </div>
  </>
);

export { BoostSection };

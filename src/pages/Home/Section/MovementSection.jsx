import React from "react";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";

const MovementSection = ({ rankData, movement }) => (
  <>
    <DataTitle Title="Movement Management" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title="Time supersonic speed"
        dataToShow={movement.timeSupersonicSpeed}
      />
      <DataCard title="Time boost speed" dataToShow={movement.timeBoostSpeed} />
      <DataCard title="Time slow speed" dataToShow={movement.timeSlowSpeed} />
    </div>
  </>
);

export { MovementSection };

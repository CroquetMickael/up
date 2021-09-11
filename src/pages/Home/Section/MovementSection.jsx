import React from "react";
import { DataCard } from "../components/DataCard";
import { DataTitle } from "../components/DataTitle";

const MovementSection = ({ rankData, movement }) => (
  <>
    <DataTitle Title="Movement Management" />
    <div className="flex flex-wrap text-center p-2">
      <DataCard
        title="Time supersonic speed"
        dataToShow={movement.current.timeSupersonicSpeed}
        compareData={movement.compared.timeSupersonicSpeed}
      />
      <DataCard
        title="Time boost speed"
        dataToShow={movement.current.timeBoostSpeed}
        compareData={movement.compared.timeBoostSpeed}
      />
      <DataCard
        title="Time slow speed"
        dataToShow={movement.current.timeSlowSpeed}
        compareData={movement.compared.timeSlowSpeed}
        reversedPourcentageColor
      />
    </div>
  </>
);

export { MovementSection };

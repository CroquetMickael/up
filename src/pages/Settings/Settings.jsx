import React from "react";
import { useUser } from "../../context/UserContext";
import { DataTitle } from "../Home/components/DataTitle";
import { AutoUpload } from "./section/AutoUpload";
import { AutoLaunch } from "./section/AutoLaunch";

const Settings = () => {
  const { user, setUser } = useUser();

  return (
    <>
      <DataTitle Title="Settings" />
      <div className="flex flex-col">
        <AutoLaunch user={user} setUser={setUser} />
        <AutoUpload user={user} setUser={setUser} />
      </div>
    </>
  );
};

export { Settings };

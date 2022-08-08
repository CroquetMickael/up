import React from "react";
import { useUser } from "../../context/UserContext";
import { DataTitle } from "../Home/components/DataTitle";
import { AutoUpload } from "./section/AutoUpload";
import { AutoLaunch } from "./section/AutoLaunch";
import LanguageComponent from "./section/Language";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { user, setUser } = useUser();
  const { t } = useTranslation();

  return (
    <>
      <DataTitle Title={t("settings.title")} />
      <div className="flex flex-col">
        <AutoLaunch user={user} setUser={setUser} />
        <AutoUpload user={user} setUser={setUser} />
        <LanguageComponent user={user} setUser={setUser} />
      </div>
    </>
  );
};

export { Settings };

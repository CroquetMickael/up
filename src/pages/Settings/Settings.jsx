import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useUser } from "../../context/UserContext";
import { useDB } from "../../hooks/useDB";
import { DataTitle } from "../Home/components/DataTitle";

const Settings = () => {
  const { user, setUser } = useUser();
  const [path, setPath] = useState(user.path);
  const { DBSave, DBSet } = useDB();

  useEffect(() => {
    if (user.path !== path) {
      setUser({ ...user, path: path });
      DBSet("user", { ...user, path: path });
      DBSave();
    }
  }, [DBSave, DBSet, path, setUser, user]);

  return (
    <>
      <DataTitle Title="Settings" />
      <div className="flex flex-col">
        <div className="text-white ml-8 mt-16">
          <h3 className="text-3xl">Automatic upload</h3>
          <div className="flex gap-8">
            <div className="flex gap-8 justify-center items-center">
              <label htmlFor="autoUpload">Enable</label>
              <input
                id="autoUpload"
                type="checkbox"
                checked={user.autoUpload}
                onChange={(e) => {
                  setUser({ ...user, autoUpload: e.target.checked });
                  setPath(e.target.checked ? user.path : "");
                }}
              ></input>
            </div>
            <div>
              <input
                type="file"
                directory=""
                webkitdirectory=""
                onChange={(e) => {
                  if (e.target?.files[0]?.path) {
                    const selectedPath = e.target.files[0].path;
                    const splittedPath = selectedPath.split("\\");
                    splittedPath.pop();
                    setPath(splittedPath.join("\\"));
                  } else {
                    setPath("");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Settings };

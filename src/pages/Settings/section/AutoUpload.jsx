  import React, { useState, useEffect } from "react";
import { useDB } from "../../../hooks/useDB";

const AutoUpload = ({ user, setUser }) => {
  const [path, setPath] = useState(user?.path);
  const { DBSave, DBSet } = useDB();

  useEffect(() => {
    if (user?.path !== path) {
      setUser({ ...user, path: path });
      DBSet("user", { ...user, path: path });
      DBSave();
    }
  }, [DBSave, DBSet, path, setUser, user]);

  return (
    <div className="text-white ml-6 mt-8">
      <h3 className="text-2xl">Automatic upload</h3>
      <div className="flex gap-8 mt-4">
        <div className="flex gap-8 justify-center items-center">
          <label
            htmlFor="autoUpload"
            className="mt-3 inline-flex items-center cursor-pointer"
          >
            <span className="mr-3 text-sm">Enable</span>
            <span className="relative">
              <span className="block w-10 h-6 bg-brandDarker rounded-full shadow-inner"></span>
              <span
                className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform  transform duration-300 ease-in-out ${
                  user?.autoUpload
                    ? " bg-brandSuccess translate-x-full"
                    : "bg-brandRed"
                }`}
              >
                <input
                  id="autoUpload"
                  type="checkbox"
                  checked={user?.autoUpload}
                  onChange={(e) => {
                    setUser({ ...user, autoUpload: e.target.checked });
                    setPath(e.target.checked ? user?.path : "");
                  }}
                  className="absolute opacity-0 w-0 h-0"
                />
              </span>
            </span>
          </label>
        </div>
        <div className="w-full">
          <button className="relative z-10 cursor-pointer bg-brandSub hover:bg-brandSub text-white font-bold py-2 px-4 inline-flex items-center">
            Choose path
            <input
              className="opacity-0 left-0 w-32 py-1 cursor-pointer absolute"
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
          </button>
          <input
            className="py-2 px-4 bg-white rounded-r text-black"
            type="text"
            size={path?.length}
            value={path}
            disabled
            placeholder="Choose a folder path"
          />
        </div>
      </div>
    </div>
  );
};

export { AutoUpload };

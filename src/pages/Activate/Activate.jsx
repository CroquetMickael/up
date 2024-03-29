import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useUser } from "../../context/UserContext";
import { useDB } from "../../hooks/useDB";
import { useHistory } from "react-router";
import { useNotification } from "../../context/Notification/NotificationContext";
import { Language } from "../../i18n/Language";

const Activate = () => {
  const [apiKey, setApiKey] = useState("");
  const { push } = useHistory();
  const { get, data, isResolved, hasError, resetFetchState, isSuccess } =
    useFetch();
  const { DBSet, DBSave } = useDB();
  const { setUser } = useUser();
  const { addNewAlert } = useNotification();

  useEffect(() => {
    if (isResolved) {
      const userData = {
        name: data?.name,
        id: data?.steam_id,
        autoUpload: false,
        autoLaunch: false,
        path: "",
        apiKey,
        lang: Language.EN
      };
      DBSet("user", userData);
      DBSave();
      setUser(userData);
      resetFetchState();
      addNewAlert({ type: "success", message: "We retrieve your data", title: data.name });
    }
    if (hasError) {
      addNewAlert({ type: "error", message: "Your UPLOAD TOKEN is wrong", title: "Something went wrong" });
      resetFetchState();
    }
  }, [DBSave, DBSet, addNewAlert, apiKey, data?.name, data?.steam_id, hasError, isResolved, resetFetchState, setUser]);

  const getUserInfo = () => {
    get("/");
  };

  return (
    <form className="w-full h-full" onSubmit={() => push("/")}>
      <div className="h-full bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
              toto
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>
                  In order for the application to work properly, we retrive the
                  data from <a href="https://ballchasing.com">BallChasing</a>,
                  please insert your UPLOAD TOKEN
                </p>
                <p className="mt-4">
                  You can retrieve your UPLOAD TOKEN here:{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-800 hover:underline"
                    onClick={() =>
                      window.electron.openExternal(
                        "https://ballchasing.com/upload"
                      )
                    }
                  >
                    Click me !
                  </button>
                </p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="apiKey"
                      className="text-xs font-semibold px-1"
                    >
                      Api Key
                    </label>
                    <div className="flex">
                      <input
                        id="apiKey"
                        className="appearance-none bg-white border-2 rounded w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Ball Chasing API KEY"
                        aria-label="Full name"
                        onChange={(e) => {
                          setUser({ apiKey: e.target.value });
                          setApiKey(e.target.value);
                        }}
                      />
                      <button
                        className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => getUserInfo()}
                      >
                        Check
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      disabled={!isSuccess}
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-gray-500"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export { Activate };

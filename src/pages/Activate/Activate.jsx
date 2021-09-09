import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useFetch } from "../../hooks/useFetch";
import { useUser } from "../../context/UserContext";
import { useDB } from "../../hooks/useDB";
import { useHistory } from "react-router";

const Activate = () => {
  const [apiKey, setApiKey] = useState("");
  const { push } = useHistory();
  const { get, data, isResolved, hasError, resetFetchState, isSuccess } =
    useFetch();
  const { db } = useDB();
  const { setUser } = useUser();

  useEffect(() => {
    if (isResolved) {
      const userData = {
        name: data?.name,
        id: data?.steam_id,
        apiKey,
      };
      db.set("user", userData).save();
      setUser(userData);
      resetFetchState();
    }
    if (hasError) {
      console.log("error");
    }
  }, [
    apiKey,
    data?.name,
    data?.steam_id,
    db,
    hasError,
    isResolved,
    resetFetchState,
    setUser,
  ]);

  const getUserInfo = () => {
    get("/");
  };

  return (
    <form className="w-full" onSubmit={() => push("/")}>
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
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
                  please insert your API KEY
                </p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label for="" className="text-xs font-semibold px-1">
                      Api Key
                    </label>
                    <div className="flex">
                      <input
                        class="appearance-none bg-white border-2 rounded w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Jane Doe"
                        aria-label="Full name"
                        onChange={(e) => {
                          setApiKey(e.target.value);
                        }}
                      />
                      <button
                        class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => getUserInfo()}
                      >
                        Check
                      </button>
                    </div>
                    <p>
                      {isSuccess && (
                        <span className="text-green-400">
                          Your data have been retrieve :)
                        </span>
                      )}
                      {isSuccess && !isSuccess && (
                        <span className="text-red-400">
                          It seems you got the wrong API KEY
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      disabled={!isSuccess}
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold disabled:"
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

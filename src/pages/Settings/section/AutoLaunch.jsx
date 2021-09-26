import React from "react";

const AutoLaunch = ({ user, setUser }) => (
  <div className="text-white ml-6 mt-8">
    <h3 className="text-2xl">Auto Launch on startup</h3>
    <div className="flex gap-8 mt-4">
      <div className="flex gap-8 justify-center items-center">
        <label
          htmlFor="autoLaunch"
          className="mt-3 inline-flex items-center cursor-pointer"
        >
          <span className="mr-3 text-sm">Enable</span>
          <span className="relative">
            <span className="block w-10 h-6 bg-brandDarker rounded-full shadow-inner"></span>
            <span
              className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform  transform duration-300 ease-in-out ${
                user?.autoLaunch
                  ? " bg-brandSuccess translate-x-full"
                  : "bg-brandRed"
              }`}
            >
              <input
                id="autoLaunch"
                type="checkbox"
                checked={user?.autoLaunch}
                onChange={(e) => {
                  setUser({ ...user, autoLaunch: e.target.checked });
                }}
                className="absolute opacity-0 w-0 h-0"
              />
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
);

export { AutoLaunch };

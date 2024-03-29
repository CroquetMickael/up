import React from "react";
import { useTranslation } from "react-i18next";
import { MdHome, MdFormatListBulleted, MdSettings } from "react-icons/md";

import { NavLink } from "react-router-dom";
import { useNotification } from "../../context/Notification/NotificationContext";

const routes = [
  {
    path: "/",
    title: "Dashboard",
    icon: <MdHome />,
    exact: true,
  },
  {
    path: "/replays/",
    title: "Replays",
    icon: <MdFormatListBulleted />,
    exact: false,
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed flex flex-col top-8 left-0 w-14 hover:w-64 bg-brandDarker dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-20 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4">
          {routes.map((route) => (
            <li>
              <NavLink
                className="relative flex flex-row items-center w-full h-11 focus:outline-none hover:bg-brandSub dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                to={route.path}
                exact={route.exact}
                activeClassName="bg-brandSub border-blue-500"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  {route.icon}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  {route.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="mb-8">
          <NavLink
            className="relative flex flex-row items-center w-full h-11 focus:outline-none hover:bg-brandSub dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            to="/settings"
            exact
            activeClassName="bg-brandSub border-blue-500"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <MdSettings />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              {t("settings.title")} - v{import.meta.env.VITE_APP_VERSION}
            </span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export { Sidebar };

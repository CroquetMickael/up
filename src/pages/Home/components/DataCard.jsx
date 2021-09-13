import React from "react";
import { rankColors } from "../../../helpers/colorsHelpers";


const getRankData = (dataToShow, compareData) => {
  const rankDatas = compareData?.points;
  const lastRank = rankDatas
    .filter((rank) => rank[2].toFixed(1) <= dataToShow)
    .pop();
  const index = rankDatas.indexOf(lastRank);
  if (index !== -1) {
    if (rankDatas.length > index + 1) {
      return rankColors[rankDatas[index + 1][0]];
    } else if (lastRank) {
      return rankColors[lastRank[0]];
    }
  }
  return "";
};

const getProgression = (dataToShow, compareData) => {
  const value = (((dataToShow - compareData) / compareData) * 100).toFixed(2);
  return value > 0 ? `+${value}` : value
};

const getProgressionColor = (progression, reversedPourcentageColor) => {
  if (progression > 0) {
    return reversedPourcentageColor ? "text-red-400" : "text-brandSuccess";
  } else {
    return reversedPourcentageColor ? "text-brandSuccess" : "text-red-400";
  }
};
const DataCard = ({
  title,
  dataToShow,
  rankData,
  compareData,
  reversedPourcentageColor,
}) => (
  <div className="p-4 sm:w-1/4 w-1/2">
    <div className="bg-white rounded-lg p-2 xl:p-6 shadow-xl">
      <div className="flex flex-col">
        <h2
          className={`title-font font-medium sm:text-4xl text-3xl ${rankData && getRankData(dataToShow, rankData)
            }`}
        >
          {dataToShow}
        </h2>
        <div>
          <span
            className={`text-sm pl-2 ${getProgressionColor(
              getProgression(dataToShow, compareData),
              reversedPourcentageColor
            )}`}
          >
            {getProgression(dataToShow, compareData)}%
          </span>

        </div>
      </div>
      <p className="leading-relaxed font-bold">{title}</p>
    </div>
  </div>
);

export { DataCard };

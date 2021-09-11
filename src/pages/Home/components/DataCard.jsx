import React from "react";

const colors = {
  1: "text-yellow-800",
  4: "text-gray-400",
  7: "text-yellow-400",
  10: "text-blue-400",
  13: "text-blue-600",
  16: "text-purple-400",
  19: "text-pink-300",
  999: "text-red-400",
};
const getRankData = (dataToShow, compareData) => {
  const rankDatas = compareData?.points;
  const lastRank = rankDatas
    .filter((rank) => rank[2].toFixed(1) <= dataToShow)
    .pop();
  const index = rankDatas.indexOf(lastRank);
  if (index !== -1) {
    if (rankDatas.length > index + 1) {
      return colors[rankDatas[index + 1][0]];
    } else if (lastRank) {
      return colors[lastRank[0]];
    }
  }
  return "";
};
const DataCard = ({ title, dataToShow, compareData }) => (
  <div className="p-4 sm:w-1/4 w-1/2">
    <div className="bg-white rounded-lg p-2 xl:p-6 shadow-xl">
      <h2
        className={`title-font font-medium sm:text-4xl text-3xl ${
          compareData && getRankData(dataToShow, compareData)
        }`}
      >
        {dataToShow}
      </h2>
      <p className="leading-relaxed font-bold">{title}</p>
    </div>
  </div>
);

export { DataCard };

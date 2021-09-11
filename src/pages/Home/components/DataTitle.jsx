import React from "react";

const DataTitle = ({ Title }) => (
  <div className="flex flex-wrap w-full mt-8 px-6">
    <div className="w-full mb-6 lg:mb-0">
      <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2">
        {Title}
      </h1>
      <div className="h-1 w-20 bg-indigo-500 rounded"></div>
    </div>
  </div>
);

export { DataTitle };

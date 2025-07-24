import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full gap-2">
      <span className="text-lg font-medium">Loading...</span>
      <div className="animate-spin border-4 border-t-transparent border-red-300 w-10 h-10 rounded-full"></div>
    </div>
  );
};

export default Loading;

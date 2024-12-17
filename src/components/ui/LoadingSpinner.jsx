import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="place-self-center text-gray-800 dark:text-white">
      <AiOutlineLoading3Quarters className="animate-spin text-7xl" />
    </div>
  );
};

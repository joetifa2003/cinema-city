import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";

const Loading = ({ color, className, size = 100 }: any) => {
  return (
    <div
      className={`flex items-center justify-center flex-1 w-full ${className}`}
    >
      <PuffLoader color={color} size={size} />
    </div>
  );
};

export default Loading;

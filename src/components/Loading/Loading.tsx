import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = ({ color, className }: any) => {
  return (
    <div
      className={`flex items-center justify-center flex-1 w-full ${className}`}
    >
      <PuffLoader color={color} size={100} />
    </div>
  );
};

export default Loading;

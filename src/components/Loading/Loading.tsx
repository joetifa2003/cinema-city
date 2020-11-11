import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import * as ngprogress from "nprogress";
import "nprogress/nprogress.css";

const Loading = ({ color, className, size = 100 }: any) => {
  useEffect(() => {
    ngprogress.start();

    return () => {
      ngprogress.done();
    };
  });

  return (
    <div
      className={`flex items-center justify-center flex-1 w-full ${className}`}
    >
      <PuffLoader color={color} size={size} />
    </div>
  );
};

export default Loading;

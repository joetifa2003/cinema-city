import React from "react";
import Spinner from "react-spinkit";

const Loading = ({ color }: any) => {
  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <Spinner name="double-bounce" color={color} className="w-24 h-24" />
    </div>
  );
};

export default Loading;

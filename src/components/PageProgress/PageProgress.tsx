import React from "react";
import Loading from "../Loading/Loading";

const PageProgress = () => {
  return (
    <div className="w-full h-full bg-primary-shades-600">
      <Loading color="white" className="h-full" />
    </div>
  );
};

export default PageProgress;

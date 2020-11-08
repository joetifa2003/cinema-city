import React, { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full c-gap-wrapper">
        <div
          className="container flex flex-wrap p-5 text-black bg-white border-4 border-black c-gap-padding c-gap-5"
          dir="ltr"
        >
          <div className="w-full md:w-1/2">
            <button
              onClick={() => {
                history.push("/admin/add");
              }}
              className="w-full btn-primary"
            >
              Add movie or series
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <button
              onClick={() => {
                history.push("/admin/add_episode");
              }}
              className="w-full btn-primary"
            >
              Add episode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

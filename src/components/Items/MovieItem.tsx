import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const MovieItem = ({ img, name, year, id }: any) => {
  const history = useHistory();

  return (
    <div className="">
      <div
        className="transition-all duration-500 transform cursor-pointer hover:scale-110"
        onClick={() => {
          history.push(`/movie/${id}`);
        }}
      >
        <LazyLoadImage
          alt="Movie 1 (2020)"
          src={img}
          className="rounded-lg shadow-xl"
        />
        <div className="font-bold text-center">{`${name} (${year})`}</div>
      </div>
    </div>
  );
};

export default React.memo(MovieItem);

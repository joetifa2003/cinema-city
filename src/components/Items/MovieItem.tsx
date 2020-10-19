import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const MovieItem = ({ img, name, year, id }: any) => {
  const history = useHistory();

  return (
    <div data-aos="flip-left" className="w-1/3 md:1/4 lg:w-1/6">
      <div
        className="transition-all duration-500 transform cursor-pointer hover:scale-110"
        onClick={() => {
          history.push(`/movie/${id}`);
        }}
      >
        <LazyLoadImage
          alt="Movie 1 (2020)"
          effect="blur"
          src={img}
          className="rounded-lg shadow-xl"
        />
        <div className="font-bold text-center">{`${name} (${year})`}</div>
      </div>
    </div>
  );
};

export default MovieItem;

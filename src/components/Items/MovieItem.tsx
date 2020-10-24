import React from "react";
import { useHistory } from "react-router-dom";
import MovieSeriesInterface, { Type } from "../../models/Movie";
import Image from "react-graceful-image";

const MovieItem = ({
  img,
  name,
  year,
  categories,
  id,
  type,
}: MovieSeriesInterface) => {
  const history = useHistory();

  return (
    <div
      className="relative h-full transition-all duration-500 transform cursor-pointer hover:scale-110 group"
      onClick={() => {
        if (type === Type.MOVIE) return history.push(`/movie/${id}`);
        history.push(`/series/${id}`);
      }}
    >
      <div className="relative">
        {/* <img
          loading="lazy"
          alt="Movie 1 (2020)"uar
          src={img}
          className="rounded-lg shadow-xl"
        /> */}
        <Image
          className="rounded-lg shadow-xl"
          alt="Movie 1 (2020)"
          src={img}
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full p-2 py-5 transition-all duration-500 bg-opacity-75 opacity-0 bg-primary-shades-600 group-hover:opacity-100">
          <div className="mb-2 font-bold text-white">النوع</div>
          <div className="flex flex-wrap">
            {categories?.map((category, index) => (
              <div
                key={index}
                className="px-3 py-2 text-xs font-bold text-white rounded-full bg-primary-shades-700 me-2"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-20 px-2 py-2 text-sm font-bold text-white bg-primary rounded-e-full">
        {type === Type.MOVIE ? "فيلم" : "مسلسل"}
      </div>

      <div className="font-bold text-center">{`${name} (${year})`}</div>
    </div>
  );
};

export default React.memo(MovieItem);

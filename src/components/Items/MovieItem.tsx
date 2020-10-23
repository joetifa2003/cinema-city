import React from "react";
import { useHistory } from "react-router-dom";
import MovieInterface from "../../models/Movie";

const MovieItem = ({ img, name, year, categories, id }: MovieInterface) => {
  const history = useHistory();

  return (
    <div
      className="h-full transition-all duration-500 transform cursor-pointer hover:scale-110 group"
      onClick={() => {
        history.push(`/movie/${id}`);
      }}
    >
      <div className="relative">
        <img
          loading="lazy"
          alt="Movie 1 (2020)"
          src={img}
          className="rounded-lg shadow-xl"
        />
        <div className="absolute top-0 left-0 w-full h-full p-2 py-5 transition-all duration-500 bg-opacity-75 opacity-0 bg-primary-shades-600 group-hover:opacity-100">
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

      <div className="font-bold text-center">{`${name} (${year})`}</div>
    </div>
  );
};

export default React.memo(MovieItem);

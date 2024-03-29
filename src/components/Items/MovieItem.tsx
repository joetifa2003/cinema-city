import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import { Type } from "../../models/MovieSeries";

import Zoom from "react-reveal/Zoom";
import Ratio from "react-ratio";

const MovieItem = ({
  img,
  name,
  year,
  categories,
  warnings,
  id,
  type,
  country,
}: {
  img: string;
  name: string;
  year: number;
  categories: string[];
  warnings: string[];
  id: string;
  type: Type;
  country: string;
}) => {
  const history = useHistory();

  return (
    <div
      className="relative w-full h-full overflow-hidden transition-all duration-500 ease-in-out transform cursor-pointer hover:scale-105 group"
      onClick={() => {
        if (type === Type.MOVIE) return history.push(`/movie/${id}`);
        history.push(`/series/${id}`);
      }}
    >
      <div className="relative w-full">
        <Ratio ratio={0.69}>
          <Zoom duration={500}>
            <img
              loading="lazy"
              src={img}
              alt={`${name} (${year})`}
              className="rounded-lg shadow-xl"
              width="100%"
              height="100%"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Zoom>
        </Ratio>
        <div className="absolute top-0 left-0 z-10 w-full h-full p-5 overflow-y-auto bg-opacity-75 rounded-lg bg-primary-shades-600 clip">
          <div className="mb-5">
            <div className="mb-2 font-bold text-white">النوع</div>
            <div className="c-gap-wrapper">
              <div className="flex flex-wrap c-gap c-gap-2">
                {categories?.map((category, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-xs font-bold text-white rounded-full bg-primary-shades-700"
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 font-bold text-white">التصنيف</div>
            <div className="c-gap-wrapper">
              <div className="flex flex-wrap c-gap c-gap-2">
                {warnings?.map((warning, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-xs font-bold text-white bg-red-700 rounded-full"
                  >
                    {warning}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-20 px-2 py-2 text-sm font-bold text-white rounded-l-full bg-primary">
        {type === Type.MOVIE ? "فيلم" : "مسلسل"}
      </div>
      {/* <div className="absolute right-0 w-16 px-2 py-2 text-sm font-bold text-white rounded-l-full top-40 bg-primary">
        {country}
      </div> */}

      <div className="font-bold text-center">{`${name} (${year})`}</div>
    </div>
  );
};

export default memo(MovieItem);

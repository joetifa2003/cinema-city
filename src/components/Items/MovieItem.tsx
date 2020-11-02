import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "react-graceful-image";
import Ratio from "react-ratio";
import { Type } from "../../models/MovieSeries";
import { animated, useSpring } from "react-spring";

const MovieItem = ({
  img,
  name,
  year,
  categories,
  warnings,
  id,
  type,
}: {
  img: string;
  name: string;
  year: number;
  categories: string[];
  warnings: string[];
  id: string;
  type: Type;
}) => {
  const history = useHistory();
  const [hoverd, setHoverd] = useState(false);
  const [overlaySpring, setOverlaySpring] = useSpring(() => ({
    config: {
      tension: 100,
      friction: 20,
    },
    clipPath: "circle(0% at 50% 50%)",
  }));

  setOverlaySpring({
    clipPath: hoverd ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)",
  });

  return (
    <div
      className="relative w-full h-full transition-all duration-500 ease-in-out transform cursor-pointer hover:scale-105 group"
      onClick={() => {
        if (type === Type.MOVIE) return history.push(`/movie/${id}`);
        history.push(`/series/${id}`);
      }}
      onMouseOver={() => setHoverd(true)}
      onMouseOut={() => setHoverd(false)}
    >
      <div className="relative w-full">
        <Ratio ratio={0.69}>
          <Image
            className="rounded-lg shadow-xl"
            alt="Movie 1 (2020)"
            src={img}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </Ratio>
        <animated.div
          className="absolute top-0 left-0 z-10 w-full h-full p-5 bg-opacity-75 rounded-lg bg-primary-shades-600"
          style={{
            ...overlaySpring,
          }}
        >
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
            <div className="mb-2 font-bold text-white">التحذيرات</div>
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
        </animated.div>
      </div>
      <div className="absolute top-0 right-0 w-20 px-2 py-2 text-sm font-bold text-white bg-primary rounded-e-full">
        {type === Type.MOVIE ? "فيلم" : "مسلسل"}
      </div>

      <div className="font-bold text-center">{`${name} (${year})`}</div>
    </div>
  );
};

export default React.memo(MovieItem);

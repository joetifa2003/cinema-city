import React from "react";
import Ratio from "react-ratio";

interface PropTypes {
  name: string;
  desc: string;
  img: string;
  categories: string[];
  imdb: string;
  length: string;
  country: string;
  warnings: string[];
}

const DisplayInfo = ({
  name,
  desc,
  img,
  categories,
  imdb,
  length,
  country,
  warnings,
}: PropTypes) => {
  return (
    <div className="flex flex-col mb-5 md:flex-row">
      <div className="flex justify-center mb-5 me-5 md:mb-0">
        <Ratio ratio={0.69} className="w-64 min-w-64">
          <img
            loading="lazy"
            src={img}
            alt={`${name}`}
            className="rounded-lg shadow-xl"
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%" }}
          />
        </Ratio>
      </div>
      <div className="flex flex-col w-full p-5 rounded-xl bg-primary-shades-600">
        <div dir="auto" className="text-3xl font-bold">
          {name}
        </div>
        <p dir="auto" className="font-bold">
          {desc}
        </p>
        <div className="flex flex-col justify-between pt-16 mt-auto lg:flex-row">
          <div className="mb-5">
            {[
              {
                name: "البلد",
                value: country,
              },
              {
                name: "المده",
                value: length ? `دقيقه ${length}` : "",
                icon: "bx:bx-time",
              },
              {
                name: "IMDB",
                value: imdb,
                icon: "cib:imdb",
                vicon: "",
              },
            ].map((v, i) => (
              <>
                {v.value !== "undefined" && v.value !== "" ? (
                  <>
                    <div className="flex justify-between w-full text-lg font-bold md:w-64">
                      <div className="flex items-center">
                        <div>{v.name}</div>
                        <span
                          className="iconify ms-2"
                          data-icon={v.icon}
                          data-inline="false"
                        ></span>
                      </div>
                      <div className="flex items-center">
                        <div>{v.value}</div>
                        <span
                          className="ms-2 iconify"
                          data-icon={v.vicon}
                          data-inline="false"
                        ></span>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
          <div>
            <div className="mb-5">
              <div className="mb-2 text-xl font-bold text-white">النوع</div>
              <div className="c-gap-wrapper">
                <div className="flex flex-wrap c-gap-padding c-gap-2">
                  {categories?.map((category, index) => (
                    <div>
                      <div
                        key={index}
                        className="px-3 py-2 text-base font-bold text-white rounded-full bg-primary-shades-700"
                      >
                        {category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xl font-bold text-white">التصنيف</div>
              <div className="c-gap-wrapper">
                <div className="flex flex-wrap c-gap-padding c-gap-2">
                  {warnings?.map((warning, index) => (
                    <div>
                      <div
                        key={index}
                        className="px-3 py-2 text-base font-bold text-white bg-red-700 rounded-full"
                      >
                        {warning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DisplayInfo);

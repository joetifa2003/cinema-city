import React, { memo } from "react";
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
        <div dir="auto" className="mb-5 text-3xl font-bold">
          {name}
        </div>
        <p dir="auto" className="font-bold">
          {desc}
        </p>
        <div className="flex flex-col justify-between pt-16 mt-auto">
          <table className="table mb-5 table-bordered table-dark table-striped bg-primary-shades-600">
            <tbody>
              {[
                {
                  name: "البلد",
                  value: country,
                  vicon: `twemoji:flag-for-flag-${country
                    .toLowerCase()
                    .replace("korea", "south-korea")
                    .replace("usa", "united-states")}`,
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
                  vicon: "ant-design:star-filled",
                },
              ].map((v, i) => (
                <>
                  {v.value !== "undefined" && v.value !== "" ? (
                    <tr>
                      <th scope="row" className="border-white">
                        <div className="flex items-center">
                          <div>{v.name}</div>
                          <span
                            className="iconify ms-2"
                            data-icon={v.icon}
                            data-inline="false"
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                          ></span>
                        </div>
                      </th>
                      <td className="border-white">
                        <div className="flex items-center">
                          <div className="font-bold">{v.value}</div>
                          <span
                            className="ms-2 iconify"
                            data-icon={v.vicon}
                            data-inline="false"
                            style={{
                              width: "32px",
                              height: "32px",
                            }}
                          ></span>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </>
              ))}
              <tr>
                <th scope="row" className="border-white">
                  <div className="flex items-center">
                    <div>النوع</div>
                  </div>
                </th>
                <td className="border-white">
                  <div className="flex items-center">
                    <div className="c-gap-wrapper">
                      <div className="flex flex-wrap c-gap-padding c-gap-2">
                        {categories?.map((category, index) => (
                          <div key={index}>
                            <div className="px-3 py-2 text-base font-bold text-white rounded-full bg-primary-shades-800">
                              {category}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" className="border-white">
                  <div className="flex items-center">
                    <div>التصنيف</div>
                  </div>
                </th>
                <td className="border-white">
                  <div className="flex items-center">
                    <div className="c-gap-wrapper">
                      <div className="flex flex-wrap c-gap-padding c-gap-2">
                        {warnings?.map((warning, index) => (
                          <div key={index}>
                            <div className="px-3 py-2 text-base font-bold text-white bg-red-700 rounded-full">
                              {warning}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(DisplayInfo);

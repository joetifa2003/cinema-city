import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayInfo from "../components/DisplayInfo/DisplayInfo";
import MetaTags from "../components/MetaTags/MetaTags";
import VideoDisplay from "../components/VideoDisplay/VideoDisplay";
import { db } from "../firebase";
import MovieSeriesInterface, { Type, Episode } from "../models/Movie";
import { sortBy } from "lodash";

interface ParamTypes {
  id: string;
}

const Series = () => {
  const { id } = useParams<ParamTypes>();

  const [series, setSeries] = useState<MovieSeriesInterface>();
  const [currEpisode, setCurrEpisode] = useState<Episode>();

  useEffect(() => {
    db.collection("MoviesSeries")
      .doc(id)
      .get()
      .then((doc) => {
        const series: any = doc.data();
        series.episodes = sortBy(series.episodes, (episode) => episode.episode);

        setSeries({ ...series });
        setCurrEpisode(series.episodes[0] as Episode);
      });
  }, [id]);

  return (
    <div className="flex flex-col w-full min-h-full bg-primary-shades-600">
      <div className="container flex-1 min-h-full p-5 text-white bg-primary">
        {series && series.type === Type.SERIES ? (
          <>
            <MetaTags
              title={`Cinema City | ${series.name} - جميع الحلقات مترجمة`}
              desc={`Cinema City شاهد الان علي موقع ${series.name}`}
              img={`${series.img}`}
            />
            <DisplayInfo
              name={`${series.name}`}
              desc={`${series.desc}`}
              img={`${series.img}`}
            />
            {currEpisode ? (
              <>
                <VideoDisplay link={`${currEpisode?.link}`} />
                <div
                  className="overflow-x-hidden overflow-y-auto c-gap-wrapper bg-primary-shades-600"
                  style={{
                    maxHeight: "250px",
                  }}
                >
                  <div className="flex flex-col p-5 c-gap c-gap-3">
                    {series.episodes?.map((v, i) => (
                      <div
                        key={i}
                        className={`p-3 font-bold text-white bg-primary rounded-e-lg ${
                          currEpisode?.episode === v.episode
                            ? "bg-primary-shades-400"
                            : ""
                        } hover:bg-primary-shades-400 cursor-pointer`}
                        onClick={() => {
                          setCurrEpisode(v);
                        }}
                      >
                        حلقه {`${v.episode}`}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    className="flex items-center bg-red-600 btn-primary"
                    onClick={() => {
                      window.open(currEpisode?.download_link, "_blank");
                    }}
                  >
                    {`حمل الحلقه ${currEpisode?.episode} الان`}
                    <span
                      className="text-2xl iconify ms-2"
                      data-icon="bi:arrow-down-circle-fill"
                      data-inline="false"
                    ></span>
                  </button>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Series;

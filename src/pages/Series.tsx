import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayInfo from "../components/DisplayInfo/DisplayInfo";
import MetaTags from "../components/MetaTags/MetaTags";
import VideoDisplay from "../components/VideoDisplay/VideoDisplay";
import { db } from "../firebase";
import MovieSeriesInterface, { Type } from "../models/Movie";

interface ParamTypes {
  id: string;
}

interface Episode {
  episode: string;
  link: string;
  download_link: string;
}

const Series = () => {
  const { id } = useParams<ParamTypes>();

  const [series, setSeries] = useState<MovieSeriesInterface>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [currEpisode, setCurrEpisode] = useState<Episode>();

  useEffect(() => {
    db.collection("MoviesSeries")
      .doc(id)
      .get()
      .then((doc) => {
        setSeries({ ...doc.data() });
      });

    db.collection("MoviesSeries")
      .doc(id)
      .collection("Episodes")
      .orderBy("episode", "asc")
      .get()
      .then((snapshot) => {
        const episodes = snapshot.docs.map((doc) => doc.data()) as Episode[];
        setEpisodes(episodes);
        if (!currEpisode) setCurrEpisode(episodes[0]);
      });
  });

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
            <VideoDisplay link={`${currEpisode?.link}`} />
            <div className="c-gap-wrapper bg-primary-shades-600">
              <div className="flex flex-col p-5 c-gap c-gap-3">
                {episodes?.map((v, i) => (
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
      </div>
    </div>
  );
};

export default Series;

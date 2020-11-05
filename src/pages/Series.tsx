import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import DisplayInfo from "../components/DisplayInfo/DisplayInfo";
import Loading from "../components/Loading/Loading";
import MetaTags from "../components/MetaTags/MetaTags";
import VideoDisplay from "../components/VideoDisplay/VideoDisplay";
import { db } from "../firebase";
import Episode from "../models/Episode";
import { Type } from "../models/MovieSeries";
import { SeriesConverter } from "../models/SeriesClass";
import { FacebookProvider, Comments } from "react-facebook";

interface ParamTypes {
  id: string;
}

const Series = () => {
  const { id } = useParams<ParamTypes>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [currEpisode, setCurrEpisode] = useState<Episode>();
  const [lastEpisode, setLastEpisode] = useState<Episode>();

  const series = useRequest(
    () =>
      db
        .collection("MoviesSeries")
        .doc(id)
        .withConverter(SeriesConverter)
        .get()
        .then((doc) => {
          const series = doc.data();
          return series;
        }),
    {
      refreshDeps: [id],
    }
  );

  useEffect(() => {
    db.collection("MoviesSeries")
      .doc(id)
      .collection("Episodes")
      .orderBy("episode", "asc")
      .limit(4)
      .get()
      .then((snapshot) => {
        const episodes = snapshot.docs.map((doc) => doc.data()) as Episode[];

        setEpisodes(episodes);
        setCurrEpisode(episodes[0]);
        setLastEpisode(episodes[episodes.length - 1]);
      });
  }, [id]);

  const loadEpisodes = () => {
    db.collection("MoviesSeries")
      .doc(id)
      .collection("Episodes")
      .orderBy("episode", "asc")
      .startAfter(lastEpisode?.episode)
      .limit(4)
      .get()
      .then((snapshot) => {
        const episodes = snapshot.docs.map((doc) => doc.data()) as Episode[];

        setEpisodes((prev) => [...(prev as any), ...episodes]);
        setLastEpisode(episodes[episodes.length - 1]);
      });
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-primary-shades-600">
      <div className="container flex flex-col flex-1 p-5 text-white bg-primary">
        {series.loading ? (
          <Loading color="white" />
        ) : series.error || !series.data || series.data.type !== Type.SERIES ? (
          <div>Error</div>
        ) : (
          <>
            <MetaTags
              title={`Cinema City | ${series.data.name} - جميع الحلقات مترجمة`}
              desc={`Cinema City شاهد الان علي موقع ${series.data.name}`}
              img={`${series.data.img}`}
            />
            <DisplayInfo
              name={`${series.data.name}`}
              desc={`${series.data.desc}`}
              img={`${series.data.img}`}
              categories={series.data.categories as string[]}
              imdb={`${series.data.imdb}`}
              length={``}
              country={`${series.data.country}`}
              warnings={series.data.warnings as string[]}
            />
            <div className="w-full mb-5">
              <div className="mb-5 text-3xl font-bold border-white">
                اعلان المسلسل
              </div>
              <VideoDisplay link={`${series.data?.trailer}`} />
            </div>
            {currEpisode ? (
              <>
                <VideoDisplay link={`${currEpisode?.link}`} />
                <div
                  className="overflow-x-hidden overflow-y-auto c-gap-wrapper bg-primary-shades-600"
                  style={{
                    maxHeight: "260px",
                  }}
                  id="scrollableDiv"
                >
                  <InfiniteScroll
                    dataLength={episodes?.length || 0}
                    hasMore={
                      lastEpisode != null && (episodes?.length as number) > 1
                    }
                    next={loadEpisodes}
                    loader={
                      <div className="mb-5 text-lg font-bold text-white ms-5">
                        جاري التحميل
                      </div>
                    }
                    scrollableTarget="scrollableDiv"
                    style={{ overflow: "hidden" }}
                  >
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
                  </InfiniteScroll>
                </div>
                <div>
                  <button
                    className="flex items-center mb-5 bg-red-600 btn-primary"
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
            <div className="mb-5 text-3xl font-bold border-white">
              التعليقات
            </div>
            <div className="bg-white">
              <FacebookProvider appId="399996854356097">
                <Comments
                  href={window.location.href}
                  width="100%"
                  colorScheme="light"
                />
              </FacebookProvider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Series;

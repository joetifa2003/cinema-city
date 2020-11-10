import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { MovieConverter } from "../models/MovieClass";
import { Type } from "../models/MovieSeries";
import { useRequest } from "ahooks";
import { FacebookProvider, Comments } from "react-facebook";
import MetaTags from "../components/MetaTags/MetaTags";
import Loading from "../components/Loading/Loading";
import DisplayInfo from "../components/DisplayInfo/DisplayInfo";
import VideoDisplay from "../components/VideoDisplay/VideoDisplay";

interface ParamTypes {
  id: string;
}

const Movie = () => {
  const { id } = useParams<ParamTypes>();

  const movie = useRequest(
    () =>
      db
        .collection("MoviesSeries")
        .doc(id)
        .withConverter(MovieConverter)
        .get()
        .then((doc) => {
          const movie = doc.data();
          return movie;
        }),
    {
      refreshDeps: [id],
    }
  );

  return (
    <div className="flex flex-col w-full min-h-full bg-primary-shades-600">
      <div className="container flex flex-col flex-1 p-5 text-white bg-primary">
        {movie.loading ? (
          <Loading color="white" />
        ) : movie.error || !movie.data || movie.data.type !== Type.MOVIE ? (
          <div>Error</div>
        ) : (
          <>
            <MetaTags
              title={`Cinema City | ${movie.data.name} - مترجم كامل`}
              desc={`Cinema City شاهد الان علي موقع ${movie.data.name}`}
              img={`${movie.data.img}`}
            />
            <DisplayInfo
              name={`${movie.data.name}`}
              desc={`${movie.data.desc}`}
              img={`${movie.data.img}`}
              categories={movie.data.categories as string[]}
              imdb={`${movie.data.imdb}`}
              length={`${movie.data.length}`}
              country={`${movie.data.country}`}
              warnings={movie.data.warnings as string[]}
            />
            <div className="w-full mb-5">
              <div className="mb-5 text-3xl font-bold border-white">
                اعلان الفيلم
              </div>
              <VideoDisplay link={`${movie.data.trailer}`} />
            </div>
            <VideoDisplay link={`${movie.data.server_link}`} />
            <div>
              <button
                className="flex items-center mb-5 bg-red-600 btn-primary"
                onClick={() => {
                  window.open(movie.data?.download_link, "_blank");
                }}
              >
                {`حمل الفيلم الان`}
                <span
                  className="text-2xl iconify ms-2"
                  data-icon="bi:arrow-down-circle-fill"
                  data-inline="false"
                ></span>
              </button>
            </div>
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

export default Movie;

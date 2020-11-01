import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import MetaTags from "../components/MetaTags/MetaTags";
import DisplayInfo from "../components/DisplayInfo/DisplayInfo";
import VideoDisplay from "../components/VideoDisplay/VideoDisplay";
import Loading from "../components/Loading/Loading";
import MovieClass, { MovieConverter } from "../models/MovieClass";
import { Type } from "../models/MovieSeries";

interface ParamTypes {
  id: string;
}

const Movie = () => {
  const { id } = useParams<ParamTypes>();

  const [movie, setMovie] = useState<MovieClass>();

  useEffect(() => {
    db.collection("MoviesSeries")
      .doc(id)
      .withConverter(MovieConverter)
      .get()
      .then((doc) => {
        const movie = doc.data();
        setMovie(movie);
      });
  });

  return (
    <div className="flex flex-col w-full min-h-full bg-primary-shades-600">
      <div className="container flex-1 min-h-full p-5 text-white bg-primary">
        {movie && movie.type === Type.MOVIE ? (
          <>
            <MetaTags
              title={`Cinema City | ${movie.name} - مترجم كامل`}
              desc={`Cinema City شاهد الان علي موقع ${movie.name}`}
              img={`${movie.img}`}
            />
            <DisplayInfo
              name={`${movie.name}`}
              desc={`${movie.desc}`}
              img={`${movie.img}`}
              categories={movie.categories as string[]}
              imdb={`${movie.imdb}`}
              length={`${movie.length}`}
              country={`${movie.country}`}
              warnings={movie.warnings as string[]}
            />
            <div className="w-full mb-5">
              <div className="mb-5 text-3xl font-bold border-white">
                اعلان الفيلم
              </div>
              <VideoDisplay link={`${movie?.trailer}`} />
            </div>
            <VideoDisplay link={`${movie.server_link}`} />
          </>
        ) : (
          <Loading color="white" />
        )}
      </div>
    </div>
  );
};

export default Movie;

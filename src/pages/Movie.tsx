import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import MovieInterface from "../models/Movie";

interface ParamTypes {
  id: string;
}

const Movie = () => {
  const { id } = useParams<ParamTypes>();

  const [movie, setMovie] = useState<MovieInterface>();

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        const { name, img, year, desc, server_link }: any = doc.data();
        setMovie({
          name,
          img,
          year,
          desc,
          server_link,
        });
      });
  });

  return (
    <div className="container min-h-full p-5 text-white bg-primary">
      {movie ? (
        <>
          <div className="flex">
            <div className="me-5">
              <LazyLoadImage
                alt={movie?.name}
                effect="blur"
                src={movie?.img}
                style={{ minWidth: "350px", width: "350px" }}
              />
            </div>
            <div>
              <div className="text-3xl font-bold">{movie?.name}</div>
              <p className="font-bold">{movie?.desc}</p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
                overflow: "hidden",
              }}
            >
              <iframe
                src={`${movie?.server_link}`}
                title="IFRAME"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              ></iframe>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Movie;

import React, { useEffect, useState } from "react";
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
    <div className="w-full min-h-full bg-primary-shades-600">
      <div className="container min-h-full p-5 text-white bg-primary">
        {movie ? (
          <>
            <div className="flex flex-col mb-5 md:flex-row">
              <div
                className="flex justify-center mb-5 me-5 md:mb-0"
                data-aos="fade-up"
              >
                <img
                  loading="lazy"
                  alt={movie?.name}
                  src={movie?.img as string}
                  className="w-64 min-w-64"
                />
              </div>
              <div className="w-full p-5 rounded-xl bg-primary-shades-600">
                <div data-aos="fade-up" className="text-3xl font-bold">
                  {movie?.name}
                </div>
                <p
                  data-aos="fade-up"
                  data-aos-delay="250"
                  className="font-bold"
                >
                  {movie?.desc}
                </p>
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
    </div>
  );
};

export default Movie;

import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import MovieItem from "../components/Items/MovieItem";
import debounce from "lodash/debounce";
import { db } from "../firebase";
import { useTransition, animated, config } from "react-spring";
import MovieSeriesInterface from "../models/Movie";

const Home = () => {
  const [movies, setMovies] = useState<MovieSeriesInterface[]>([]);
  const [searchString, setSearchString] = useState("");
  const setSearchStringLazy = debounce((value) => {
    setSearchString(value);
  }, 500);

  useEffect(() => {
    if (searchString) {
      db.collection("MoviesSeries")
        .where("name_query", "array-contains", searchString.toLocaleLowerCase())
        .get()
        .then((snapshot) => {
          setMovies(
            snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            )
          );
        });
    } else {
      db.collection("MoviesSeries")
        .get()
        .then((snapshot) => {
          setMovies(
            snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            )
          );
        });
    }
  }, [searchString]);

  const movieTransition = useTransition(movies, (movie) => movie?.id as any, {
    config: config.stiff,
    from: {
      opacity: 0,
      transform: "rotateY(90deg)",
      filter: "blur(5px)",
    },
    enter: {
      opacity: 1,
      transform: "rotateY(0deg)",
      filter: "blur(0px)",
    },
    leave: {
      opacity: 0,
      transform: "rotateY(90deg)",
      filter: "blur(5px)",
    },
  });

  return (
    <>
      <Hero />
      <div className="container h-full">
        <div className="h-full">
          <div className="flex flex-wrap justify-between">
            <div className="mb-5 underline-title">الافلام و المسلسلات</div>
            <div className="w-full mb-5 md:w-1/3 md:mb-0">
              <div className="relative flex items-center w-full p-2 border-2 border-black">
                <i
                  className="w-6 h-6 me-2 iconify"
                  data-icon="ant-design:search-outlined"
                ></i>
                <input
                  onChange={(event) => setSearchStringLazy(event.target.value)}
                  type="search"
                  name="Search movies"
                  placeholder="بحث افلام"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="c-gap-wrapper">
            <div className="flex flex-wrap c-gap-padding c-gap-5">
              {movieTransition.map(({ item, props, key }) => (
                <animated.div
                  key={key}
                  style={props}
                  className="w-1/2 md:1/4 lg:w-1/6"
                >
                  <MovieItem
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    year={item.year}
                    categories={item.categories}
                  />
                </animated.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

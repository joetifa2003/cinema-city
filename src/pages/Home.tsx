import React, { lazy, useState } from "react";
import debounce from "lodash/debounce";
import { db } from "../firebase";
import { useTransition, animated } from "react-spring";
import { MovieSeriesConverter } from "../models/MovieSeries";
import Cover from "../assets/Cover.jpg";
import { useRequest } from "ahooks";

const Hero = lazy(() => import("../components/Hero/Hero"));
const Loading = lazy(() => import("../components/Loading/Loading"));
const MetaTags = lazy(() => import("../components/MetaTags/MetaTags"));
const MovieItem = lazy(() => import("../components/Items/MovieItem"));

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const setSearchStringLazy = debounce((value) => {
    setSearchString(value);
  }, 500);

  const movies = useRequest(
    () => {
      if (searchString) {
        return db
          .collection("MoviesSeries")
          .where(
            "name_query",
            "array-contains",
            searchString.toLocaleLowerCase()
          )
          .withConverter(MovieSeriesConverter)
          .get()
          .then((snapshot) => {
            const movies = snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            );
            return movies;
          });
      } else {
        return db
          .collection("MoviesSeries")
          .withConverter(MovieSeriesConverter)
          .orderBy("timestamp", "desc")
          .get()
          .then((snapshot) => {
            const movies = snapshot.docs.map((doc) =>
              Object.assign(doc.data(), { id: doc.id })
            );
            return movies;
          });
      }
    },
    {
      refreshDeps: [searchString],
    }
  );

  const movieTransition = useTransition(
    movies.data || [],
    (movie) => movie.id,
    {
      config: {
        friction: 50,
        tension: 500,
      },
      from: {
        opacity: 0,
        transform: "rotateY(90deg)",
        filter: "grayscale(100%)",
      },
      enter: {
        opacity: 1,
        transform: "rotateY(0deg)",
        filter: "grayscale(0%)",
      },
      leave: {
        opacity: 0,
        transform: "rotateY(90deg)",
        filter: "grayscale(100%)",
      },
    }
  );

  return (
    <>
      <MetaTags
        title="Cinema City | شاهد جميع الافلام و المسلسلات المترجمه الان"
        desc="موقع سينما سيتي لمساهده الافلام و المسلسلات مترجمه باللغة العربيه"
        img={`${Cover}`}
      />
      <Hero />
      <div className="container h-full pt-5">
        <div className="relative h-full">
          <div className="flex flex-wrap justify-between">
            <div className="mb-5 underline-title">الافلام و المسلسلات</div>
            <div className="w-full mb-5 md:w-1/3 md:mb-0">
              <div className="relative flex items-center w-full p-2 text-black border-2 border-white bg-bg">
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
          {movies.loading ? (
            <Loading color="white" className="absolute left-0 top-16" />
          ) : null}
          {movies.error ? (
            <div>Error</div>
          ) : (
            <div className="c-gap-wrapper">
              <div className="flex flex-wrap c-gap-padding c-gap-5">
                {movieTransition.map(({ item, props, key }) => (
                  <animated.div
                    key={key}
                    style={props}
                    className="w-1/2 sm:w-1/3 md:1/4 lg:w-1/5"
                  >
                    <MovieItem
                      id={item.id}
                      img={item.img}
                      name={item.name}
                      year={item.year}
                      categories={item.categories}
                      warnings={item.warnings}
                      type={item.type}
                      country={item.country}
                    />
                  </animated.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

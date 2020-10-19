import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import MovieItem from "../components/Items/MovieItem";
import debounce from "lodash/debounce";
import { db } from "../firebase";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");
  const setSearchStringLazy = debounce((value) => {
    setSearchString(value);
  }, 500);

  useEffect(() => {
    if (searchString) {
      db.collection("movies")
        .where("name_query", "array-contains", searchString.toLocaleLowerCase())
        .get()
        .then((snapshot) => {
          setMovies(snapshot.docs.map((doc) => doc.data()));
        });
    } else {
      db.collection("movies")
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

  return (
    <>
      <Hero />
      <div className="container h-full">
        <div className="h-full">
          <div className="flex justify-between">
            <div className="mb-5 underline-title">الافلام</div>
            <div className="w-full md:w-1/3">
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
              {movies.map((v, i) => (
                <MovieItem
                  key={i}
                  id={v.id}
                  img={v.img}
                  name={v.name}
                  year={v.year}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

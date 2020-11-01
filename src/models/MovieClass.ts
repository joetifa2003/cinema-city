import { classToPlain, plainToClass } from "class-transformer";
import MovieSeries, { Type } from "./MovieSeries";

export default class MovieClass extends MovieSeries {
  constructor(
    id: string,
    timestamp: firebase.firestore.Timestamp,
    name: string,
    img: string,
    desc: string,
    year: number,
    categories: string[],
    warnings: string[],
    trailer: string,
    imdb: string,
    country: string,
    public length: number,
    public server_link?: string,
    public download_link?: string
  ) {
    super(
      id,
      timestamp,
      name,
      img,
      desc,
      year,
      categories,
      warnings,
      trailer,
      imdb,
      country,
      Type.MOVIE
    );
  }
}

export const MovieConverter: firebase.firestore.FirestoreDataConverter<MovieClass> = {
  toFirestore(movie: MovieClass) {
    return classToPlain(movie);
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return plainToClass(MovieClass, data);
  },
};

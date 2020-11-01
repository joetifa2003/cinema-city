import { classToPlain, plainToClass } from "class-transformer";
import Base from "./Base";

export enum Type {
  MOVIE = "movie",
  SERIES = "series",
}

export default class MovieSeries extends Base {
  constructor(
    id: string,
    timestamp: firebase.firestore.Timestamp,
    public name: string,
    public img: string,
    public desc: string,
    public year: number,
    public categories: string[],
    public warnings: string[],
    public trailer: string,
    public imdb: string,
    public country: string,
    public type: Type
  ) {
    super(id, timestamp);
  }
}

export const MovieSeriesConverter: firebase.firestore.FirestoreDataConverter<MovieSeries> = {
  toFirestore(movieSeries: MovieSeries) {
    return classToPlain(movieSeries);
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return plainToClass(MovieSeries, data);
  },
};

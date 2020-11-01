import { classToPlain, plainToClass } from "class-transformer";
import MovieSeries, { Type } from "./MovieSeries";

export default class SeriesClass extends MovieSeries {
  constructor(
    id: string,
    timestamp: firebase.firestore.Timestamp,
    name: string,
    img: string,
    img_name: string,
    desc: string,
    year: number,
    categories: string[],
    warnings: string[],
    trailer: string,
    imdb: string,
    country: string
  ) {
    super(
      id,
      timestamp,
      name,
      img,
      img_name,
      desc,
      year,
      categories,
      warnings,
      trailer,
      imdb,
      country,
      Type.SERIES
    );
  }
}

export const SeriesConverter: firebase.firestore.FirestoreDataConverter<SeriesClass> = {
  toFirestore(series: SeriesClass) {
    return classToPlain(series);
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return plainToClass(SeriesClass, data);
  },
};

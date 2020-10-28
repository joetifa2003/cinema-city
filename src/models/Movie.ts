export enum Type {
  MOVIE = "movie",
  SERIES = "series"
}

export interface Episode {
  episode: string;
  link: string;
  download_link: string;
}

interface MovieSeriesInterface {
  id?: string,
  name?: string,
  img?: string,
  year?: number,
  desc?: string,
  server_link?: string,
  download_link?: string,
  categories?: string[],
  warnings?: string[],
  episodes?: Episode[], 
  trailer?: string, 
  imdb?: string,
  length?: string,
  country?: string,
  type?: Type 
}


export default MovieSeriesInterface
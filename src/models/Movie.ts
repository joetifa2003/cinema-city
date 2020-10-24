export enum Type {
  MOVIE = "movie",
  SERIES = "series"
}

interface MovieSeriesInterface {
  id?: string,
  name?: string,
  img?: string,
  year?: number,
  desc?: string,
  server_link?: string,
  download_link?: string,
  categories?: string[]
  type?: Type 
}


export default MovieSeriesInterface
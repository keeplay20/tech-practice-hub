import client from "./client";
import { popularMoviesOptions } from "./movies";

export const fetchPopularMovies = async (page = 1) => {
  const options = popularMoviesOptions(page);
  return await client(options);
};

import client from "./client";
import {
  popularMoviesOptions,
  searchMoviesOptions,
  movieDetailsOptions,
  trendingMoviesOptions,
} from "./movies";
import { MovieResponse, MovieDetails, SearchResponse } from "../types";

export const fetchPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const options = popularMoviesOptions(page);
  return await client(options);
};

export const fetchTrendingMovies = async (
  timeWindow: "day" | "week" = "week",
  page = 1
): Promise<MovieResponse> => {
  const options = trendingMoviesOptions(timeWindow, page);
  return await client(options);
};

export const searchMovies = async (
  query: string,
  page = 1
): Promise<SearchResponse> => {
  if (!query.trim()) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const options = searchMoviesOptions(query, page);
  return await client(options);
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const options = movieDetailsOptions(movieId);
  return await client(options);
};

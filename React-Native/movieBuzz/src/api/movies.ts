import { API_CONFIG } from "../constants/config";

export const popularMoviesOptions = (page = 1) => ({
  method: "GET",
  url: `${API_CONFIG.BASE_URL}/movie/popular`,
  params: {
    language: API_CONFIG.LANGUAGE,
    page: page.toString(),
    api_key: API_CONFIG.API_KEY,
  },
  headers: {
    accept: "application/json",
  },
});

export const searchMoviesOptions = (query: string, page = 1) => ({
  method: "GET",
  url: `${API_CONFIG.BASE_URL}/search/movie`,
  params: {
    query: query.trim(),
    language: API_CONFIG.LANGUAGE,
    page: page.toString(),
    api_key: API_CONFIG.API_KEY,
    include_adult: "false",
  },
  headers: {
    accept: "application/json",
  },
});

export const movieDetailsOptions = (movieId: number) => ({
  method: "GET",
  url: `${API_CONFIG.BASE_URL}/movie/${movieId}`,
  params: {
    language: API_CONFIG.LANGUAGE,
    api_key: API_CONFIG.API_KEY,
    append_to_response: "credits,videos,similar",
  },
  headers: {
    accept: "application/json",
  },
});

export const trendingMoviesOptions = (
  timeWindow: "day" | "week" = "week",
  page = 1
) => ({
  method: "GET",
  url: `${API_CONFIG.BASE_URL}/trending/movie/${timeWindow}`,
  params: {
    language: API_CONFIG.LANGUAGE,
    page: page.toString(),
    api_key: API_CONFIG.API_KEY,
  },
  headers: {
    accept: "application/json",
  },
});

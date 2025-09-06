import { useState, useEffect, useCallback } from "react";
import { Movie, MovieResponse } from "../types";
import { fetchPopularMovies, fetchTrendingMovies } from "../api/movieService";

interface UseMoviesState {
  popularMovies: Movie[];
  trendingMovies: Movie[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

export const useMovies = () => {
  const [state, setState] = useState<UseMoviesState>({
    popularMovies: [],
    trendingMovies: [],
    loading: true,
    error: null,
    refreshing: false,
  });

  const loadMovies = useCallback(async (isRefresh = false) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: !isRefresh,
        refreshing: isRefresh,
        error: null,
      }));

      // Fetch both popular and trending movies
      const [popularResponse, trendingResponse]: [
        MovieResponse,
        MovieResponse,
      ] = await Promise.all([
        fetchPopularMovies(1),
        fetchTrendingMovies("week", 1),
      ]);

      setState((prev) => ({
        ...prev,
        popularMovies: popularResponse.results,
        trendingMovies: trendingResponse.results,
        loading: false,
        refreshing: false,
        error: null,
      }));
    } catch (error: any) {
      console.error("Error loading movies:", error);

      let errorMessage = "Failed to load movies";

      if (error.response?.status === 401) {
        errorMessage =
          "Invalid API key. Please check your TMDB API key in .env file";
      } else if (error.response?.status === 404) {
        errorMessage = "Movies not found";
      } else if (!error.response) {
        errorMessage = "Network error. Check your internet connection";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: errorMessage,
      }));
    }
  }, []);

  const refreshMovies = useCallback(() => {
    loadMovies(true);
  }, [loadMovies]);

  const retryLoading = useCallback(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    ...state,
    refreshMovies,
    retryLoading,
  };
};

import { useState, useEffect, useCallback } from "react";
import { MovieDetails } from "../types";
import { fetchMovieDetails } from "../api/movieService";

interface UseMovieDetailsState {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<UseMovieDetailsState>({
    movie: null,
    loading: true,
    error: null,
  });

  const loadMovieDetails = useCallback(async () => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const movieDetails = await fetchMovieDetails(movieId);

      setState({
        movie: movieDetails,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Error loading movie details:", error);

      let errorMessage = "Failed to load movie details";

      if (error.response?.status === 401) {
        errorMessage = "Invalid API key. Please check your TMDB API key";
      } else if (error.response?.status === 404) {
        errorMessage = "Movie not found";
      } else if (!error.response) {
        errorMessage = "Network error. Check your internet connection";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState({
        movie: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, [movieId]);

  const retry = useCallback(() => {
    loadMovieDetails();
  }, [loadMovieDetails]);

  useEffect(() => {
    if (movieId) {
      loadMovieDetails();
    }
  }, [movieId, loadMovieDetails]);

  return {
    ...state,
    retry,
  };
};

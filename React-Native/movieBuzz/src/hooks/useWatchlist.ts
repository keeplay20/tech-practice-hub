import { useState, useEffect, useCallback } from "react";
import { Movie, WatchlistItem } from "../types";
import { WatchlistService } from "../services/watchlistService";

interface UseWatchlistState {
  watchlist: WatchlistItem[];
  loading: boolean;
  error: string | null;
  count: number;
}

export const useWatchlist = () => {
  const [state, setState] = useState<UseWatchlistState>({
    watchlist: [],
    loading: true,
    error: null,
    count: 0,
  });

  const loadWatchlist = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const watchlist = await WatchlistService.getWatchlist();

      setState({
        watchlist,
        loading: false,
        error: null,
        count: watchlist.length,
      });
    } catch (error) {
      console.error("Error loading watchlist:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to load watchlist",
      }));
    }
  }, []);

  const addToWatchlist = useCallback(
    async (movie: Movie): Promise<boolean> => {
      try {
        const success = await WatchlistService.addToWatchlist(movie);
        if (success) {
          await loadWatchlist(); // Refresh the list
        }
        return success;
      } catch (error) {
        console.error("Error adding to watchlist:", error);
        return false;
      }
    },
    [loadWatchlist]
  );

  const removeFromWatchlist = useCallback(
    async (movieId: number): Promise<boolean> => {
      try {
        const success = await WatchlistService.removeFromWatchlist(movieId);
        if (success) {
          await loadWatchlist(); // Refresh the list
        }
        return success;
      } catch (error) {
        console.error("Error removing from watchlist:", error);
        return false;
      }
    },
    [loadWatchlist]
  );

  const toggleWatchlist = useCallback(
    async (movie: Movie): Promise<{ added: boolean; success: boolean }> => {
      try {
        const result = await WatchlistService.toggleWatchlist(movie);
        if (result.success) {
          await loadWatchlist(); // Refresh the list
        }
        return result;
      } catch (error) {
        console.error("Error toggling watchlist:", error);
        return { added: false, success: false };
      }
    },
    [loadWatchlist]
  );

  const isInWatchlist = useCallback(
    (movieId: number): boolean => {
      return state.watchlist.some((item) => item.movieId === movieId);
    },
    [state.watchlist]
  );

  const clearWatchlist = useCallback(async (): Promise<boolean> => {
    try {
      const success = await WatchlistService.clearWatchlist();
      if (success) {
        await loadWatchlist(); // Refresh the list
      }
      return success;
    } catch (error) {
      console.error("Error clearing watchlist:", error);
      return false;
    }
  }, [loadWatchlist]);

  const refreshWatchlist = useCallback(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  // Load watchlist on mount
  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  return {
    ...state,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    clearWatchlist,
    refreshWatchlist,
  };
};

/**
 * Hook to check if a specific movie is in watchlist
 * Useful for components that only need to know watchlist status
 */
export const useWatchlistStatus = (movieId: number) => {
  const [isInList, setIsInList] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    try {
      setLoading(true);
      const inList = await WatchlistService.isInWatchlist(movieId);
      setIsInList(inList);
    } catch (error) {
      console.error("Error checking watchlist status:", error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  const toggleStatus = useCallback(async (movie: Movie): Promise<boolean> => {
    try {
      const result = await WatchlistService.toggleWatchlist(movie);
      if (result.success) {
        setIsInList(result.added);
      }
      return result.success;
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    if (movieId) {
      checkStatus();
    }
  }, [movieId, checkStatus]);

  return {
    isInWatchlist: isInList,
    loading,
    toggleWatchlist: toggleStatus,
    refresh: checkStatus,
  };
};

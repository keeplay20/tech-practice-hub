import { useState, useEffect, useCallback, useRef } from "react";
import { Movie, SearchResponse } from "../types";
import { searchMovies } from "../api/movieService";
import { APP_CONFIG } from "../constants/config";

interface UseSearchState {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  totalResults: number;
  page: number;
  hasMorePages: boolean;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
  resultCount: number;
}

export const useSearch = () => {
  const [state, setState] = useState<UseSearchState>({
    query: "",
    results: [],
    loading: false,
    error: null,
    hasSearched: false,
    totalResults: 0,
    page: 1,
    hasMorePages: false,
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const performSearch = useCallback(
    async (searchQuery: string, pageNumber = 1, append = false) => {
      if (!searchQuery.trim()) {
        setState((prev) => ({
          ...prev,
          results: [],
          loading: false,
          error: null,
          hasSearched: false,
          totalResults: 0,
          hasMorePages: false,
        }));
        return;
      }

      try {
        setState((prev) => ({
          ...prev,
          loading: true,
          error: null,
          hasSearched: true,
        }));

        const response: SearchResponse = await searchMovies(
          searchQuery,
          pageNumber
        );

        setState((prev) => ({
          ...prev,
          results: append
            ? [...prev.results, ...response.results]
            : response.results,
          loading: false,
          totalResults: response.total_results,
          page: response.page,
          hasMorePages: response.page < response.total_pages,
          error: null,
        }));

        // Add to search history (only for new searches, not pagination)
        if (!append && response.results.length > 0) {
          const historyItem: SearchHistory = {
            id: `${Date.now()}_${searchQuery}`,
            query: searchQuery,
            timestamp: Date.now(),
            resultCount: response.total_results,
          };

          setSearchHistory((prev) => {
            const filtered = prev.filter(
              (item) => item.query.toLowerCase() !== searchQuery.toLowerCase()
            );
            return [historyItem, ...filtered].slice(
              0,
              APP_CONFIG.MAX_SEARCH_HISTORY
            );
          });
        }
      } catch (error: any) {
        console.error("Search error:", error);

        let errorMessage = "Search failed";
        if (error.response?.status === 401) {
          errorMessage = "Invalid API key. Please check your TMDB API key";
        } else if (!error.response) {
          errorMessage = "Network error. Check your internet connection";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          results: append ? prev.results : [],
        }));
      }
    },
    []
  );

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout
      debounceTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, APP_CONFIG.SEARCH_DEBOUNCE);
    },
    [performSearch]
  );

  const setQuery = useCallback(
    (newQuery: string) => {
      setState((prev) => ({ ...prev, query: newQuery }));
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  const loadMore = useCallback(() => {
    if (state.hasMorePages && !state.loading && state.query.trim()) {
      performSearch(state.query, state.page + 1, true);
    }
  }, [
    state.hasMorePages,
    state.loading,
    state.query,
    state.page,
    performSearch,
  ]);

  const clearSearch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      query: "",
      results: [],
      loading: false,
      error: null,
      hasSearched: false,
      totalResults: 0,
      page: 1,
      hasMorePages: false,
    }));

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  const searchFromHistory = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, query }));
      performSearch(query);
    },
    [performSearch]
  );

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    setQuery,
    loadMore,
    clearSearch,
    searchHistory,
    searchFromHistory,
    clearHistory,
  };
};

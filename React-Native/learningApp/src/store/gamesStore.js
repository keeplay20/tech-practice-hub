/**
 * Zustand store — normalized game entities + ordered id list.
 *
 * Interview talking points:
 * - `entities` map: O(1) lookup, stable references for memoized cards
 * - `ids` array: preserves server sort order for FlatList
 * - `favorites` kept separate so toggling doesn't reshuffle the list
 * - Request-id guard cancels stale responses when search changes mid-flight
 */

import { create } from 'zustand';
import { fetchGames, PAGE_SIZE } from '../services/gamesApi';

/** @typedef {{ id: string, title: string, genre: string, rating: number, imageUrl: string }} Game */

/** @typedef {'idle' | 'loading' | 'loadingMore' | 'refreshing' | 'success' | 'error'} FetchStatus */

/**
 * @typedef {Object} GamesState
 * @property {Record<string, Game>} entities
 * @property {string[]} ids
 * @property {Record<string, true>} favorites
 * @property {string} searchQuery
 * @property {number} page
 * @property {boolean} hasMore
 * @property {FetchStatus} status
 * @property {string | null} error
 * @property {(query: string) => void} setSearchQuery
 * @property {(query: string) => Promise<void>} searchGames
 * @property {() => Promise<void>} loadInitialGames
 * @property {() => Promise<void>} loadMoreGames
 * @property {() => Promise<void>} refreshGames
 * @property {(gameId: string) => void} toggleFavorite
 * @property {() => Promise<void>} retry
 */

/** Monotonic counter — incremented on every new fetch to drop stale responses */
let activeRequestId = 0;

/** Merge API page into normalized entities without mutating prior state */
function mergeGames(entities, games) {
  const next = { ...entities };
  for (const game of games) {
    next[game.id] = game;
  }
  return next;
}

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<GamesState>>} */
export const useGamesStore = create((set, get) => ({
  entities: {},
  ids: [],
  favorites: {},
  searchQuery: '',
  page: 0,
  hasMore: true,
  status: 'idle',
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  /**
   * Core fetch — shared by initial load, search, refresh, and pagination.
   * @param {{ page: number, append: boolean, refreshing?: boolean }} options
   */
  _fetchPage: async ({ page, append, refreshing = false }) => {
    const requestId = ++activeRequestId;
    const { searchQuery } = get();

    set({
      status: refreshing ? 'refreshing' : append ? 'loadingMore' : 'loading',
      error: null,
    });

    try {
      const { data, hasMore } = await fetchGames({
        query: searchQuery,
        page,
        pageSize: PAGE_SIZE,
      });

      // Ignore out-of-order responses (user typed a new search while request was in flight)
      if (requestId !== activeRequestId) return;

      set((state) => ({
        entities: mergeGames(state.entities, data),
        ids: append ? [...state.ids, ...data.map((g) => g.id)] : data.map((g) => g.id),
        page,
        hasMore,
        status: 'success',
        error: null,
      }));
    } catch (err) {
      if (requestId !== activeRequestId) return;

      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Something went wrong',
        // On first-page failure, clear list so error UI is unambiguous
        ...(append ? {} : { ids: [] }),
      });
    }
  },

  loadInitialGames: async () => {
    const { status } = get();
    if (status === 'loading') return;
    await get()._fetchPage({ page: 1, append: false });
  },

  /** Triggered after debounced search text changes — resets pagination */
  searchGames: async (query) => {
    set({ searchQuery: query, page: 0, hasMore: true });
    await get()._fetchPage({ page: 1, append: false });
  },

  loadMoreGames: async () => {
    const { status, hasMore, page } = get();
    if (!hasMore || status === 'loadingMore' || status === 'loading') return;
    await get()._fetchPage({ page: page + 1, append: true });
  },

  refreshGames: async () => {
    const { status, searchQuery } = get();
    if (status === 'refreshing') return;
    set({ searchQuery });
    await get()._fetchPage({ page: 1, append: false, refreshing: true });
  },

  toggleFavorite: (gameId) =>
    set((state) => {
      const favorites = { ...state.favorites };
      if (favorites[gameId]) {
        delete favorites[gameId];
      } else {
        favorites[gameId] = true;
      }
      return { favorites };
    }),

  retry: async () => {
    const { searchQuery } = get();
    await get().searchGames(searchQuery);
  },
}));

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY || '', // Add your TMDB API key to .env
  LANGUAGE: 'en-US',
  REGION: 'US',
};

// Image sizes for TMDB
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    XLARGE: 'w780',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
  },
  PROFILE: {
    SMALL: 'w185',
    MEDIUM: 'h632',
  },
};

// App Theme
export const COLORS = {
  PRIMARY: '#E50914', // Netflix red
  SECONDARY: '#221F1F',
  BACKGROUND: '#000000',
  SURFACE: '#1a1a1a',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#B3B3B3',
  ACCENT: '#46D369',
  ERROR: '#F40612',
  WARNING: '#FFB800',
  SUCCESS: '#46D369',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: '@moviebuzz:user_profile',
  SELECTED_USER: '@moviebuzz:selected_user',
  WATCHLIST: '@moviebuzz:watchlist',
  FAVORITES: '@moviebuzz:favorites',
  CONTINUE_WATCHING: '@moviebuzz:continue_watching',
  RECENTLY_VIEWED: '@moviebuzz:recently_viewed',
  USER_PREFERENCES: '@moviebuzz:preferences',
  SEARCH_HISTORY: '@moviebuzz:search_history',
  CACHE_METADATA: '@moviebuzz:cache_metadata',
  LAST_SYNC: '@moviebuzz:last_sync',
};

// App Configuration
export const APP_CONFIG = {
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  SEARCH_DEBOUNCE: 300, // 300ms
  PAGE_SIZE: 20,
  MAX_SEARCH_HISTORY: 10,
  ANIMATION_DURATION: 300,
};


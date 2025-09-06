// Base Movie interface from TMDB API
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  video: boolean;
}

// Extended Movie Details interface
export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  imdb_id: string | null;
  homepage: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
  credits?: MovieCredits;
  videos?: MovieVideos;
}

// Supporting interfaces
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Movie Credits
export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  cast_id: number;
  credit_id: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  credit_id: string;
}

// Movie Videos (Trailers, etc.)
export interface MovieVideos {
  id: number;
  results: Video[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

// API Response interfaces
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchResponse extends MovieResponse {
  // Same as MovieResponse but specifically for search
}

// Local app specific interfaces
export interface WatchlistItem {
  movieId: number;
  addedAt: string;
  movie: Movie;
}

export interface ContinueWatchingItem {
  movieId: number;
  progress: number; // 0-100 percentage
  duration: number; // total duration in seconds
  lastWatched: string;
  movie: Movie;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  region: string;
  adultContent: boolean;
  autoplay: boolean;
  downloadQuality: "SD" | "HD" | "FHD";
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  newReleases: boolean;
  recommendations: boolean;
  watchlistUpdates: boolean;
  marketing: boolean;
}

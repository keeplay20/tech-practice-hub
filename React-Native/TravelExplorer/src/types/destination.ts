export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  shortDescription: string;
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category:
    | "mountain"
    | "beach"
    | "city"
    | "desert"
    | "forest"
    | "historical"
    | "cultural";
  rating: number;
  priceRange: "budget" | "mid-range" | "luxury";
  bestTimeToVisit: string[];
  highlights: string[];
  activities: string[];
  climate: string;
  currency: string;
  language: string[];
  visaRequired: boolean;
  isPopular: boolean;
  isFeatured: boolean;
}

export interface FilterOptions {
  category: string[];
  priceRange: string[];
  continent: string[];
  rating: number;
  visaRequired: boolean | null;
}

export interface SearchFilters {
  query: string;
  filters: FilterOptions;
}

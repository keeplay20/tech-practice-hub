import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie, WatchlistItem } from "../types";
import { STORAGE_KEYS } from "../constants/config";

/**
 * Service for managing user's watchlist with persistent storage
 */
export class WatchlistService {
  /**
   * Get all watchlist items
   */
  static async getWatchlist(): Promise<WatchlistItem[]> {
    try {
      const watchlistData = await AsyncStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return watchlistData ? JSON.parse(watchlistData) : [];
    } catch (error) {
      console.error("Error getting watchlist:", error);
      return [];
    }
  }

  /**
   * Add movie to watchlist
   */
  static async addToWatchlist(movie: Movie): Promise<boolean> {
    try {
      const currentWatchlist = await this.getWatchlist();

      // Check if movie already exists
      const exists = currentWatchlist.some((item) => item.movieId === movie.id);
      if (exists) {
        return false; // Already in watchlist
      }

      const newItem: WatchlistItem = {
        movieId: movie.id,
        addedAt: new Date().toISOString(),
        movie: movie,
      };

      const updatedWatchlist = [newItem, ...currentWatchlist];
      await AsyncStorage.setItem(
        STORAGE_KEYS.WATCHLIST,
        JSON.stringify(updatedWatchlist)
      );

      return true;
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      return false;
    }
  }

  /**
   * Remove movie from watchlist
   */
  static async removeFromWatchlist(movieId: number): Promise<boolean> {
    try {
      const currentWatchlist = await this.getWatchlist();
      const updatedWatchlist = currentWatchlist.filter(
        (item) => item.movieId !== movieId
      );

      await AsyncStorage.setItem(
        STORAGE_KEYS.WATCHLIST,
        JSON.stringify(updatedWatchlist)
      );
      return true;
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      return false;
    }
  }

  /**
   * Check if movie is in watchlist
   */
  static async isInWatchlist(movieId: number): Promise<boolean> {
    try {
      const watchlist = await this.getWatchlist();
      return watchlist.some((item) => item.movieId === movieId);
    } catch (error) {
      console.error("Error checking watchlist:", error);
      return false;
    }
  }

  /**
   * Toggle movie in watchlist (add if not present, remove if present)
   */
  static async toggleWatchlist(
    movie: Movie
  ): Promise<{ added: boolean; success: boolean }> {
    try {
      const isInList = await this.isInWatchlist(movie.id);

      if (isInList) {
        const success = await this.removeFromWatchlist(movie.id);
        return { added: false, success };
      } else {
        const success = await this.addToWatchlist(movie);
        return { added: true, success };
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      return { added: false, success: false };
    }
  }

  /**
   * Clear entire watchlist
   */
  static async clearWatchlist(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.WATCHLIST);
      return true;
    } catch (error) {
      console.error("Error clearing watchlist:", error);
      return false;
    }
  }

  /**
   * Get watchlist count
   */
  static async getWatchlistCount(): Promise<number> {
    try {
      const watchlist = await this.getWatchlist();
      return watchlist.length;
    } catch (error) {
      console.error("Error getting watchlist count:", error);
      return 0;
    }
  }
}

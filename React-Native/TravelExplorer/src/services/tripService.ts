import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Trip,
  TripDestination,
  Activity,
  Accommodation,
  Budget,
  BudgetCategory,
} from "../types/trip";

const TRIPS_STORAGE_KEY = "@travel_explorer_trips";
const BUDGET_CATEGORIES_KEY = "@travel_explorer_budget_categories";

// Default budget categories
const DEFAULT_BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: "1",
    name: "Accommodation",
    budget: 0,
    spent: 0,
    color: "#3498db",
    icon: "🏨",
  },
  {
    id: "2",
    name: "Transportation",
    budget: 0,
    spent: 0,
    color: "#2ecc71",
    icon: "✈️",
  },
  {
    id: "3",
    name: "Food & Dining",
    budget: 0,
    spent: 0,
    color: "#e74c3c",
    icon: "🍽️",
  },
  {
    id: "4",
    name: "Activities",
    budget: 0,
    spent: 0,
    color: "#f39c12",
    icon: "🎯",
  },
  {
    id: "5",
    name: "Shopping",
    budget: 0,
    spent: 0,
    color: "#9b59b6",
    icon: "🛍️",
  },
  {
    id: "6",
    name: "Miscellaneous",
    budget: 0,
    spent: 0,
    color: "#95a5a6",
    icon: "📦",
  },
];

export class TripService {
  // Trip Management
  static async getAllTrips(): Promise<Trip[]> {
    try {
      const tripsJson = await AsyncStorage.getItem(TRIPS_STORAGE_KEY);
      return tripsJson ? JSON.parse(tripsJson) : [];
    } catch (error) {
      console.error("Error loading trips:", error);
      return [];
    }
  }

  static async getTripById(id: string): Promise<Trip | null> {
    try {
      const trips = await this.getAllTrips();
      return trips.find((trip) => trip.id === id) || null;
    } catch (error) {
      console.error("Error loading trip:", error);
      return null;
    }
  }

  static async saveTrip(trip: Trip): Promise<boolean> {
    try {
      const trips = await this.getAllTrips();
      const existingIndex = trips.findIndex((t) => t.id === trip.id);

      if (existingIndex >= 0) {
        trips[existingIndex] = { ...trip, updatedAt: new Date().toISOString() };
      } else {
        trips.push(trip);
      }

      await AsyncStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
      return true;
    } catch (error) {
      console.error("Error saving trip:", error);
      return false;
    }
  }

  static async deleteTrip(id: string): Promise<boolean> {
    try {
      const trips = await this.getAllTrips();
      const filteredTrips = trips.filter((trip) => trip.id !== id);
      await AsyncStorage.setItem(
        TRIPS_STORAGE_KEY,
        JSON.stringify(filteredTrips)
      );
      return true;
    } catch (error) {
      console.error("Error deleting trip:", error);
      return false;
    }
  }

  // Trip Creation
  static async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    const newTrip: Trip = {
      id: Date.now().toString(),
      name: tripData.name || "New Trip",
      description: tripData.description || "",
      destinations: tripData.destinations || [],
      startDate: tripData.startDate || new Date().toISOString(),
      endDate: tripData.endDate || new Date().toISOString(),
      budget: tripData.budget || this.createDefaultBudget(),
      status: "planning",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOffline: true,
      ...tripData,
    };

    await this.saveTrip(newTrip);
    return newTrip;
  }

  // Budget Management
  static createDefaultBudget(): Budget {
    return {
      totalBudget: 0,
      spent: 0,
      remaining: 0,
      categories: [...DEFAULT_BUDGET_CATEGORIES],
      currency: "USD",
    };
  }

  static async getBudgetCategories(): Promise<BudgetCategory[]> {
    try {
      const categoriesJson = await AsyncStorage.getItem(BUDGET_CATEGORIES_KEY);
      return categoriesJson
        ? JSON.parse(categoriesJson)
        : DEFAULT_BUDGET_CATEGORIES;
    } catch (error) {
      console.error("Error loading budget categories:", error);
      return DEFAULT_BUDGET_CATEGORIES;
    }
  }

  static async saveBudgetCategories(
    categories: BudgetCategory[]
  ): Promise<boolean> {
    try {
      await AsyncStorage.setItem(
        BUDGET_CATEGORIES_KEY,
        JSON.stringify(categories)
      );
      return true;
    } catch (error) {
      console.error("Error saving budget categories:", error);
      return false;
    }
  }

  static calculateBudgetSpent(trip: Trip): number {
    let totalSpent = 0;

    trip.destinations.forEach((destination) => {
      // Add accommodation cost
      if (destination.accommodation) {
        totalSpent += destination.accommodation.cost;
      }

      // Add activity costs
      destination.activities.forEach((activity) => {
        totalSpent += activity.cost;
      });

      // Add actual cost if available
      if (destination.actualCost) {
        totalSpent += destination.actualCost;
      }
    });

    return totalSpent;
  }

  static updateTripBudget(trip: Trip): Trip {
    const spent = this.calculateBudgetSpent(trip);
    const remaining = trip.budget.totalBudget - spent;

    return {
      ...trip,
      budget: {
        ...trip.budget,
        spent,
        remaining,
      },
    };
  }

  // Destination Management
  static async addDestinationToTrip(
    tripId: string,
    destination: TripDestination
  ): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      trip.destinations.push(destination);
      const updatedTrip = this.updateTripBudget(trip);
      return await this.saveTrip(updatedTrip);
    } catch (error) {
      console.error("Error adding destination to trip:", error);
      return false;
    }
  }

  static async updateDestinationInTrip(
    tripId: string,
    destinationId: string,
    updates: Partial<TripDestination>
  ): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      const destinationIndex = trip.destinations.findIndex(
        (d) => d.id === destinationId
      );
      if (destinationIndex === -1) return false;

      trip.destinations[destinationIndex] = {
        ...trip.destinations[destinationIndex],
        ...updates,
      };
      const updatedTrip = this.updateTripBudget(trip);
      return await this.saveTrip(updatedTrip);
    } catch (error) {
      console.error("Error updating destination in trip:", error);
      return false;
    }
  }

  static async removeDestinationFromTrip(
    tripId: string,
    destinationId: string
  ): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      trip.destinations = trip.destinations.filter(
        (d) => d.id !== destinationId
      );
      const updatedTrip = this.updateTripBudget(trip);
      return await this.saveTrip(updatedTrip);
    } catch (error) {
      console.error("Error removing destination from trip:", error);
      return false;
    }
  }

  // Activity Management
  static async addActivityToDestination(
    tripId: string,
    destinationId: string,
    activity: Activity
  ): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      const destination = trip.destinations.find((d) => d.id === destinationId);
      if (!destination) return false;

      destination.activities.push(activity);
      const updatedTrip = this.updateTripBudget(trip);
      return await this.saveTrip(updatedTrip);
    } catch (error) {
      console.error("Error adding activity to destination:", error);
      return false;
    }
  }

  static async updateActivityInDestination(
    tripId: string,
    destinationId: string,
    activityId: string,
    updates: Partial<Activity>
  ): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      const destination = trip.destinations.find((d) => d.id === destinationId);
      if (!destination) return false;

      const activityIndex = destination.activities.findIndex(
        (a) => a.id === activityId
      );
      if (activityIndex === -1) return false;

      destination.activities[activityIndex] = {
        ...destination.activities[activityIndex],
        ...updates,
      };
      const updatedTrip = this.updateTripBudget(trip);
      return await this.saveTrip(updatedTrip);
    } catch (error) {
      console.error("Error updating activity in destination:", error);
      return false;
    }
  }

  // Data Export/Import
  static async exportTripData(): Promise<string> {
    try {
      const trips = await this.getAllTrips();
      const budgetCategories = await this.getBudgetCategories();
      return JSON.stringify({ trips, budgetCategories }, null, 2);
    } catch (error) {
      console.error("Error exporting trip data:", error);
      return "";
    }
  }

  static async importTripData(data: string): Promise<boolean> {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.trips) {
        await AsyncStorage.setItem(
          TRIPS_STORAGE_KEY,
          JSON.stringify(parsedData.trips)
        );
      }
      if (parsedData.budgetCategories) {
        await AsyncStorage.setItem(
          BUDGET_CATEGORIES_KEY,
          JSON.stringify(parsedData.budgetCategories)
        );
      }
      return true;
    } catch (error) {
      console.error("Error importing trip data:", error);
      return false;
    }
  }

  // Offline Sync
  static async markTripAsOffline(tripId: string): Promise<boolean> {
    try {
      const trip = await this.getTripById(tripId);
      if (!trip) return false;

      trip.isOffline = true;
      return await this.saveTrip(trip);
    } catch (error) {
      console.error("Error marking trip as offline:", error);
      return false;
    }
  }

  static async getOfflineTrips(): Promise<Trip[]> {
    try {
      const trips = await this.getAllTrips();
      return trips.filter((trip) => trip.isOffline);
    } catch (error) {
      console.error("Error getting offline trips:", error);
      return [];
    }
  }
}

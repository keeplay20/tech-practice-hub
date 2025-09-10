export interface Trip {
  id: string;
  name: string;
  description: string;
  destinations: TripDestination[];
  startDate: string;
  endDate: string;
  budget: Budget;
  status: "planning" | "confirmed" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  isOffline: boolean;
  calendarEventId?: string;
}

export interface TripDestination {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationCountry: string;
  arrivalDate: string;
  departureDate: string;
  accommodation?: Accommodation;
  activities: Activity[];
  notes: string;
  estimatedCost: number;
  actualCost?: number;
}

export interface Accommodation {
  id: string;
  name: string;
  type: "hotel" | "hostel" | "airbnb" | "camping" | "other";
  address: string;
  checkIn: string;
  checkOut: string;
  cost: number;
  bookingReference?: string;
  contactInfo?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in hours
  cost: number;
  location: string;
  category:
    | "sightseeing"
    | "adventure"
    | "cultural"
    | "food"
    | "shopping"
    | "relaxation"
    | "transport"
    | "other";
  isBooked: boolean;
  bookingReference?: string;
}

export interface Budget {
  totalBudget: number;
  spent: number;
  remaining: number;
  categories: BudgetCategory[];
  currency: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

export interface TripFilter {
  status: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  budgetRange: {
    min: number | null;
    max: number | null;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  description?: string;
  location?: string;
  tripId: string;
}

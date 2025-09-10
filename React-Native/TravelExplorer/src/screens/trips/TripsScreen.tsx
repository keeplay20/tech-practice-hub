import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Trip } from "../../types/trip";
import { TripService } from "../../services/tripService";
import TripCard from "../../components/trips/TripCard";
import CreateTripModal from "../../components/trips/CreateTripModal";
import TripDetailScreen from "./TripDetailScreen";

export default function TripsScreen(): React.JSX.Element {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTrips = useCallback(async () => {
    try {
      const loadedTrips = await TripService.getAllTrips();
      setTrips(loadedTrips);
    } catch (error) {
      console.error("Error loading trips:", error);
      Alert.alert("Error", "Failed to load trips. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTrips();
    setRefreshing(false);
  }, [loadTrips]);

  const handleTripPress = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleTripCreated = (newTrip: Trip) => {
    setTrips((prevTrips) => [newTrip, ...prevTrips]);
    setShowCreateModal(false);
  };

  const handleTripUpdate = (updatedTrip: Trip) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip))
    );
    setSelectedTrip(updatedTrip);
  };

  const handleTripDelete = async (tripToDelete: Trip) => {
    Alert.alert(
      "Delete Trip",
      `Are you sure you want to delete "${tripToDelete.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await TripService.deleteTrip(tripToDelete.id);
              setTrips((prevTrips) =>
                prevTrips.filter((trip) => trip.id !== tripToDelete.id)
              );
              if (selectedTrip?.id === tripToDelete.id) {
                setSelectedTrip(null);
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete trip. Please try again.");
            }
          },
        },
      ]
    );
  };

  const handleBackFromDetail = () => {
    setSelectedTrip(null);
  };

  const getTripsByStatus = (status: string) => {
    return trips.filter((trip) => trip.status === status);
  };

  const getUpcomingTrips = () => {
    const now = new Date();
    return trips.filter((trip) => {
      const startDate = new Date(trip.startDate);
      return (
        startDate > now &&
        trip.status !== "completed" &&
        trip.status !== "cancelled"
      );
    });
  };

  const getRecentTrips = () => {
    const now = new Date();
    return trips.filter((trip) => {
      const endDate = new Date(trip.endDate);
      return endDate <= now && trip.status === "completed";
    });
  };

  if (selectedTrip) {
    return (
      <TripDetailScreen
        trip={selectedTrip}
        onBack={handleBackFromDetail}
        onTripUpdate={handleTripUpdate}
      />
    );
  }

  const upcomingTrips = getUpcomingTrips();
  const recentTrips = getRecentTrips();
  const planningTrips = getTripsByStatus("planning");

  const renderTripSection = (title: string, tripList: Trip[], icon: string) => {
    if (tripList.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>{icon}</Text>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionCount}>({tripList.length})</Text>
        </View>
        {tripList.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onPress={handleTripPress}
            onDelete={handleTripDelete}
          />
        ))}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="airplane-outline"
        size={64}
        color={colors.textSecondary}
      />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        No trips yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Start planning your next adventure by creating your first trip!
      </Text>
      <TouchableOpacity
        style={[styles.emptyButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowCreateModal(true)}
      >
        <Ionicons name="add" size={20} color={colors.background} />
        <Text style={[styles.emptyButtonText, { color: colors.background }]}>
          Create Your First Trip
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>
            ✈️ My Trips
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Plan and manage your adventures
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading your trips...
          </Text>
        </View>
      ) : trips.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={[]}
          renderItem={() => null}
          keyExtractor={() => "sections"}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <View>
              {renderTripSection("Upcoming Trips", upcomingTrips, "📅")}
              {renderTripSection("Planning", planningTrips, "📝")}
              {renderTripSection("Recent Trips", recentTrips, "🏆")}
            </View>
          }
        />
      )}

      <CreateTripModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTripCreated={handleTripCreated}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  addButton: {
    borderRadius: 24,
    padding: 12,
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

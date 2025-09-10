import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Trip } from "../../types/trip";
import { TripService } from "../../services/tripService";
import TripCard from "../../components/trips/TripCard";
import BudgetTracker from "../../components/trips/BudgetTracker";
import CalendarIntegration from "../../components/trips/CalendarIntegration";

interface TripDetailScreenProps {
  trip: Trip;
  onBack: () => void;
  onTripUpdate: (updatedTrip: Trip) => void;
}

export default function TripDetailScreen({
  trip,
  onBack,
  onTripUpdate,
}: TripDetailScreenProps) {
  const [currentTrip, setCurrentTrip] = useState<Trip>(trip);
  const [activeTab, setActiveTab] = useState<
    "overview" | "budget" | "calendar"
  >("overview");

  useEffect(() => {
    setCurrentTrip(trip);
  }, [trip]);

  const handleTripUpdate = (updatedTrip: Trip) => {
    setCurrentTrip(updatedTrip);
    onTripUpdate(updatedTrip);
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await TripService.deleteTrip(currentTrip.id);
              onBack();
            } catch (error) {
              Alert.alert("Error", "Failed to delete trip. Please try again.");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTripDuration = () => {
    const start = new Date(currentTrip.startDate);
    const end = new Date(currentTrip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return colors.warning;
      case "confirmed":
        return colors.primary;
      case "in-progress":
        return colors.success;
      case "completed":
        return colors.textSecondary;
      case "cancelled":
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Trip Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Trip Status</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(currentTrip.status) },
            ]}
          >
            <Text style={styles.statusBadgeText}>
              {currentTrip.status.replace("-", " ").toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Trip Information */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Trip Information</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Dates</Text>
            <Text style={styles.infoValue}>
              {formatDate(currentTrip.startDate)} -{" "}
              {formatDate(currentTrip.endDate)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{getTripDuration()} days</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Destinations</Text>
            <Text style={styles.infoValue}>
              {currentTrip.destinations.length} location
              {currentTrip.destinations.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {currentTrip.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <Text style={styles.descriptionText}>
              {currentTrip.description}
            </Text>
          </View>
        )}
      </View>

      {/* Destinations */}
      <View style={styles.destinationsCard}>
        <Text style={styles.cardTitle}>Destinations</Text>
        {currentTrip.destinations.length > 0 ? (
          currentTrip.destinations.map((destination, index) => (
            <View key={destination.id} style={styles.destinationItem}>
              <View style={styles.destinationHeader}>
                <Text style={styles.destinationName}>
                  {destination.destinationName}
                </Text>
                <Text style={styles.destinationCountry}>
                  {destination.destinationCountry}
                </Text>
              </View>
              <View style={styles.destinationDates}>
                <Text style={styles.destinationDate}>
                  {formatDate(destination.arrivalDate)} -{" "}
                  {formatDate(destination.departureDate)}
                </Text>
              </View>
              {destination.activities.length > 0 && (
                <Text style={styles.destinationActivities}>
                  {destination.activities.length} activit
                  {destination.activities.length !== 1 ? "ies" : "y"}
                </Text>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="location-outline"
              size={48}
              color={colors.textSecondary}
            />
            <Text style={styles.emptyStateText}>No destinations added yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add destinations to start planning your trip
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderBudget = () => (
    <View style={styles.tabContent}>
      <BudgetTracker trip={currentTrip} onBudgetUpdate={handleTripUpdate} />
    </View>
  );

  const renderCalendar = () => (
    <View style={styles.tabContent}>
      <CalendarIntegration trip={currentTrip} onTripUpdate={handleTripUpdate} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {currentTrip.name}
          </Text>
          <Text style={styles.headerSubtitle}>
            {formatDate(currentTrip.startDate)} -{" "}
            {formatDate(currentTrip.endDate)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTrip}
        >
          <Ionicons name="trash-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "overview" && styles.activeTab]}
          onPress={() => setActiveTab("overview")}
        >
          <Ionicons
            name="list-outline"
            size={20}
            color={
              activeTab === "overview" ? colors.primary : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.activeTabText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "budget" && styles.activeTab]}
          onPress={() => setActiveTab("budget")}
        >
          <Ionicons
            name="cash-outline"
            size={20}
            color={
              activeTab === "budget" ? colors.primary : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "budget" && styles.activeTabText,
            ]}
          >
            Budget
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "calendar" && styles.activeTab]}
          onPress={() => setActiveTab("calendar")}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={
              activeTab === "calendar" ? colors.primary : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "calendar" && styles.activeTabText,
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "budget" && renderBudget()}
        {activeTab === "calendar" && renderCalendar()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 12,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.surface,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  destinationsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  destinationItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  destinationHeader: {
    marginBottom: 4,
  },
  destinationName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  destinationCountry: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  destinationDates: {
    marginBottom: 4,
  },
  destinationDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  destinationActivities: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

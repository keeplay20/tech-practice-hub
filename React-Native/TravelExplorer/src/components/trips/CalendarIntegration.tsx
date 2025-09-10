import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Trip, CalendarEvent } from "../../types/trip";
import { TripService } from "../../services/tripService";

interface CalendarIntegrationProps {
  trip: Trip;
  onTripUpdate: (updatedTrip: Trip) => void;
  style?: any;
}

export default function CalendarIntegration({
  trip,
  onTripUpdate,
  style,
}: CalendarIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createCalendarEvent = async () => {
    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate calendar integration
      // In a real app, you would integrate with the device's calendar
      const eventId = `event_${Date.now()}`;

      const updatedTrip: Trip = {
        ...trip,
        calendarEventId: eventId,
      };

      await TripService.saveTrip(updatedTrip);
      onTripUpdate(updatedTrip);

      Alert.alert(
        "Calendar Event Created",
        "Your trip has been added to your calendar!",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to create calendar event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeCalendarEvent = async () => {
    Alert.alert(
      "Remove from Calendar",
      "Are you sure you want to remove this trip from your calendar?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedTrip: Trip = {
                ...trip,
                calendarEventId: undefined,
              };

              await TripService.saveTrip(updatedTrip);
              onTripUpdate(updatedTrip);

              Alert.alert("Success", "Trip removed from calendar.");
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to remove from calendar. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  const openCalendarApp = () => {
    // In a real app, you would open the device's calendar app
    Alert.alert(
      "Open Calendar",
      "This would open your device's calendar app to view the trip event.",
      [{ text: "OK" }]
    );
  };

  const getTripDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingActivities = () => {
    const now = new Date();
    const upcomingActivities: any[] = [];

    trip.destinations.forEach((destination) => {
      destination.activities.forEach((activity) => {
        const activityDate = new Date(activity.date);
        if (activityDate >= now) {
          upcomingActivities.push({
            ...activity,
            destinationName: destination.destinationName,
            destinationCountry: destination.destinationCountry,
          });
        }
      });
    });

    return upcomingActivities
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const upcomingActivities = getUpcomingActivities();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 Calendar Integration</Text>
        {trip.calendarEventId ? (
          <View style={styles.statusContainer}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={colors.success}
            />
            <Text style={styles.statusText}>Synced</Text>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Ionicons
              name="cloud-offline-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.statusText}>Not Synced</Text>
          </View>
        )}
      </View>

      {/* Trip Overview */}
      <View style={styles.tripOverview}>
        <View style={styles.overviewItem}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewLabel}>Trip Dates</Text>
            <Text style={styles.overviewValue}>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </Text>
          </View>
        </View>

        <View style={styles.overviewItem}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewLabel}>Duration</Text>
            <Text style={styles.overviewValue}>{getTripDuration()} days</Text>
          </View>
        </View>

        <View style={styles.overviewItem}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <View style={styles.overviewContent}>
            <Text style={styles.overviewLabel}>Destinations</Text>
            <Text style={styles.overviewValue}>
              {trip.destinations.length} location
              {trip.destinations.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      </View>

      {/* Calendar Actions */}
      <View style={styles.actionsContainer}>
        {trip.calendarEventId ? (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={openCalendarApp}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.actionButtonText}>View in Calendar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.removeButton]}
              onPress={removeCalendarEvent}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text style={[styles.actionButtonText, styles.removeButtonText]}>
                Remove from Calendar
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={createCalendarEvent}
            disabled={isLoading}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={colors.surface}
            />
            <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
              {isLoading ? "Adding..." : "Add to Calendar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Upcoming Activities */}
      {upcomingActivities.length > 0 && (
        <View style={styles.activitiesContainer}>
          <Text style={styles.activitiesTitle}>📋 Upcoming Activities</Text>
          <ScrollView
            style={styles.activitiesList}
            showsVerticalScrollIndicator={false}
          >
            {upcomingActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.activityDate}>
                    {formatDate(activity.date)} at {formatTime(activity.time)}
                  </Text>
                </View>
                <Text style={styles.activityLocation}>
                  📍 {activity.destinationName}, {activity.destinationCountry}
                </Text>
                <Text style={styles.activityDescription} numberOfLines={2}>
                  {activity.description}
                </Text>
                <View style={styles.activityFooter}>
                  <View style={styles.activityCategory}>
                    <Text style={styles.categoryText}>{activity.category}</Text>
                  </View>
                  <Text style={styles.activityCost}>
                    {trip.budget.currency} {activity.cost.toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Calendar Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Calendar Tips</Text>
        <View style={styles.tipItem}>
          <Ionicons name="bulb-outline" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Sync your trip to get reminders and notifications
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons
            name="notifications-outline"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.tipText}>
            Set up alerts for important dates and activities
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="share-outline" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Share your trip calendar with travel companions
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  tripOverview: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overviewItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  overviewContent: {
    marginLeft: 12,
    flex: 1,
  },
  overviewLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  removeButton: {
    borderColor: colors.error,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 8,
  },
  primaryButtonText: {
    color: colors.surface,
  },
  removeButtonText: {
    color: colors.error,
  },
  activitiesContainer: {
    marginBottom: 16,
  },
  activitiesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  activitiesList: {
    maxHeight: 200,
  },
  activityItem: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  activityHeader: {
    marginBottom: 8,
  },
  activityName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityLocation: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  activityFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityCategory: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  activityCost: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
  },
  tipsContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
});

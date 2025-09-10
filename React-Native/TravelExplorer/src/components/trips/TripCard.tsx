import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Trip } from "../../types/trip";

interface TripCardProps {
  trip: Trip;
  onPress: (trip: Trip) => void;
  onEdit?: (trip: Trip) => void;
  onDelete?: (trip: Trip) => void;
  style?: any;
}

const { width } = Dimensions.get("window");

export default function TripCard({
  trip,
  onPress,
  onEdit,
  onDelete,
  style,
}: TripCardProps) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning":
        return "create-outline";
      case "confirmed":
        return "checkmark-circle-outline";
      case "in-progress":
        return "airplane-outline";
      case "completed":
        return "trophy-outline";
      case "cancelled":
        return "close-circle-outline";
      default:
        return "help-outline";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBudgetProgress = () => {
    if (trip.budget.totalBudget === 0) return 0;
    return (trip.budget.spent / trip.budget.totalBudget) * 100;
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.shadow },
        style,
      ]}
      onPress={() => onPress(trip)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {trip.name}
          </Text>
          <View style={styles.statusContainer}>
            <Ionicons
              name={getStatusIcon(trip.status) as any}
              size={16}
              color={getStatusColor(trip.status)}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(trip.status) },
              ]}
            >
              {trip.status.replace("-", " ").toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(trip)}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete(trip)}
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {trip.description && (
        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {trip.description}
        </Text>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons
            name="time-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {getDuration()} days
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {trip.destinations.length} destination
            {trip.destinations.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      {trip.budget.totalBudget > 0 && (
        <View style={styles.budgetContainer}>
          <View style={styles.budgetHeader}>
            <Text style={[styles.budgetLabel, { color: colors.text }]}>
              Budget
            </Text>
            <Text style={[styles.budgetAmount, { color: colors.text }]}>
              {trip.budget.currency} {trip.budget.spent.toLocaleString()} /{" "}
              {trip.budget.totalBudget.toLocaleString()}
            </Text>
          </View>

          <View
            style={[styles.progressBar, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(getBudgetProgress(), 100)}%`,
                  backgroundColor:
                    getBudgetProgress() > 100 ? colors.error : colors.primary,
                },
              ]}
            />
          </View>

          <Text
            style={[styles.budgetRemaining, { color: colors.textSecondary }]}
          >
            {trip.budget.remaining >= 0 ? "Remaining" : "Over budget"}:{" "}
            {trip.budget.currency}{" "}
            {Math.abs(trip.budget.remaining).toLocaleString()}
          </Text>
        </View>
      )}

      {trip.isOffline && (
        <View style={styles.offlineIndicator}>
          <Ionicons
            name="cloud-offline-outline"
            size={14}
            color={colors.textSecondary}
          />
          <Text style={[styles.offlineText, { color: colors.textSecondary }]}>
            Offline
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    textTransform: "uppercase",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  budgetContainer: {
    marginBottom: 8,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  budgetRemaining: {
    fontSize: 12,
    textAlign: "right",
  },
  offlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  offlineText: {
    fontSize: 12,
    marginLeft: 4,
  },
});

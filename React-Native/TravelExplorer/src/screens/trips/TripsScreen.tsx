import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/colors";

export default function TripsScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>✈️ My Trips</Text>
          <Text style={styles.subtitle}>Plan and manage your adventures</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Create New Trip</Text>
          </TouchableOpacity>

          <View style={styles.tripCard}>
            <Text style={styles.tripTitle}>🇫🇷 Paris Adventure</Text>
            <Text style={styles.tripDate}>March 15-22, 2024</Text>
            <Text style={styles.tripStatus}>Upcoming</Text>
          </View>

          <View style={styles.tripCard}>
            <Text style={styles.tripTitle}>🇯🇵 Tokyo Explorer</Text>
            <Text style={styles.tripDate}>January 5-12, 2024</Text>
            <Text style={styles.tripStatus}>Completed</Text>
          </View>

          <View style={styles.tripCard}>
            <Text style={styles.tripTitle}>🇮🇹 Italian Coast</Text>
            <Text style={styles.tripDate}>June 1-10, 2024</Text>
            <Text style={styles.tripStatus}>Planning</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  tripCard: {
    backgroundColor: colors.surface,
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  tripStatus: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
});

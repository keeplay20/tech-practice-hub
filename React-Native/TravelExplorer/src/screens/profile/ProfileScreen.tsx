import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors } from "../../styles/colors";

export default function ProfileScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileImagePlaceholder}>👤</Text>
          </View>
          <Text style={styles.name}>John Traveler</Text>
          <Text style={styles.email}>john@travelexplorer.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Cities</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>✏️ Edit Profile</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Settings</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📱 Notifications</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🔒 Privacy</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <Text style={[styles.menuText, styles.logoutText]}>🚪 Logout</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.surface,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    fontSize: 40,
    color: colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: colors.surface,
    marginTop: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: colors.surface,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: colors.error,
  },
});

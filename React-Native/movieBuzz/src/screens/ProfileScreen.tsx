import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/config";

const ProfileScreen: React.FC = () => {
  const menuItems = [
    {
      icon: "person-outline",
      title: "Account Settings",
      subtitle: "Manage your account",
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      subtitle: "Push notification preferences",
    },
    {
      icon: "download-outline",
      title: "Downloads",
      subtitle: "Manage downloaded content",
    },
    {
      icon: "shield-checkmark-outline",
      title: "Privacy",
      subtitle: "Privacy and security settings",
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      subtitle: "Get help or contact us",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={COLORS.TEXT_SECONDARY} />
          </View>
          <Text style={styles.name}>Movie Enthusiast</Text>
          <Text style={styles.email}>Phase 3: User Authentication</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Movies Watched</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>In Watchlist</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Hours Watched</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={COLORS.TEXT_SECONDARY}
                />
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.TEXT_SECONDARY}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Coming Soon Notice */}
        <View style={styles.comingSoonSection}>
          <Text style={styles.comingSoonTitle}>🚀 Coming in Future Phases</Text>
          <Text style={styles.comingSoonText}>
            User authentication, personalized recommendations, social features,
            and much more!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.SURFACE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    marginHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: COLORS.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "500",
  },
  menuItemSubtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 2,
  },
  comingSoonSection: {
    margin: 16,
    padding: 24,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  comingSoonTitle: {
    color: COLORS.PRIMARY,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  comingSoonText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ProfileScreen;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

// Import screens
import HomeScreen from "../screens/destinations/HomeScreen";
import DestinationsScreen from "../screens/destinations/DestinationsScreen";
import TripsScreen from "../screens/trips/TripsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Destinations") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Trips") {
            iconName = focused ? "airplane" : "airplane-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Destinations" component={DestinationsScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

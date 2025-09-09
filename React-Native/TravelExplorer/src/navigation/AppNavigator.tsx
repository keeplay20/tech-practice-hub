import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Import navigators
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { useAuthStore } from "../stores/authStore";

export default function AppNavigator(): React.JSX.Element {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  // Initialize Firebase auth listener when app starts
  useEffect(() => {
    initializeAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <NavigationContainer>
        {/* We'll add a proper loading screen later, for now just show auth */}
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

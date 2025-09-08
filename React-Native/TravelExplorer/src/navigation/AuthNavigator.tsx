import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../styles/colors";

// Import screens
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false, // Hide header for login screen
        }}
      />
    </Stack.Navigator>
  );
}

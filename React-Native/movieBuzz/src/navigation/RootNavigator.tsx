import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import UserScreen from "../screens/UserScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"HomeScreen"}
          component={HomeScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

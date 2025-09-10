import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <AppNavigator />
    </>
  );
}

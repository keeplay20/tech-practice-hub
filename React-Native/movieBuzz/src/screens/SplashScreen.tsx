import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { SplashScreenProps } from "../types";

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  // This is the splash screen component that displays the Netflix logo. After 3 seconds navigate to UserScreen
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Navigating to UserScreen");
      navigation.replace("UserScreen"); // Ensure you have UserScreen in your navigator
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logos_netflix.png")}
        resizeMode="contain"
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HomeScreen = ({ route }: any) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={user.image} style={styles.image} />
      <Text style={styles.name}>Welcome, {user.name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeScreen;

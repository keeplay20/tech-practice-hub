import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

const UserScreen = ({ navigation }: any) => {
  const users = [
    { name: "Emily", image: require("../../assets/User1.png") },
    { name: "Ron", image: require("../../assets/User2.png") },
    { name: "Harry", image: require("../../assets/User3.png") },
    { name: "Kids", image: require("../../assets/User4.png") },
  ];

  const handleUserPress = (user: { name: string; image: any }) => {
    navigation.navigate("HomeScreen", { user });
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.centerLogoWrapper}>
          <Image
            source={require("../../assets/logos_netflix.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require("../../assets/edit.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Body content goes here */}
      <View style={styles.gridContainer}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.profileCard}
            onPress={() => handleUserPress(user)}
          >
            <Image source={user.image} style={styles.squareImage} />
            <Text style={styles.profileName}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerRow: {
    justifyContent: "center",
    position: "relative",
  },
  centerLogoWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  logo: {
    height: 45,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: "#fff",
  },
  squareImage: {
    width: 100,
    height: 92,
  },
  profileName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  profileCard: {
    width: "45%",
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 150,
  },
});

export default UserScreen;

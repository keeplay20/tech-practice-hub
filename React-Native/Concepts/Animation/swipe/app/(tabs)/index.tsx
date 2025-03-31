import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";
import { Deck } from "../../src/Deck";
import { Colors } from "@/constants/Colors";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function HomeScreen() {
  const renderCards = (item: any) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  return (
    <>
      <Deck data={DATA} renderCards={renderCards} />
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden", // Ensures image doesn't go outside
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures image fills the card
  },
  text: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
});

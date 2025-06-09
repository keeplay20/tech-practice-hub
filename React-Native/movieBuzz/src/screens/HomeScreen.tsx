import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { fetchPopularMovies } from "../api/movieService";

const HomeScreen = () => {
  console.log("HomeScreen component rendered");
  const [movies, setMovies] = useState([]);

  //   Actual API call
  //   useEffect(() => {
  //     (async () => {
  //       const data = await fetchPopularMovies();
  //       console.log(data.results);
  //     })();
  //   }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>TV Shows</Text>
      <Text style={styles.textStyle}>Movies</Text>
      <Text style={styles.textStyle}>List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  textStyle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomeScreen;

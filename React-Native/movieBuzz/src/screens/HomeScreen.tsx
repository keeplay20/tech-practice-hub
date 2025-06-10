import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { fetchPopularMovies } from "../api/movieService";
import imagePath from "../api/dummyResponse.json";

const HomeScreen = () => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const movie = imagePath[0];

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
      <ImageBackground
        source={{ uri: `${IMAGE_BASE_URL}${movie.backdrop_path}` }}
        style={styles.backgroundImage}
      >
        <View style={styles.navigation}>
          <Image
            source={require("../../assets/logos_netflix.png")}
            style={styles.logoStyle}
            resizeMode="contain"
          />
          <Text style={styles.textStyle}>TV Shows</Text>
          <Text style={styles.textStyle}>Movies</Text>
          <Text style={styles.textStyle}>My List</Text>
        </View>
      </ImageBackground>
      <View style={styles.playRow}></View>
      <View style={styles.preViewRow}>
        <Text style={styles.textStylePreview}>Preview</Text>
        <View style={styles.circlePoster}></View>
      </View>
      <View style={styles.continueWatchingRow}>
        <Text style={styles.textStylePreview}>Continue Watching</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    height: 270,
    width: "100%",
  },
  navigation: {
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoStyle: {
    width: 50,
    height: 50,
  },
  textStyle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  playRow: {
    height: 80,
    backgroundColor: "#000",
  },
  preViewRow: {
    height: 120,
    backgroundColor: "#000",
  },
  circlePoster: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  textStylePreview: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  continueWatchingRow: {
    height: 120,
    backgroundColor: "#000",
  },
});

export default HomeScreen;

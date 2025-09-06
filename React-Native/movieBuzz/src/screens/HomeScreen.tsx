import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMovies } from "../hooks/useMovies";
import MovieList from "../components/movies/MovieList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Movie, RootNavigationProp } from "../types";
import { COLORS, IMAGE_SIZES, API_CONFIG } from "../constants/config";
import imagePath from "../api/dummyResponse.json";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    popularMovies,
    trendingMovies,
    loading,
    error,
    refreshing,
    refreshMovies,
  } = useMovies();

  const featuredMovie = imagePath[0] || popularMovies[0];
  const IMAGE_BASE_URL = `${API_CONFIG.IMAGE_BASE_URL}${IMAGE_SIZES.BACKDROP.LARGE}`;

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("DetailScreen", { movieId: movie.id });
  };

  const handleRetry = () => {
    refreshMovies();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <LoadingSpinner text="Loading movies..." />
      </View>
    );
  }

  if (error && popularMovies.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oops! Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshMovies}
            tintColor={COLORS.TEXT_PRIMARY}
            colors={[COLORS.PRIMARY]}
          />
        }
      >
        {/* Hero Section */}
        {featuredMovie && (
          <ImageBackground
            source={{ uri: `${IMAGE_BASE_URL}${featuredMovie.backdrop_path}` }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
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

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{featuredMovie.title}</Text>
              <Text style={styles.heroOverview} numberOfLines={3}>
                {featuredMovie.overview}
              </Text>
            </View>
          </ImageBackground>
        )}

        {/* Movie Lists */}
        <View style={styles.listsContainer}>
          {popularMovies.length > 0 && (
            <MovieList
              title="Popular Movies"
              movies={popularMovies}
              onMoviePress={handleMoviePress}
              cardSize="medium"
            />
          )}

          {trendingMovies.length > 0 && (
            <MovieList
              title="Trending Now"
              movies={trendingMovies}
              onMoviePress={handleMoviePress}
              cardSize="medium"
            />
          )}

          {/* Placeholder sections for future development */}
          <View style={styles.placeholderSection}>
            <Text style={styles.sectionTitle}>Continue Watching</Text>
            <Text style={styles.placeholderText}>Coming soon...</Text>
          </View>

          <View style={styles.placeholderSection}>
            <Text style={styles.sectionTitle}>My List</Text>
            <Text style={styles.placeholderText}>
              Add movies to see them here
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    height: 400,
    width: "100%",
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  navigation: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoStyle: {
    width: 50,
    height: 50,
  },
  textStyle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "bold",
  },
  heroContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroOverview: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    lineHeight: 22,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listsContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  sectionTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  placeholderSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  placeholderText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    fontStyle: "italic",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default HomeScreen;

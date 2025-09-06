import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Movie } from "../../types";
// import OptimizedImage from "../common/OptimizedImage";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
  onPress: (movie: Movie) => void;
  showTitle?: boolean;
  showRating?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = "medium",
  onPress,
  showTitle = true,
  showRating = false,
}) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const cardSizes = {
    small: { width: width * 0.28, height: width * 0.42 },
    medium: { width: width * 0.35, height: width * 0.525 },
    large: { width: width * 0.45, height: width * 0.675 },
  };

  const cardSize = cardSizes[size];

  const handlePress = () => {
    onPress(movie);
  };

  return (
    <TouchableOpacity
      style={[styles.container, cardSize]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "",
        }}
        style={styles.poster}
        resizeMode="cover"
      />

      {showTitle && (
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      )}

      {showRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: CARD_MARGIN,
    borderRadius: 8,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    flex: 1,
    backgroundColor: "#333",
  },
  titleContainer: {
    padding: 8,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rating: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default MovieCard;

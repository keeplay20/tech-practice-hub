import React from "react";
import { View, Text, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { Movie } from "../../types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  title: string;
  movies: Movie[];
  horizontal?: boolean;
  onMoviePress: (movie: Movie) => void;
  onLoadMore?: () => void;
  loading?: boolean;
  showMovieTitle?: boolean;
  showMovieRating?: boolean;
  cardSize?: "small" | "medium" | "large";
}

const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  horizontal = true,
  onMoviePress,
  onLoadMore,
  loading = false,
  showMovieTitle = false,
  showMovieRating = false,
  cardSize = "medium",
}) => {
  const renderMovieItem: ListRenderItem<Movie> = ({ item }) => (
    <MovieCard
      movie={item}
      size={cardSize}
      onPress={onMoviePress}
      showTitle={showMovieTitle}
      showRating={showMovieRating}
    />
  );

  const keyExtractor = (item: Movie) => item.id.toString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={keyExtractor}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          horizontal ? styles.horizontalContent : styles.verticalContent
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.7}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={5}
        getItemLayout={
          horizontal
            ? undefined
            : (data, index) => ({
                length:
                  cardSize === "small"
                    ? 160
                    : cardSize === "medium"
                      ? 200
                      : 250,
                offset:
                  (cardSize === "small"
                    ? 160
                    : cardSize === "medium"
                      ? 200
                      : 250) * index,
                index,
              })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  horizontalContent: {
    paddingHorizontal: 8,
  },
  verticalContent: {
    paddingHorizontal: 16,
  },
});

export default MovieList;

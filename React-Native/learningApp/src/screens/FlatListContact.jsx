import React, { useCallback, useMemo, useState } from "react";

import { Pressable, StyleSheet, Text, FlatList, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const movieDetails = [
  {
    id: 1,
    name: "Batman",
    rating: 8.5,
    year: 2022,
    section: "trending",
  },
  {
    id: 2,
    name: "Superman",
    rating: 9,
    year: 2021,
    section: "trending",
  },
  {
    id: 3,
    name: "Ironman",
    rating: 8,
    year: 2020,
    section: "trending",
  },
  {
    id: 4,
    name: "Lagaan",
    rating: 10,
    year: 2018,
    section: "popular",
  },
  {
    id: 5,
    name: "Badshaah",
    rating: 7,
    year: 2005,
    section: "popular",
  },
  {
    id: 6,
    name: "Mr India",
    rating: 9,
    year: 1999,
    section: "popular",
  },
  {
    id: 7,
    name: "Doberman",
    rating: 8.5,
    year: 2022,
    section: "trending",
  },
];

const PAGE_SIZE = 2;

export function FlatListMovie() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [movies, setMovies] = useState(movieDetails.slice(0, PAGE_SIZE));

  const onItemClick = useCallback((id) => {
    setSelectedItem(id);
  }, []);

  const sections = useMemo(
    () => [
      {
        id: "1",
        title: "Trending",
        movieNames: movies.filter((movie) => movie.section === "trending"),
      },
      {
        id: "2",
        title: "Popular",
        movieNames: movies.filter((movie) => movie.section === "popular"),
      },
    ],
    [movies],
  );

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const currentLength = movies.length;

      const nextMovies = movieDetails.slice(
        currentLength,
        currentLength + PAGE_SIZE,
      );

      setMovies((prev) => [...prev, ...nextMovies]);

      setHasMore(currentLength + PAGE_SIZE < movieDetails.length);

      setLoading(false);
    }, 1000);
  }, [movies, loading, hasMore]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setMovies(movieDetails.slice(0, PAGE_SIZE));

      setHasMore(true);

      setRefreshing(false);
    }, 1000);
  }, []);

  const renderMovie = useCallback(
    ({ item }) => {
      const isSelected = selectedItem === item.id;

      return (
        <Pressable
          style={[
            styles.card,
            {
              borderColor: isSelected ? "red" : "white",
            },
          ]}
          onPress={() => onItemClick(item.id)}
        >
          <Text
            style={[
              styles.movieName,
              {
                color: isSelected ? "red" : "white",
              },
            ]}
          >
            {item.name}
          </Text>

          <Text style={styles.text}>⭐ {item.rating}</Text>

          <Text style={styles.text}>{item.year}</Text>
        </Pressable>
      );
    },
    [selectedItem, onItemClick],
  );

  const Footer = useCallback(() => {
    if (!loading) return null;

    return <Text style={styles.text}>Loading...</Text>;
  }, [loading]);

  const renderSection = useCallback(
    ({ item }) => {
      return (
        <View style={styles.section}>
          <Text style={styles.heading}>{item.title}</Text>

          <FlatList
            horizontal
            data={item.movieNames}
            renderItem={renderMovie}
            keyExtractor={(movie) => movie.id.toString()}
            showsHorizontalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={Footer}
          />
        </View>
      );
    },
    [renderMovie, handleLoadMore, Footer],
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={() => <Text style={styles.heading}>Movies</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  section: {
    marginVertical: 20,
  },

  heading: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },

  card: {
    width: 150,
    height: 180,
    borderWidth: 1,
    marginHorizontal: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  movieName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  text: {
    color: "white",
    marginTop: 5,
  },
});

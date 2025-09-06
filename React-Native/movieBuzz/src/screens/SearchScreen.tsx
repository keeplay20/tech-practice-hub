import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearch } from "../hooks/useSearch";
import { Movie, RootNavigationProp } from "../types";
import { COLORS } from "../constants/config";
import SearchBar from "../components/common/SearchBar";
import MovieCard from "../components/movies/MovieCard";
import SwipeableMovieCard from "../components/movies/SwipeableMovieCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 3;
const CARD_WIDTH =
  (width - CARD_MARGIN * 2 * CARDS_PER_ROW - 32) / CARDS_PER_ROW;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    query,
    results,
    loading,
    error,
    hasSearched,
    totalResults,
    hasMorePages,
    searchHistory,
    setQuery,
    loadMore,
    clearSearch,
    searchFromHistory,
    clearHistory,
  } = useSearch();

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("DetailScreen", { movieId: movie.id });
  };

  const handleHistoryItemPress = (historyQuery: string) => {
    searchFromHistory(historyQuery);
  };

  const renderMovieItem: ListRenderItem<Movie> = ({ item }) => (
    <View style={styles.movieCardWrapper}>
      <SwipeableMovieCard
        movie={item}
        size="small"
        onPress={handleMoviePress}
        showTitle={true}
        showRating={true}
        enableSwipe={true}
      />
    </View>
  );

  const renderHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleHistoryItemPress(item.query)}
    >
      <Text style={styles.historyQuery}>{item.query}</Text>
      <Text style={styles.historyCount}>
        {item.resultCount} result{item.resultCount !== 1 ? "s" : ""}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centerContent}>
          <LoadingSpinner text="Searching movies..." />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Search Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      );
    }

    if (hasSearched && results.length === 0 && query.trim()) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.noResultsText}>No movies found</Text>
          <Text style={styles.noResultsMessage}>
            Try searching for a different movie title
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContent}>
        <Text style={styles.welcomeText}>🔍 Search Movies</Text>
        <Text style={styles.welcomeMessage}>
          Search through millions of movies from TMDB
        </Text>

        {searchHistory.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearHistoryText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={searchHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.historySeparator} />
              )}
            />
          </View>
        )}
      </View>
    );
  };

  const getItemLayout = (data: any, index: number) => {
    const ITEM_HEIGHT = 280; // Approximate height of movie card with title and rating
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * Math.floor(index / CARDS_PER_ROW),
      index,
    };
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={clearSearch}
        autoFocus={false}
        style={styles.searchBar}
      />

      {hasSearched && results.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {totalResults.toLocaleString()} result
            {totalResults !== 1 ? "s" : ""} for "{query}"
          </Text>
        </View>
      )}

      <FlatList
        data={results}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={CARDS_PER_ROW}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          results.length === 0 ? styles.emptyContainer : styles.contentContainer
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        windowSize={10}
        initialNumToRender={12}
        getItemLayout={results.length > 0 ? getItemLayout : undefined}
        ListFooterComponent={() =>
          hasMorePages && results.length > 0 ? (
            <View style={styles.loadMoreContainer}>
              <LoadingSpinner size="small" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  searchBar: {
    paddingTop: 8,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },
  contentContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  movieCardWrapper: {
    width: CARD_WIDTH,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  welcomeText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  noResultsText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    textAlign: "center",
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
    textAlign: "center",
  },
  historySection: {
    width: "100%",
    maxWidth: 400,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  clearHistoryText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
  historyItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 8,
  },
  historyQuery: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  historyCount: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 2,
  },
  historySeparator: {
    height: 8,
  },
  loadMoreContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default SearchScreen;

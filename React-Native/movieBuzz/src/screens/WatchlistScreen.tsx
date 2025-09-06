import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useWatchlist } from "../hooks/useWatchlist";
import { WatchlistItem, Movie, RootNavigationProp } from "../types";
import { COLORS } from "../constants/config";
import MovieCard from "../components/movies/MovieCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const WatchlistScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    watchlist,
    loading,
    error,
    count,
    removeFromWatchlist,
    clearWatchlist,
    refreshWatchlist,
  } = useWatchlist();

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("DetailScreen", { movieId: movie.id });
  };

  const handleRemoveFromWatchlist = (movieId: number, movieTitle: string) => {
    Alert.alert(
      "Remove from Watchlist",
      `Remove "${movieTitle}" from your watchlist?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const success = await removeFromWatchlist(movieId);
            if (!success) {
              Alert.alert("Error", "Failed to remove movie from watchlist");
            }
          },
        },
      ]
    );
  };

  const handleClearWatchlist = () => {
    if (count === 0) return;

    Alert.alert(
      "Clear Watchlist",
      "Are you sure you want to remove all movies from your watchlist? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            const success = await clearWatchlist();
            if (!success) {
              Alert.alert("Error", "Failed to clear watchlist");
            }
          },
        },
      ]
    );
  };

  const renderWatchlistItem: ListRenderItem<WatchlistItem> = ({
    item,
    index,
  }) => (
    <View style={styles.movieItemContainer}>
      <View style={styles.movieCardWrapper}>
        <MovieCard
          movie={item.movie}
          size="medium"
          onPress={handleMoviePress}
          showTitle={true}
          showRating={true}
        />
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() =>
          handleRemoveFromWatchlist(item.movieId, item.movie.title)
        }
      >
        <Ionicons name="close-circle" size={24} color={COLORS.ERROR} />
      </TouchableOpacity>

      <View style={styles.movieInfo}>
        <Text style={styles.addedText}>
          Added {new Date(item.addedAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="bookmark-outline"
        size={80}
        color={COLORS.TEXT_SECONDARY}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>Your Watchlist is Empty</Text>
      <Text style={styles.emptyMessage}>
        Browse movies and tap the bookmark icon to add them to your watchlist.
      </Text>

      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.browseButtonText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && watchlist.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.title}>📋 My Watchlist</Text>
        </View>
        <LoadingSpinner text="Loading your watchlist..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 My Watchlist</Text>

        <View style={styles.headerActions}>
          <Text style={styles.countText}>
            {count} movie{count !== 1 ? "s" : ""}
          </Text>

          {count > 0 && (
            <TouchableOpacity
              onPress={handleClearWatchlist}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity
            onPress={refreshWatchlist}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={watchlist}
        renderItem={renderWatchlistItem}
        keyExtractor={(item) => item.movieId.toString()}
        numColumns={2}
        columnWrapperStyle={watchlist.length > 0 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          watchlist.length === 0
            ? styles.emptyContainer
            : styles.contentContainer
        }
        ListEmptyComponent={!loading ? renderEmptyState : null}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshWatchlist}
            tintColor={COLORS.PRIMARY}
            colors={[COLORS.PRIMARY]}
          />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={8}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  title: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.ERROR,
  },
  clearButtonText: {
    color: COLORS.ERROR,
    fontSize: 12,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
  },
  row: {
    justifyContent: "space-around",
  },
  movieItemContainer: {
    width: "45%",
    marginBottom: 16,
    position: "relative",
  },
  movieCardWrapper: {
    width: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    padding: 4,
    zIndex: 10,
  },
  movieInfo: {
    marginTop: 8,
    alignItems: "center",
  },
  addedText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 11,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "rgba(244, 6, 18, 0.1)",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: COLORS.ERROR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default WatchlistScreen;

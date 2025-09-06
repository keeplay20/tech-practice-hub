import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useWatchlistStatus } from "../hooks/useWatchlist";
import { DetailScreenProps, Cast } from "../types";
import { COLORS, IMAGE_SIZES, API_CONFIG } from "../constants/config";
import LoadingSpinner from "../components/common/LoadingSpinner";
// import VideoPlayer from "../components/video/VideoPlayer"; // TODO: Implement later

const { width, height } = Dimensions.get("window");

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { movieId } = route.params;
  const { movie, loading, error, retry } = useMovieDetails(movieId);
  const {
    isInWatchlist,
    loading: watchlistLoading,
    toggleWatchlist,
  } = useWatchlistStatus(movieId);

  const [actionLoading, setActionLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleWatchlistToggle = async () => {
    if (!movie || actionLoading) return;

    setActionLoading(true);
    try {
      const success = await toggleWatchlist(movie);

      if (success) {
        const message = isInWatchlist
          ? `"${movie.title}" removed from watchlist`
          : `"${movie.title}" added to watchlist`;

        // Show a brief success message
        Alert.alert("Success", message);
      } else {
        Alert.alert("Error", "Failed to update watchlist. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleShare = async () => {
    if (!movie) return;

    try {
      const message = `Check out "${movie.title}" (${movie.release_date?.split("-")[0]})!\n\n${movie.overview}\n\nRating: ${movie.vote_average}/10`;

      await Share.share({
        message,
        title: movie.title,
      });
    } catch (error) {
      console.error("Error sharing movie:", error);
    }
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatBudget = (budget: number) => {
    if (budget === 0) return "N/A";
    return `$${(budget / 1000000).toFixed(0)}M`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.loadingContainer} edges={["top"]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <LoadingSpinner text="Loading movie details..." />
        </SafeAreaView>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.errorContainer} edges={["top"]}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <View style={styles.errorContent}>
            <Text style={styles.errorText}>Failed to Load Movie</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity onPress={retry} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: movie.backdrop_path
              ? `${API_CONFIG.IMAGE_BASE_URL}${IMAGE_SIZES.BACKDROP.LARGE}${movie.backdrop_path}`
              : undefined,
          }}
          style={styles.heroSection}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={COLORS.TEXT_PRIMARY}
              />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.heroContent}>
            <View style={styles.posterContainer}>
              <Image
                source={{
                  uri: movie.poster_path
                    ? `${API_CONFIG.IMAGE_BASE_URL}${IMAGE_SIZES.POSTER.MEDIUM}${movie.poster_path}`
                    : undefined,
                }}
                style={styles.poster}
                resizeMode="cover"
              />
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.title} numberOfLines={2}>
                {movie.title}
              </Text>
              <Text style={styles.tagline} numberOfLines={2}>
                {movie.tagline}
              </Text>

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={16} color={COLORS.WARNING} />
                  <Text style={styles.metaText}>
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </View>
                <Text style={styles.metaSeparator}>•</Text>
                <Text style={styles.metaText}>
                  {movie.release_date?.split("-")[0]}
                </Text>
                <Text style={styles.metaSeparator}>•</Text>
                <Text style={styles.metaText}>
                  {formatRuntime(movie.runtime)}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.watchlistButton,
                isInWatchlist && styles.watchlistButtonActive,
              ]}
              onPress={handleWatchlistToggle}
              disabled={actionLoading || watchlistLoading}
            >
              <Ionicons
                name={isInWatchlist ? "bookmark" : "bookmark-outline"}
                size={20}
                color={
                  isInWatchlist ? COLORS.TEXT_PRIMARY : COLORS.TEXT_PRIMARY
                }
              />
              <Text
                style={[
                  styles.actionButtonText,
                  isInWatchlist && styles.activeButtonText,
                ]}
              >
                {actionLoading
                  ? "..."
                  : isInWatchlist
                    ? "In List"
                    : "Watchlist"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.shareButton]}
              onPress={handleShare}
            >
              <Ionicons
                name="share-outline"
                size={20}
                color={COLORS.TEXT_PRIMARY}
              />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.playButton]}
              onPress={() =>
                Alert.alert(
                  "Coming Soon",
                  "Video player will be added in Phase 3!"
                )
              }
            >
              <Ionicons name="play" size={20} color={COLORS.TEXT_PRIMARY} />
              <Text style={styles.actionButtonText}>Trailer</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          {/* Videos/Trailers - TODO: Implement video player later */}
          {movie.videos &&
            movie.videos.results &&
            movie.videos.results.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trailers & Videos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.videosContainer}>
                    {movie.videos.results
                      .filter(
                        (video) =>
                          video.site === "YouTube" &&
                          (video.type === "Trailer" || video.type === "Teaser")
                      )
                      .slice(0, 3)
                      .map((video) => (
                        <View key={video.id} style={styles.videoPlaceholder}>
                          <View style={styles.videoThumbnail}>
                            <Ionicons
                              name="play-circle"
                              size={48}
                              color={COLORS.PRIMARY}
                            />
                            <Text style={styles.videoPlaceholderText}>
                              Video Player Coming Soon
                            </Text>
                          </View>
                          <Text style={styles.videoTitle} numberOfLines={2}>
                            {video.name}
                          </Text>
                          <Text style={styles.videoType}>
                            {video.type} •{" "}
                            {video.official ? "Official" : "Fan-made"}
                          </Text>
                        </View>
                      ))}
                  </View>
                </ScrollView>
              </View>
            )}

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genres</Text>
              <View style={styles.genreContainer}>
                {movie.genres.map((genre) => (
                  <View key={genre.id} style={styles.genreTag}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Cast */}
          {movie.credits &&
            movie.credits.cast &&
            movie.credits.cast.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.castContainer}>
                    {movie.credits.cast.slice(0, 10).map((actor: Cast) => (
                      <View key={actor.id} style={styles.castItem}>
                        <Image
                          source={{
                            uri: actor.profile_path
                              ? `${API_CONFIG.IMAGE_BASE_URL}${IMAGE_SIZES.PROFILE.SMALL}${actor.profile_path}`
                              : undefined,
                          }}
                          style={styles.castPhoto}
                          resizeMode="cover"
                        />
                        <Text style={styles.actorName} numberOfLines={1}>
                          {actor.name}
                        </Text>
                        <Text style={styles.characterName} numberOfLines={1}>
                          {actor.character}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

          {/* Movie Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Budget</Text>
                <Text style={styles.detailValue}>
                  {formatBudget(movie.budget)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Revenue</Text>
                <Text style={styles.detailValue}>
                  {formatBudget(movie.revenue)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{movie.status}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Rating</Text>
                <Text style={styles.detailValue}>
                  {movie.vote_count.toLocaleString()} votes
                </Text>
              </View>
            </View>
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
  loadingContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
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
    marginBottom: 24,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    padding: 16,
    zIndex: 10,
  },
  heroSection: {
    height: height * 0.65,
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  heroContent: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: 32,
  },
  posterContainer: {
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: COLORS.SURFACE,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    marginLeft: 4,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  metaSeparator: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    marginHorizontal: 8,
  },
  contentSection: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  overview: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 16,
    lineHeight: 24,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genreTag: {
    backgroundColor: COLORS.SURFACE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  castContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  videosContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  videoPlaceholder: {
    marginRight: 16,
    width: width * 0.6,
  },
  videoThumbnail: {
    height: 150,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderStyle: "dashed",
  },
  videoPlaceholderText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  videoTitle: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  videoType: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
  },
  castItem: {
    width: 80,
    marginRight: 12,
    alignItems: "center",
  },
  castPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.SURFACE,
    marginBottom: 8,
  },
  actorName: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2,
  },
  characterName: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 10,
    textAlign: "center",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "48%",
    backgroundColor: COLORS.SURFACE,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailLabel: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  detailValue: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  actionButton: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  watchlistButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  watchlistButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  shareButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  playButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  actionButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  activeButtonText: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default DetailScreen;

import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Movie } from "../../types";
import { useWatchlistStatus } from "../../hooks/useWatchlist";
import { COLORS } from "../../constants/config";
import MovieCard from "./MovieCard";

interface SwipeableMovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
  onPress: (movie: Movie) => void;
  showTitle?: boolean;
  showRating?: boolean;
  enableSwipe?: boolean;
}

const SwipeableMovieCard: React.FC<SwipeableMovieCardProps> = ({
  movie,
  size = "medium",
  onPress,
  showTitle = true,
  showRating = false,
  enableSwipe = true,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlistStatus(movie.id);
  const [isToggling, setIsToggling] = useState(false);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleWatchlistToggle = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      const success = await toggleWatchlist(movie);

      if (success) {
        const message = isInWatchlist
          ? `"${movie.title}" removed from watchlist`
          : `"${movie.title}" added to watchlist`;

        // Show brief success feedback
        Alert.alert("Success", message, [{ text: "OK" }], { cancelable: true });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update watchlist");
    } finally {
      setIsToggling(false);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      opacity.value = withSpring(0.8);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldTriggerAction =
        Math.abs(event.translationX) > 50 && Math.abs(event.velocityX) > 500;

      if (shouldTriggerAction) {
        // Trigger watchlist action
        runOnJS(handleWatchlistToggle)();

        // Animate to show action was triggered
        translateX.value = withSpring(
          event.translationX > 0 ? 100 : -100,
          {},
          () => {
            translateX.value = withSpring(0);
          }
        );
      } else {
        // Spring back to center
        translateX.value = withSpring(0);
      }

      opacity.value = withSpring(1);
    },
  });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, 50, 100],
      [1, 0.95, 0.9],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: translateX.value }, { scale }],
      opacity: opacity.value,
    };
  });

  const leftActionStyle = useAnimatedStyle(() => {
    const actionOpacity = interpolate(
      translateX.value,
      [0, 50, 100],
      [0, 0.7, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: actionOpacity,
    };
  });

  const rightActionStyle = useAnimatedStyle(() => {
    const actionOpacity = interpolate(
      translateX.value,
      [0, -50, -100],
      [0, 0.7, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: actionOpacity,
    };
  });

  if (!enableSwipe) {
    return (
      <MovieCard
        movie={movie}
        size={size}
        onPress={onPress}
        showTitle={showTitle}
        showRating={showRating}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Left Action (Add to Watchlist) */}
      <Animated.View
        style={[styles.actionContainer, styles.leftAction, leftActionStyle]}
      >
        <Ionicons
          name={isInWatchlist ? "bookmark" : "bookmark-outline"}
          size={24}
          color={COLORS.SUCCESS}
        />
        <Text style={[styles.actionText, { color: COLORS.SUCCESS }]}>
          {isInWatchlist ? "Remove" : "Add"}
        </Text>
      </Animated.View>

      {/* Right Action (Add to Watchlist) */}
      <Animated.View
        style={[styles.actionContainer, styles.rightAction, rightActionStyle]}
      >
        <Ionicons
          name={isInWatchlist ? "bookmark" : "bookmark-outline"}
          size={24}
          color={COLORS.PRIMARY}
        />
        <Text style={[styles.actionText, { color: COLORS.PRIMARY }]}>
          {isInWatchlist ? "Remove" : "Add"}
        </Text>
      </Animated.View>

      {/* Movie Card */}
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={gestureHandler}
      >
        <Animated.View style={cardAnimatedStyle}>
          <MovieCard
            movie={movie}
            size={size}
            onPress={onPress}
            showTitle={showTitle}
            showRating={showRating}
          />

          {/* Watchlist Indicator */}
          {isInWatchlist && (
            <View style={styles.watchlistIndicator}>
              <Ionicons name="bookmark" size={16} color={COLORS.PRIMARY} />
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  actionContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  leftAction: {
    left: 0,
    backgroundColor: "rgba(70, 211, 105, 0.2)",
    borderRadius: 8,
  },
  rightAction: {
    right: 0,
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    borderRadius: 8,
  },
  actionText: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },
  watchlistIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    padding: 4,
  },
});

export default SwipeableMovieCard;

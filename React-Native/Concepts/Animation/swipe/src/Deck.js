import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; // Minimum swipe distance
const SWIPE_OUT_DURATION = 250; // Speed of swiping out animation

export const Deck = ({ data, renderCards }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete());
  };

  const onSwipeComplete = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const renderStack = () => {
    if (currentIndex >= data.length) {
      return (
        <TouchableOpacity
          style={styles.noMoreCards}
          onPress={() => setCurrentIndex(0)}
        >
          <Text style={styles.noMoreCardsText}>
            No cards available, tap anywhere to restart...
          </Text>
        </TouchableOpacity>
      );
    }

    return data
      .map((item, index) => {
        if (index < currentIndex) return null; // Hide swiped cards

        const isTopCard = index === currentIndex;
        const cardStyle = isTopCard
          ? {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                {
                  rotate: position.x.interpolate({
                    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                    outputRange: ["-20deg", "0deg", "20deg"],
                  }),
                },
              ],
            }
          : { transform: [{ scale: 0.9 }] };

        return (
          <Animated.View
            key={item.id}
            style={[styles.card, cardStyle]}
            {...(isTopCard ? panResponder.panHandlers : {})}
          >
            {renderCards(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View style={styles.container}>{renderStack()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.9,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  noMoreCards: {
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 20,
  },
  noMoreCardsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
});

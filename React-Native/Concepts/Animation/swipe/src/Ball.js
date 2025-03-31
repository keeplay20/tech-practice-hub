import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

export const Ball = () => {
  const startPosition = new Animated.ValueXY(0, 0);
  useEffect(() => {
    Animated.spring(startPosition, {
      toValue: { x: 200, y: 500 },
    }).start();
  }, []);
  return (
    <>
      <Animated.View style={startPosition.getLayout()}>
        <View style={styles.ball}></View>
      </Animated.View>
    </>
  );
};

export const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: "red",
    borderWidth: 30,
  },
});

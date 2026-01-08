import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const GRID_SIZE = 9;

  const renderGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
        <Pressable
          key={rowIndex}
          style={[styles.gridContainer]}
          onPress={() => {
            console.log("Pressed", rowIndex);
          }}
        >
          <Text>{rowIndex}</Text>
        </Pressable>
      ))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Sudoku Grid */}
        {renderGrid()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

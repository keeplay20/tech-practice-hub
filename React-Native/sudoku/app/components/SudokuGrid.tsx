import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { SudokuGrid as SudokuGridType } from "../types/sudoku";
import Cell from "./Cell";

interface SudokuGridProps {
  grid: SudokuGridType;
  selectedCell: { row: number; col: number } | null;
  onCellPress: (row: number, col: number) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const MIN_SCALE = 1;
const MAX_SCALE = 2;

export default function SudokuGrid({
  grid,
  selectedCell,
  onCellPress,
}: SudokuGridProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const GRID_SIZE = SCREEN_WIDTH - 40; // Padding
  const CELL_SIZE = GRID_SIZE / 9;

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        // Calculate max translation based on scale
        const maxTranslateX = (GRID_SIZE * (scale.value - 1)) / 2;
        const maxTranslateY = (GRID_SIZE * (scale.value - 1)) / 2;

        const newTranslateX = savedTranslateX.value + e.translationX;
        const newTranslateY = savedTranslateY.value + e.translationY;

        translateX.value = Math.min(
          Math.max(newTranslateX, -maxTranslateX),
          maxTranslateX
        );
        translateY.value = Math.min(
          Math.max(newTranslateY, -maxTranslateY),
          maxTranslateY
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < 9; row++) {
      const cells = [];
      for (let col = 0; col < 9; col++) {
        const cell = grid[row][col];
        const isSelected =
          selectedCell?.row === row && selectedCell?.col === col;

        cells.push(
          <View
            key={`${row}-${col}`}
            style={[
              styles.cellContainer,
              // Add thicker borders for 3x3 boxes
              col % 3 === 0 && col !== 0 && styles.thickLeftBorder,
              row % 3 === 0 && row !== 0 && styles.thickTopBorder,
              col === 8 && styles.thickRightBorder,
              row === 8 && styles.thickBottomBorder,
            ]}
          >
            <Cell
              cell={cell}
              isSelected={isSelected}
              onPress={() => onCellPress(row, col)}
              size={CELL_SIZE}
            />
          </View>
        );
      }
      rows.push(
        <View key={row} style={styles.row}>
          {cells}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View
          style={[
            styles.gridContainer,
            animatedStyle,
            { width: GRID_SIZE, height: GRID_SIZE },
          ]}
        >
          {renderGrid()}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  gridContainer: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
  },
  cellContainer: {
    position: "relative",
  },
  thickLeftBorder: {
    borderLeftWidth: 2,
    borderLeftColor: "#000",
  },
  thickTopBorder: {
    borderTopWidth: 2,
    borderTopColor: "#000",
  },
  thickRightBorder: {
    borderRightWidth: 2,
    borderRightColor: "#000",
  },
  thickBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

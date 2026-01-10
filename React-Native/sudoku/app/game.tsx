import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CellData = {
  value: string;
  isFrozen: boolean;
};

export default function GameScreen() {
  const GRID_SIZE = 9;

  // Initialize empty grid
  const createEmptyGrid = (): CellData[][] => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({ value: "", isFrozen: false }))
    );
  };

  const [grid, setGrid] = useState<CellData[][]>(createEmptyGrid());
  const [isSetupMode, setIsSetupMode] = useState(true); // true = creating puzzle, false = playing

  const handleCellChange = (row: number, col: number, text: string) => {
    // Only allow single digit 1-9 or empty
    if (text !== "" && !/^[1-9]$/.test(text)) {
      return;
    }

    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          // In setup mode, can edit any cell
          // In play mode, can only edit non-frozen cells
          if (isSetupMode || !cell.isFrozen) {
            return { ...cell, value: text };
          }
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const handleFreezePuzzle = () => {
    // Check if at least some cells have values
    const hasValues = grid.some((row) => row.some((cell) => cell.value !== ""));

    if (!hasValues) {
      Alert.alert(
        "Empty Grid",
        "Please add some numbers before freezing the puzzle!"
      );
      return;
    }

    // Freeze all cells that have values
    const frozenGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isFrozen: cell.value !== "",
      }))
    );
    setGrid(frozenGrid);
    setIsSetupMode(false);
    Alert.alert("Puzzle Frozen!", "Now you can solve the puzzle. Good luck!");
  };

  const handleNewGame = () => {
    Alert.alert("New Game", "This will clear the entire grid. Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Clear",
        onPress: () => {
          setGrid(createEmptyGrid());
          setIsSetupMode(true);
        },
      },
    ]);
  };

  const handleClearSolution = () => {
    // Clear only non-frozen cells (keep the puzzle)
    const clearedGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        value: cell.isFrozen ? cell.value : "",
      }))
    );
    setGrid(clearedGrid);
  };

  const renderGrid = () => {
    return Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {Array.from({ length: GRID_SIZE }, (_, colIndex) => {
          const cell = grid[rowIndex][colIndex];
          const isFrozen = cell.isFrozen;

          return (
            <View
              key={colIndex}
              style={[
                styles.cell,
                isFrozen && styles.frozenCell,
                // Add thicker borders for 3x3 boxes
                (rowIndex + 1) % 3 === 0 &&
                  rowIndex !== 8 &&
                  styles.thickBottomBorder,
                (colIndex + 1) % 3 === 0 &&
                  colIndex !== 8 &&
                  styles.thickRightBorder,
              ]}
            >
              <TextInput
                editable={isSetupMode || !isFrozen}
                keyboardType="numeric"
                maxLength={1}
                style={[styles.input, isFrozen && styles.frozenText]}
                value={cell.value}
                onChangeText={(text) =>
                  handleCellChange(rowIndex, colIndex, text)
                }
              />
            </View>
          );
        })}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sudoku</Text>
      </View>

      {/* Sudoku Grid */}
      <View style={styles.gridWrapper}>{renderGrid()}</View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        {isSetupMode ? (
          <TouchableOpacity
            style={styles.freezeButton}
            onPress={handleFreezePuzzle}
          >
            <Text style={styles.buttonText}>Freeze Puzzle & Start Playing</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSolution}
          >
            <Text style={styles.buttonText}>Clear Solution</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  modeText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  gridWrapper: {
    width: "95%",
    aspectRatio: 1,
    maxWidth: 400,
    maxHeight: 400,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  frozenCell: {
    backgroundColor: "#ffebee",
  },
  thickBottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  thickRightBorder: {
    borderRightWidth: 2,
    borderRightColor: "#000",
  },
  input: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    padding: 0,
    color: "#333",
  },
  frozenText: {
    color: "#c62828",
    fontWeight: "bold",
  },
  buttonsContainer: {
    padding: 20,
    gap: 12,
  },
  freezeButton: {
    backgroundColor: "#4caf50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#ff9800",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  newGameButton: {
    backgroundColor: "#2196f3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

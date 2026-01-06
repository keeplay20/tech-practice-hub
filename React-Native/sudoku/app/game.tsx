import React, { useState, useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameState } from "./types/sudoku";
import { cloneGrid, createEmptyGrid } from "./utils/sudokuGenerator";
import { saveCurrentGame, loadCurrentGame } from "./utils/storage";
import SudokuGrid from "./components/SudokuGrid";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GameScreen() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (gameState && !gameState.isComplete) {
      const updatedGameState = { ...gameState };
      saveCurrentGame(updatedGameState);
    }
  }, [gameState]);

  const initializeGame = async () => {
    try {
      // Try to load existing game
      const savedGame = await loadCurrentGame();

      if (savedGame) {
        setGameState(savedGame);
      } else {
        // Create new game
        startNewGame();
      }
    } catch (error) {
      console.error("Error initializing game:", error);
      startNewGame();
    }
  };

  const startNewGame = () => {
    const grid = createEmptyGrid();
    const newGameState: GameState = {
      grid,
      initialGrid: cloneGrid(grid),
      selectedCell: null,
      isComplete: false,
    };
    setGameState(newGameState);
  };

  const handleCellPress = (row: number, col: number) => {
    if (!gameState || gameState.isComplete) return;

    const cell = gameState.grid[row][col];
    if (cell.isFixed) return; // Can't select fixed cells

    setGameState({
      ...gameState,
      selectedCell: { row, col },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView contentContainerStyle={styles.scrollContent}>
          {/* Sudoku Grid */}
          {gameState && (
            <SudokuGrid
              grid={gameState.grid}
              selectedCell={gameState.selectedCell}
              onCellPress={handleCellPress}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#f44336",
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196f3",
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  menuButton: {
    backgroundColor: "#666",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  instructionsContainer: {
    padding: 20,
    backgroundColor: "#e3f2fd",
  },
  instructionsText: {
    fontSize: 14,
    color: "#1976d2",
    textAlign: "center",
    marginBottom: 5,
  },
  instructionsSecondary: {
    fontSize: 12,
    color: "#0d47a1",
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButton: {
    backgroundColor: "#ff9800",
  },
  newGameButton: {
    backgroundColor: "#4caf50",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2196f3",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

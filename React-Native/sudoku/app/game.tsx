import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
  AppState,
  AppStateStatus,
  Animated,
  Modal,
  Easing,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@sudoku_game_state";
const GRID_SIZE = 9;

type CellData = {
  value: string;
  isFrozen: boolean;
};

type GameState = {
  grid: CellData[][];
  isSetupMode: boolean;
};

const createEmptyGrid = (): CellData[][] =>
  Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({ value: "", isFrozen: false }))
  );

function isValidCellData(cell: unknown): cell is CellData {
  return (
    typeof cell === "object" &&
    cell !== null &&
    typeof (cell as CellData).value === "string" &&
    typeof (cell as CellData).isFrozen === "boolean"
  );
}

function isValidGrid(g: unknown): g is CellData[][] {
  if (!Array.isArray(g) || g.length !== GRID_SIZE) return false;
  return g.every(
    (row) =>
      Array.isArray(row) &&
      row.length === GRID_SIZE &&
      row.every((cell) => isValidCellData(cell))
  );
}

function parseGameState(json: string): GameState | null {
  try {
    const data = JSON.parse(json) as unknown;
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    if (typeof o.isSetupMode !== "boolean") return null;
    if (!isValidGrid(o.grid)) return null;
    return { grid: o.grid, isSetupMode: o.isSetupMode };
  } catch {
    return null;
  }
}

export default function GameScreen() {
  const [grid, setGrid] = useState<CellData[][]>(createEmptyGrid());
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [showWinModal, setShowWinModal] = useState(false);
  const [invalidCells, setInvalidCells] = useState<Set<string>>(new Set());

  const gridRef = useRef(grid);
  const isSetupModeRef = useRef(isSetupMode);
  // Update on every render so AppState / blur saves always see the latest grid (useEffect refs can lag one frame behind)
  gridRef.current = grid;
  isSetupModeRef.current = isSetupMode;

  // Win / congratulations animation values
  const winScale = useRef(new Animated.Value(0)).current;
  const winOpacity = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const starRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(24)).current;
  const winPulseLoopRef = useRef<ReturnType<typeof Animated.loop> | null>(null);

  const saveGame = useCallback(async (currentGrid: CellData[][], setupMode: boolean) => {
    try {
      const state: GameState = { grid: currentGrid, isSetupMode: setupMode };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // silently ignore storage errors
    }
  }, []);

  const loadGame = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const state = parseGameState(saved);
      if (!state) return;
      setGrid(state.grid);
      setIsSetupMode(state.isSetupMode);
    } catch {
      // silently ignore load errors
    }
  }, []);

  // Restore from AsyncStorage on launch
  useEffect(() => {
    void loadGame();
  }, [loadGame]);

  // Persist when app leaves the foreground (home, app switcher, lock screen, etc.)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (nextState === "background" || nextState === "inactive") {
          void saveGame(gridRef.current, isSetupModeRef.current);
        }
      }
    );
    return () => subscription.remove();
  }, [saveGame]);

  // Block hardware back; save when this screen loses focus (e.g. navigation) so state is not lost
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => {
        sub.remove();
        void saveGame(gridRef.current, isSetupModeRef.current);
      };
    }, [saveGame])
  );

  const isValidPlacement = (
    currentGrid: CellData[][],
    row: number,
    col: number,
    value: string
  ): boolean => {
    if (value === "") return true;

    // Check row
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c !== col && currentGrid[row][c].value === value) return false;
    }

    // Check column
    for (let r = 0; r < GRID_SIZE; r++) {
      if (r !== row && currentGrid[r][col].value === value) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && currentGrid[r][c].value === value)
          return false;
      }
    }

    return true;
  };

  const checkWin = (currentGrid: CellData[][]): boolean => {
    // All cells must be filled
    if (!currentGrid.every((row) => row.every((cell) => cell.value !== "")))
      return false;

    // Each row must have all 9 unique digits
    for (let i = 0; i < GRID_SIZE; i++) {
      const rowVals = new Set(currentGrid[i].map((c) => c.value));
      if (rowVals.size !== 9) return false;

      const colVals = new Set(currentGrid.map((r) => r[i].value));
      if (colVals.size !== 9) return false;
    }

    // Each 3x3 box must have all 9 unique digits
    for (let br = 0; br < 3; br++) {
      for (let bc = 0; bc < 3; bc++) {
        const boxVals = new Set<string>();
        for (let r = br * 3; r < br * 3 + 3; r++) {
          for (let c = bc * 3; c < bc * 3 + 3; c++) {
            boxVals.add(currentGrid[r][c].value);
          }
        }
        if (boxVals.size !== 9) return false;
      }
    }

    return true;
  };

  const triggerWinAnimation = () => {
    winPulseLoopRef.current?.stop?.();
    pulse.stopAnimation();
    pulse.setValue(1);

    setShowWinModal(true);
    winScale.setValue(0.2);
    winOpacity.setValue(0);
    starRotate.setValue(0);
    titleOpacity.setValue(0);
    titleSlide.setValue(24);

    Animated.parallel([
      Animated.spring(winScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 55,
        friction: 6,
      }),
      Animated.timing(winOpacity, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(starRotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(180),
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(titleSlide, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.06,
            duration: 550,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 550,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      winPulseLoopRef.current = loop;
      loop.start();
    });
  };

  const flashInvalidCell = (row: number, col: number) => {
    const key = `${row}-${col}`;
    setInvalidCells((prev) => new Set(prev).add(key));
    setTimeout(() => {
      setInvalidCells((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }, 700);
  };

  const handleCellChange = (row: number, col: number, text: string) => {
    if (text !== "" && !/^[1-9]$/.test(text)) return;

    const cell = grid[row][col];
    if (!isSetupMode && cell.isFrozen) return;

    // No duplicate digit in same row, column, or 3×3 box (setup and play)
    if (!isValidPlacement(grid, row, col, text)) {
      flashInvalidCell(row, col);
      return;
    }

    const newGrid = grid.map((rowArray, ri) =>
      rowArray.map((c, ci) => {
        if (ri === row && ci === col) return { ...c, value: text };
        return c;
      })
    );

    setGrid(newGrid);
    saveGame(newGrid, isSetupMode);

    // Check win after filling a cell in play mode
    if (!isSetupMode && text !== "" && checkWin(newGrid)) {
      AsyncStorage.removeItem(STORAGE_KEY);
      setTimeout(triggerWinAnimation, 150);
    }
  };

  const handleFreezePuzzle = () => {
    const hasValues = grid.some((row) => row.some((cell) => cell.value !== ""));
    if (!hasValues) {
      Alert.alert(
        "Empty Grid",
        "Please add some numbers before freezing the puzzle!"
      );
      return;
    }

    const frozenGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, isFrozen: cell.value !== "" }))
    );
    setGrid(frozenGrid);
    setIsSetupMode(false);
    saveGame(frozenGrid, false);
    Alert.alert("Puzzle Frozen!", "Now you can solve the puzzle. Good luck!");
  };

  const handleNewGame = () => {
    Alert.alert("New Game", "This will clear the entire grid. Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, Clear",
        onPress: async () => {
          winPulseLoopRef.current?.stop();
          pulse.stopAnimation();
          const emptyGrid = createEmptyGrid();
          setGrid(emptyGrid);
          setIsSetupMode(true);
          setShowWinModal(false);
          await AsyncStorage.removeItem(STORAGE_KEY);
        },
      },
    ]);
  };

  const handleClearSolution = () => {
    const clearedGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, value: cell.isFrozen ? cell.value : "" }))
    );
    setGrid(clearedGrid);
    saveGame(clearedGrid, isSetupMode);
  };

  const renderGrid = () =>
    Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {Array.from({ length: GRID_SIZE }, (_, colIndex) => {
          const cell = grid[rowIndex][colIndex];
          const isInvalid = invalidCells.has(`${rowIndex}-${colIndex}`);

          return (
            <View
              key={colIndex}
              style={[
                styles.cell,
                cell.isFrozen && styles.frozenCell,
                isInvalid && styles.invalidCell,
                (rowIndex + 1) % 3 === 0 &&
                  rowIndex !== 8 &&
                  styles.thickBottomBorder,
                (colIndex + 1) % 3 === 0 &&
                  colIndex !== 8 &&
                  styles.thickRightBorder,
              ]}
            >
              <TextInput
                editable={isSetupMode || !cell.isFrozen}
                keyboardType="numeric"
                maxLength={1}
                style={[
                  styles.input,
                  cell.isFrozen && styles.frozenText,
                  isInvalid && styles.invalidText,
                ]}
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sudoku</Text>
      </View>

      <View style={styles.gridWrapper}>{renderGrid()}</View>

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

      {/* Congratulations overlay */}
      <Modal transparent visible={showWinModal} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.winCard,
              {
                opacity: winOpacity,
                transform: [{ scale: winScale }, { scale: pulse }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.winBadge,
                {
                  transform: [
                    {
                      rotate: starRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "720deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.winBadgeText}>★</Text>
            </Animated.View>
            <Animated.Text
              style={[
                styles.winTitle,
                {
                  opacity: titleOpacity,
                  transform: [{ translateY: titleSlide }],
                },
              ]}
            >
              Congratulations!
            </Animated.Text>
            <Animated.Text
              style={[
                styles.winSubtitle,
                { opacity: titleOpacity },
              ]}
            >
              You solved the puzzle!
            </Animated.Text>
            <TouchableOpacity
              style={styles.winNewGameButton}
              onPress={handleNewGame}
            >
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
  invalidCell: {
    backgroundColor: "#ffcdd2",
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
  invalidText: {
    color: "#b71c1c",
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
  // Win Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  winCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 36,
    alignItems: "center",
    width: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  winBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffd600",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  winBadgeText: {
    fontSize: 40,
    color: "#fff",
    lineHeight: 48,
  },
  winTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  winSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 28,
  },
  winNewGameButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 8,
    alignItems: "center",
  },
});

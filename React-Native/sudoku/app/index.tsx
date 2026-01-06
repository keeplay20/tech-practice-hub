import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearCurrentGame, loadSavedGames } from "./utils/storage";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    // Optional: Check for saved games on mount
    loadSavedGames();
  }, []);

  const startNewGame = () => {
    clearCurrentGame(); // Clear any existing game
    router.push("/game");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sudoku</Text>
        <Text style={styles.subtitle}>Classic Puzzle Game</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={startNewGame}
          >
            <Text style={styles.buttonText}>New Game</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Play:</Text>
          <Text style={styles.infoText}>
            • Fill the 9×9 grid with numbers 1-9
          </Text>
          <Text style={styles.infoText}>
            • Each row must contain all digits
          </Text>
          <Text style={styles.infoText}>
            • Each column must contain all digits
          </Text>
          <Text style={styles.infoText}>
            • Each 3×3 box must contain all digits
          </Text>
          <Text style={styles.infoText}>• Pinch to zoom the grid</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2196f3",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 50,
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 15,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: "#2196f3",
  },
  secondaryButton: {
    backgroundColor: "#4caf50",
  },
  buttonPressed: {
    opacity: 0.7,
    elevation: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: "100%",
    maxWidth: 300,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

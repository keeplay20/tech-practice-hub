import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const startNewGame = () => {
    router.push("/game");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sudoku</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={startNewGame}
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
});

import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../../styles/colors";

export default function HomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          🌍 Welcome to Travel Explorer
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover amazing destinations around the world!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

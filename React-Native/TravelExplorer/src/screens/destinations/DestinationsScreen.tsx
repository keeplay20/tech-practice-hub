import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { colors } from "../../styles/colors";

export default function DestinationsScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>🗺️ Destinations</Text>
          <Text style={styles.subtitle}>Explore beautiful places</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏔️ Mountains</Text>
            <Text style={styles.cardText}>
              Discover breathtaking mountain ranges
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏖️ Beaches</Text>
            <Text style={styles.cardText}>Relax on pristine sandy beaches</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏙️ Cities</Text>
            <Text style={styles.cardText}>Experience vibrant urban life</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

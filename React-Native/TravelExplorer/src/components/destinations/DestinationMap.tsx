import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Destination } from "../../types/destination";

interface DestinationMapProps {
  destinations: Destination[];
  selectedDestination?: Destination;
  onDestinationSelect?: (destination: Destination) => void;
  style?: any;
}

const { width } = Dimensions.get("window");

export default function DestinationMap({
  destinations,
  selectedDestination,
  onDestinationSelect,
  style,
}: DestinationMapProps) {
  const [mapType, setMapType] = useState<"satellite" | "standard">("standard");

  // For demo purposes, we'll show a placeholder map
  // In a real app, you would integrate with react-native-maps
  const openInMaps = (destination: Destination) => {
    const { latitude, longitude } = destination.coordinates;
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;

    Alert.alert(
      "Open in Maps",
      `Would you like to open ${destination.name} in your maps app?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open",
          onPress: () => {
            // In a real app, you would use Linking.openURL(url)
            console.log("Opening maps:", url);
          },
        },
      ]
    );
  };

  const toggleMapType = () => {
    setMapType((prev) => (prev === "standard" ? "satellite" : "standard"));
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>🗺️ Interactive Map</Text>
        <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
          <Ionicons
            name={mapType === "standard" ? "satellite-outline" : "map-outline"}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Placeholder Map View */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={colors.textSecondary} />
          <Text style={styles.mapPlaceholderText}>Interactive Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            {destinations.length} destinations available
          </Text>
        </View>

        {/* Destination Markers */}
        <View style={styles.markersContainer}>
          {destinations.slice(0, 6).map((destination, index) => (
            <TouchableOpacity
              key={destination.id}
              style={[
                styles.marker,
                selectedDestination?.id === destination.id &&
                  styles.markerSelected,
                {
                  left: 20 + (index % 3) * 100,
                  top: 60 + Math.floor(index / 3) * 80,
                },
              ]}
              onPress={() => onDestinationSelect?.(destination)}
            >
              <View style={styles.markerContent}>
                <Text style={styles.markerIcon}>
                  {getCategoryIcon(destination.category)}
                </Text>
                <Text style={styles.markerText} numberOfLines={1}>
                  {destination.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Map Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            // Zoom in functionality
            console.log("Zoom in");
          }}
        >
          <Ionicons name="add" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            // Zoom out functionality
            console.log("Zoom out");
          }}
        >
          <Ionicons name="remove" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            // Center on user location
            console.log("Center on location");
          }}
        >
          <Ionicons name="locate" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Selected Destination Info */}
      {selectedDestination && (
        <View style={styles.selectedInfo}>
          <View style={styles.selectedContent}>
            <Text style={styles.selectedTitle}>{selectedDestination.name}</Text>
            <Text style={styles.selectedCountry}>
              {selectedDestination.country}
            </Text>
            <View style={styles.selectedRating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.selectedRatingText}>
                {selectedDestination.rating}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() => openInMaps(selectedDestination)}
          >
            <Ionicons name="navigate" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    mountain: "🏔️",
    beach: "🏖️",
    city: "🏙️",
    desert: "🏜️",
    forest: "🌲",
    historical: "🏛️",
    cultural: "🎭",
  };
  return icons[category] || "📍";
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginVertical: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  mapTypeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  mapContainer: {
    height: 250,
    position: "relative",
    backgroundColor: colors.background,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textSecondary,
    marginTop: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  markersContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    position: "absolute",
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.accent,
  },
  markerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  markerIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  markerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
    maxWidth: 60,
  },
  controls: {
    position: "absolute",
    right: 12,
    top: 60,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  controlButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectedContent: {
    flex: 1,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  selectedCountry: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectedRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  selectedRatingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 4,
  },
  directionsButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 12,
    marginLeft: 12,
  },
});

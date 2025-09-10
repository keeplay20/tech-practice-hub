import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Destination } from "../../types/destination";

interface DestinationCardProps {
  destination: Destination;
  onPress: (destination: Destination) => void;
  style?: any;
}

const { width } = Dimensions.get("window");
const cardWidth = width - 40;

export default function DestinationCard({
  destination,
  onPress,
  style,
}: DestinationCardProps) {
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

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case "budget":
        return colors.success;
      case "mid-range":
        return colors.warning;
      case "luxury":
        return colors.accent;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.shadow },
        style,
      ]}
      onPress={() => onPress(destination)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <View style={styles.badgeContainer}>
            {destination.isFeatured && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>
                {getCategoryIcon(destination.category)}
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{destination.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {destination.name}
          </Text>
          <Text style={[styles.country, { color: colors.textSecondary }]}>
            {destination.country}
          </Text>
        </View>

        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {destination.shortDescription}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <View
              style={[
                styles.priceBadge,
                { backgroundColor: getPriceRangeColor(destination.priceRange) },
              ]}
            >
              <Text style={styles.priceText}>
                {destination.priceRange.charAt(0).toUpperCase() +
                  destination.priceRange.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.highlightsContainer}>
            {destination.highlights.slice(0, 2).map((highlight, index) => (
              <Text
                key={index}
                style={[styles.highlight, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {highlight}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "space-between",
    padding: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  featuredBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryIcon: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-end",
  },
  ratingText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceContainer: {
    flex: 1,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  highlightsContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  highlight: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 2,
  },
});

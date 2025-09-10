import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Destination } from "../../types/destination";
import ImageGallery from "../../components/destinations/ImageGallery";
import DestinationMap from "../../components/destinations/DestinationMap";

interface DestinationDetailScreenProps {
  destination: Destination;
  onBack: () => void;
  onAddToTrip?: (destination: Destination) => void;
}

const { width } = Dimensions.get("window");

export default function DestinationDetailScreen({
  destination,
  onBack,
  onAddToTrip,
}: DestinationDetailScreenProps) {
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <ImageGallery images={destination.images} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{destination.name}</Text>
              <Text style={styles.country}>{destination.country}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>

          {/* Category and Price */}
          <View style={styles.badgeContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>
                {getCategoryIcon(destination.category)}
              </Text>
              <Text style={styles.categoryText}>
                {destination.category.charAt(0).toUpperCase() +
                  destination.category.slice(1)}
              </Text>
            </View>
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

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.highlightsContainer}>
              {destination.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.success}
                  />
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Activities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activities</Text>
            <View style={styles.activitiesContainer}>
              {destination.activities.map((activity, index) => (
                <View key={index} style={styles.activityChip}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Travel Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Travel Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoLabel}>Best Time</Text>
                <Text style={styles.infoValue}>
                  {destination.bestTimeToVisit.join(", ")}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons
                  name="thermometer-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoLabel}>Climate</Text>
                <Text style={styles.infoValue}>{destination.climate}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoLabel}>Currency</Text>
                <Text style={styles.infoValue}>{destination.currency}</Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons
                  name="language-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoLabel}>Languages</Text>
                <Text style={styles.infoValue}>
                  {destination.language.join(", ")}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Ionicons
                  name={
                    destination.visaRequired
                      ? "document-text-outline"
                      : "checkmark-circle-outline"
                  }
                  size={20}
                  color={
                    destination.visaRequired ? colors.warning : colors.success
                  }
                />
                <Text style={styles.infoLabel}>Visa</Text>
                <Text style={styles.infoValue}>
                  {destination.visaRequired ? "Required" : "Not Required"}
                </Text>
              </View>
            </View>
          </View>

          {/* Map */}
          <View style={styles.section}>
            <DestinationMap
              destinations={[destination]}
              selectedDestination={destination}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addToTripButton}
          onPress={() => onAddToTrip?.(destination)}
        >
          <Ionicons name="add" size={20} color={colors.surface} />
          <Text style={styles.addToTripText}>Add to Trip</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
  },
  shareButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
  },
  heroContainer: {
    height: 300,
  },
  content: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  priceText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  highlightsContainer: {
    gap: 8,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  highlightText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  activitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  activityChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 12,
    minWidth: 80,
  },
  infoValue: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    marginLeft: 8,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  favoriteButton: {
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addToTripButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 16,
    gap: 8,
  },
  addToTripText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.surface,
  },
});

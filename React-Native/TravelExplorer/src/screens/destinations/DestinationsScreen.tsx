import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { Destination, FilterOptions } from "../../types/destination";
import { destinations } from "../../data/destinations";
import DestinationCard from "../../components/destinations/DestinationCard";
import SearchBar from "../../components/destinations/SearchBar";
import FilterModal from "../../components/destinations/FilterModal";
import DestinationMap from "../../components/destinations/DestinationMap";
import DestinationDetailScreen from "./DestinationDetailScreen";

export default function DestinationsScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: [],
    continent: [],
    rating: 0,
    visaRequired: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Filter and search destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          destination.name.toLowerCase().includes(query) ||
          destination.country.toLowerCase().includes(query) ||
          destination.description.toLowerCase().includes(query) ||
          destination.highlights.some((highlight) =>
            highlight.toLowerCase().includes(query)
          );
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        filters.category.length > 0 &&
        !filters.category.includes(destination.category)
      ) {
        return false;
      }

      // Price range filter
      if (
        filters.priceRange.length > 0 &&
        !filters.priceRange.includes(destination.priceRange)
      ) {
        return false;
      }

      // Continent filter
      if (
        filters.continent.length > 0 &&
        !filters.continent.includes(destination.continent)
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && destination.rating < filters.rating) {
        return false;
      }

      // Visa requirement filter
      if (
        filters.visaRequired !== null &&
        destination.visaRequired !== filters.visaRequired
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleDestinationPress = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleBackFromDetail = () => {
    setSelectedDestination(null);
  };

  const handleAddToTrip = (destination: Destination) => {
    // TODO: Implement add to trip functionality
    console.log("Adding to trip:", destination.name);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "map" : "list"));
  };

  if (selectedDestination) {
    return (
      <DestinationDetailScreen
        destination={selectedDestination}
        onBack={handleBackFromDetail}
        onAddToTrip={handleAddToTrip}
      />
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>
            🗺️ Destinations
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Explore beautiful places
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.viewModeButton, { backgroundColor: colors.primary }]}
          onPress={toggleViewMode}
        >
          <Ionicons
            name={viewMode === "list" ? "map-outline" : "list-outline"}
            size={24}
            color={colors.background}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />
      </View>

      {viewMode === "map" ? (
        <View style={styles.mapContainer}>
          <DestinationMap
            destinations={filteredDestinations}
            onDestinationSelect={handleDestinationPress}
          />
        </View>
      ) : (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              onPress={handleDestinationPress}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search-outline"
                size={48}
                color={colors.textSecondary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No destinations found
              </Text>
              <Text
                style={[styles.emptySubtitle, { color: colors.textSecondary }]}
              >
                Try adjusting your search or filters
              </Text>
            </View>
          }
        />
      )}

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  viewModeButton: {
    borderRadius: 20,
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  mapContainer: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});

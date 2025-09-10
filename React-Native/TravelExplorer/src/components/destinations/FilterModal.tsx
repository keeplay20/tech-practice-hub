import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { FilterOptions } from "../../types/destination";
import { categories, continents, priceRanges } from "../../data/destinations";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
}: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);

  const handleCategoryToggle = (category: string) => {
    setTempFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  const handlePriceRangeToggle = (priceRange: string) => {
    setTempFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange.includes(priceRange)
        ? prev.priceRange.filter((p) => p !== priceRange)
        : [...prev.priceRange, priceRange],
    }));
  };

  const handleContinentToggle = (continent: string) => {
    setTempFilters((prev) => ({
      ...prev,
      continent: prev.continent.includes(continent)
        ? prev.continent.filter((c) => c !== continent)
        : [...prev.continent, continent],
    }));
  };

  const handleRatingChange = (rating: number) => {
    setTempFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating,
    }));
  };

  const handleVisaToggle = () => {
    setTempFilters((prev) => ({
      ...prev,
      visaRequired:
        prev.visaRequired === null
          ? false
          : prev.visaRequired === false
          ? true
          : null,
    }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      category: [],
      priceRange: [],
      continent: [],
      rating: 0,
      visaRequired: null,
    };
    setTempFilters(resetFilters);
  };

  const getVisaText = () => {
    if (tempFilters.visaRequired === null) return "Any";
    return tempFilters.visaRequired ? "Required" : "Not Required";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.chipContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.chip,
                    tempFilters.category.includes(category.key) &&
                      styles.chipSelected,
                  ]}
                  onPress={() => handleCategoryToggle(category.key)}
                >
                  <Text style={styles.chipIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.chipText,
                      tempFilters.category.includes(category.key) &&
                        styles.chipTextSelected,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.chipContainer}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range.key}
                  style={[
                    styles.chip,
                    tempFilters.priceRange.includes(range.key) &&
                      styles.chipSelected,
                  ]}
                  onPress={() => handlePriceRangeToggle(range.key)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      tempFilters.priceRange.includes(range.key) &&
                        styles.chipTextSelected,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continents */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continents</Text>
            <View style={styles.chipContainer}>
              {continents.map((continent) => (
                <TouchableOpacity
                  key={continent}
                  style={[
                    styles.chip,
                    tempFilters.continent.includes(continent) &&
                      styles.chipSelected,
                  ]}
                  onPress={() => handleContinentToggle(continent)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      tempFilters.continent.includes(continent) &&
                        styles.chipTextSelected,
                    ]}
                  >
                    {continent}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minimum Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={styles.ratingButton}
                  onPress={() => handleRatingChange(rating)}
                >
                  <Ionicons
                    name="star"
                    size={24}
                    color={
                      tempFilters.rating >= rating ? "#FFD700" : colors.border
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Visa Requirement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visa Requirement</Text>
            <TouchableOpacity
              style={styles.visaButton}
              onPress={handleVisaToggle}
            >
              <Text style={styles.visaText}>{getVisaText()}</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  resetButton: {
    padding: 4,
  },
  resetText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: colors.surface,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  ratingButton: {
    padding: 4,
  },
  visaButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  visaText: {
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.surface,
  },
});

import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
  TextInput,
  Text, // ✅ Fixed: Text import kiya
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const searchCategory = ["All", "beauty", "fragrances", "furniture"];

// 🚀 SENIOR TOUCH: Custom Debounce Hook (Pure React Logic)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer agar user dubara type kare delay khatam hone se pehle
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export const ProductCatalog = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔥 Humne search text par apna custom debounce hook laga diya
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  // 1. Initial aur Search Data Fetch karne ka unified function
  const fetchProducts = async (searchTerm = "", category = "All") => {
    try {
      setIsLoading(true);
      setIsError(false);

      let url = "https://dummyjson.com/products?limit=20";

      // Agar user ne search kiya hai
      if (searchTerm.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${searchTerm}`;
      }

      const response = await fetch(url);
      const json = await response.json();

      let finalProducts = json.products || [];

      // Local Category Filter (Agar 'All' select nahi hai)
      if (category !== "All") {
        finalProducts = finalProducts.filter(
          (item) => item.category === category,
        );
      }

      setProductData(finalProducts);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect 1: Initial Load aur Jab bhi Debounced Search Term badle
  useEffect(() => {
    fetchProducts(debouncedSearchTerm, selectedCategory);
  }, [debouncedSearchTerm]);

  // Handle Category Click
  const clickChip = (category) => {
    setSelectedCategory(category);
    fetchProducts(searchInput, category);
  };

  const renderProductItems = useCallback(({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.subText}>Price: ${item.price}</Text>
        <Text style={styles.catText}>{item.category}</Text>
      </View>
    );
  }, []);

  if (isLoading && productData.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* Search Input Box */}
      <TextInput
        placeholder="Enter product..."
        placeholderTextColor="#888"
        value={searchInput}
        onChangeText={setSearchInput} // ✅ Fixed: Direct reference pass kiya
        style={styles.input}
      />

      {/* Category Horizontal Chips Container */}
      <View style={styles.chipsContainer}>
        {searchCategory.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => clickChip(cat)}
              style={[styles.chip, isSelected && styles.selectedChip]}
            >
              {/* ✅ Fixed: Wrapped text string inside <Text> component */}
              <Text
                style={[styles.chipText, isSelected && styles.selectedChipText]}
              >
                {cat.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Main List */}
      <FlatList
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={5}
        data={productData}
        renderItem={renderProductItems}
        keyExtractor={(item) => item.id.toString()} // ✅ Fixed: Return statement explicitly correct
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No Products Found 🔍</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa", // Aggressive RED se badal kar soft background kiya
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    fontSize: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  selectedChip: {
    backgroundColor: "blue",
  },
  chipText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  selectedChipText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    marginBottom: 12,
    // Android & iOS Shadows taaki premium lage
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  titleText: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  subText: { fontSize: 14, color: "#666", marginBottom: 4 },
  catText: { fontSize: 12, color: "blue", fontWeight: "500" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: { fontSize: 16, color: "#888", fontWeight: "500" },
});

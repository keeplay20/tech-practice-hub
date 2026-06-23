import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const searchChips = ["All", "beauty", "fragrances", "furniture"];

const useDebounceQuery = (value, delay) => {
  const [debounceSearchText, setDebounceSearchText] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchText(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceSearchText;
};

export const ProductCatalog = () => {
  const [productData, setProductData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState("All");

  const debounceSearchItem = useDebounceQuery(searchInput, 2000);

  const fetchProductApi = async (searchTerm = "", category = "All") => {
    try {
      setIsLoading(true);
      setIsError(false);
      let url = "https://dummyjson.com/products?limit=20";
      if (searchTerm.trim() !== "") {
        url = `https://dummyjson.com/products/search?q=${searchTerm}`;
      }

      const response = await fetch(url);
      const json = await response.json();

      let finalProducts = json.products || [];

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

  useEffect(() => {
    fetchProductApi(debounceSearchItem, category);
  }, [debounceSearchItem]);

  const rednerProductList = useCallback(({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.text}>{item.category}</Text>
      </View>
    );
  }, []);

  const chipClick = (item) => {
    setCategory(item);
    fetchProductApi(searchInput, item);
  };

  if (isLoading && productData.length === 0) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <Text style={styles.text}>{"Error, No product found"}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={"Search product"}
        value={searchInput}
        onChangeText={setSearchInput}
      ></TextInput>
      <View style={styles.chipsContainer}>
        {searchChips.map((item, index) => {
          const isSelected = category === item;
          return (
            <Pressable
              style={styles.chip}
              onPress={() => chipClick(item)}
              key={index}
            >
              <Text>{item.toUpperCase()}</Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        renderItem={rednerProductList}
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={8}
      ></FlatList>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: "#1e1e1e",
  },
  chipsContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chip: {
    borderWidth: 1,
    padding: 4,
    minWidth: 60,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "lightgrey",
    // backgroundColor: "cyan",
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgrey",
  },
  cardContainer: {
    padding: 10,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
  },
});

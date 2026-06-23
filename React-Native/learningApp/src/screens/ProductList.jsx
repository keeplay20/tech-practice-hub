import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  View,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "../contexts/ToastContext";

const LIMIT = 10;

export function ProductList() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const showToast = useToast();

  const fetchProductsApi = async (pageNo) => {
    let skipValue = (pageNo - 1) * LIMIT;

    try {
      if (pageNo === 1) {
        setIsLoading(true);
      }
      setIsError(false);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skipValue}`,
      );
      const json = await response.json();
      const newProducts = json.products;
      if (pageNo === 1) {
        setProductData(json.products);
      } else {
        setProductData((prev) => [...prev, ...newProducts]);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsApi(1);
  }, []);

  const handleTryAgain = useCallback(() => {
    setPageNumber(1);
    fetchProductsApi(1);
  }, []);

  const renderProducts = useCallback(({ item }) => {
    return (
      <View style={styles.cardView}>
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
      </View>
    );
  }, []);

  const handleMore = useCallback(() => {
    const newPage = pageNumber + 1;
    setPageNumber(newPage);
    fetchProductsApi(newPage);
  }, [pageNumber]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue"></ActivityIndicator>;
  }

  if (isError) {
    return (
      <View>
        <Text>"No products found"</Text>
        <Pressable onPress={handleTryAgain}>
          <Text>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  const showToastBtn = () => {
    showToast("Toast dikh raha hai kya", "success");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Pressable onPress={showToastBtn} style={styles.buttonToast}>
        <Text>Show Toast</Text>
      </Pressable>
      <FlatList
        renderItem={renderProducts}
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleMore}
      ></FlatList>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    gap: 10,
  },
  cardView: {
    padding: 10,
    gap: 10,
    borderRadius: 5,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  buttonToast: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 20,
    backgroundColor: "cyan",
    width: 100,
  },
});

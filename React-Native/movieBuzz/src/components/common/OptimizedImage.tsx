import React, { useState, useRef } from "react";
import {
  Image,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/config";

interface OptimizedImageProps {
  source: { uri: string } | number;
  style?: ImageStyle | ViewStyle;
  containerStyle?: ViewStyle;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  showLoadingIndicator?: boolean;
  showErrorIcon?: boolean;
  placeholderColor?: string;
  fadeDuration?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = "cover",
  showLoadingIndicator = true,
  showErrorIcon = true,
  placeholderColor = COLORS.SURFACE,
  fadeDuration = 300,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLoadStart = () => {
    console.log(
      "OptimizedImage - LoadStart:",
      typeof source === "object" ? source.uri : "local"
    );
    setLoading(true);
    setError(false);
    fadeAnim.setValue(0);
  };

  const handleLoad = () => {
    console.log(
      "OptimizedImage - Load Success:",
      typeof source === "object" ? source.uri : "local"
    );
    setLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  };

  const handleError = () => {
    console.log(
      "OptimizedImage - Load Error:",
      typeof source === "object" ? source.uri : "local"
    );
    setLoading(false);
    setError(true);
  };

  const renderPlaceholder = () => (
    <View
      style={[styles.placeholder, style, { backgroundColor: placeholderColor }]}
    >
      {loading && showLoadingIndicator && (
        <ActivityIndicator size="small" color={COLORS.TEXT_SECONDARY} />
      )}

      {error && showErrorIcon && (
        <Ionicons
          name="image-outline"
          size={24}
          color={COLORS.TEXT_SECONDARY}
        />
      )}
    </View>
  );

  // Handle local images (numbers) vs remote images (objects)
  const isRemoteImage = typeof source === "object" && "uri" in source;

  if (isRemoteImage && !source.uri) {
    return renderPlaceholder();
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {renderPlaceholder()}

      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}
      >
        <Image
          source={source}
          style={[styles.image, style]}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          // Performance optimizations
          progressiveRenderingEnabled={true}
          fadeDuration={0} // We handle fade ourselves
          // Cache optimization - commented out as it might cause issues
          // cache="force-cache"
        />
      </Animated.View>

      {/* Temporary debug - show opacity value */}
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "yellow",
          padding: 2,
        }}
      >
        <Text style={{ fontSize: 8, color: "black" }}>
          {loading ? "L" : error ? "E" : "OK"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SURFACE,
  },
});

export default OptimizedImage;

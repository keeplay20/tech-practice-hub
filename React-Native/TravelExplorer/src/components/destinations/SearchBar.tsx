import React, { useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  showFilterButton?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search destinations...",
  onFilterPress,
  showFilterButton = true,
}: SearchBarProps) {
  const textInputRef = useRef<TextInput>(null);

  const handleSearchContainerPress = () => {
    textInputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.searchContainer,
          { backgroundColor: colors.background, borderColor: colors.border },
        ]}
        onPress={handleSearchContainerPress}
        activeOpacity={1}
      >
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          ref={textInputRef}
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          keyboardType="default"
          {...(Platform.OS === "android" && {
            underlineColorAndroid: "transparent",
            textAlignVertical: "center",
          })}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            style={styles.clearButton}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {showFilterButton && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginRight: 12,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingVertical: 0,
    ...(Platform.OS === "android" && {
      paddingTop: 0,
      paddingBottom: 0,
    }),
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

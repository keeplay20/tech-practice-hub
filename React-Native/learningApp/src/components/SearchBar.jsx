/**
 * SearchBar — controlled text input isolated from list re-renders.
 *
 * Interview talking points:
 * - Local typing state lives in parent; this component only renders the input
 * - memo prevents re-renders when unrelated list state (pagination, favorites) changes
 * - clear button resets query immediately (debounce still applies downstream)
 */

import React, { memo } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

/**
 * @param {{
 *   value: string,
 *   onChangeText: (text: string) => void,
 *   placeholder?: string,
 * }} props
 */
function SearchBarComponent({ value, onChangeText, placeholder = 'Search games by title or genre…' }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b6b80"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never"
        accessibilityLabel="Search games"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
        >
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

export const SearchBar = memo(SearchBarComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  input: {
    flex: 1,
    height: 44,
    color: '#ffffff',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearText: {
    color: '#a0a0b8',
    fontSize: 16,
  },
});

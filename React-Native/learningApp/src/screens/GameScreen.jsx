/**
 * GameScreen — orchestrates search, data fetching, and list presentation.
 *
 * Interview talking points:
 * - UI state (input text) vs server state (debounced query) are separated
 * - Zustand selectors subscribe to minimal slices → fewer re-renders
 * - Business logic lives in the store; this screen only wires hooks + components
 */

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components/SearchBar';
import { GamesList } from '../components/GamesList';
import { useDebounce } from '../hooks/useDebounce';
import { useGamesStore } from '../store/gamesStore';

const DEBOUNCE_MS = 500;

export function GameScreen() {
  // Immediate input value — keeps TextInput responsive
  const [inputValue, setInputValue] = useState('');
  const debouncedQuery = useDebounce(inputValue, DEBOUNCE_MS);

  // Fine-grained selectors: each hook only re-renders when its slice changes
  const gameIds = useGamesStore((s) => s.ids);
  const entities = useGamesStore((s) => s.entities);
  const favorites = useGamesStore((s) => s.favorites);
  const status = useGamesStore((s) => s.status);
  const hasMore = useGamesStore((s) => s.hasMore);
  const error = useGamesStore((s) => s.error);
  const searchQuery = useGamesStore((s) => s.searchQuery);

  const searchGames = useGamesStore((s) => s.searchGames);
  const loadMoreGames = useGamesStore((s) => s.loadMoreGames);
  const refreshGames = useGamesStore((s) => s.refreshGames);
  const toggleFavorite = useGamesStore((s) => s.toggleFavorite);
  const retry = useGamesStore((s) => s.retry);

  // Debounced search — also handles initial load when debouncedQuery is ''
  useEffect(() => {
    searchGames(debouncedQuery);
  }, [debouncedQuery, searchGames]);

  const getGameById = useCallback((id) => entities[id], [entities]);

  const isFavorite = useCallback((id) => Boolean(favorites[id]), [favorites]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.heading}>Discover Games</Text>
        <Text style={styles.subheading}>Find your next adventure</Text>
      </View>

      <SearchBar value={inputValue} onChangeText={setInputValue} />

      <GamesList
        gameIds={gameIds}
        getGameById={getGameById}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        status={status}
        hasMore={hasMore}
        error={error}
        onLoadMore={loadMoreGames}
        onRefresh={refreshGames}
        onRetry={retry}
        searchQuery={searchQuery}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  subheading: {
    color: '#a0a0b8',
    fontSize: 14,
    marginTop: 4,
  },
});

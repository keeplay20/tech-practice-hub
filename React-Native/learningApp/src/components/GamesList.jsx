/**
 * GamesList — optimized FlatList with all scroll-driven states.
 *
 * Interview talking points:
 * - keyExtractor + getItemLayout → predictable recycling
 * - renderItem wrapped in useCallback; GameCard is memoized
 * - ListEmptyComponent only when not loading (avoid flash during fetch)
 * - onEndReached guarded by hasMore + status to prevent duplicate pages
 */

import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  StyleSheet,
} from 'react-native';
import { GameCard, CARD_HEIGHT } from './GameCard';

const ITEM_HEIGHT = CARD_HEIGHT + 12; // card height + vertical margins

/**
 * @param {{
 *   gameIds: string[],
 *   getGameById: (id: string) => { id: string, title: string, genre: string, rating: number, imageUrl: string } | undefined,
 *   isFavorite: (id: string) => boolean,
 *   onToggleFavorite: (id: string) => void,
 *   status: string,
 *   hasMore: boolean,
 *   error: string | null,
 *   onLoadMore: () => void,
 *   onRefresh: () => void,
 *   onRetry: () => void,
 *   searchQuery: string,
 * }} props
 */
function GamesListComponent({
  gameIds,
  getGameById,
  isFavorite,
  onToggleFavorite,
  status,
  hasMore,
  error,
  onLoadMore,
  onRefresh,
  onRetry,
  searchQuery,
}) {
  const isInitialLoading = status === 'loading';
  const isRefreshing = status === 'refreshing';
  const isLoadingMore = status === 'loadingMore';
  const isError = status === 'error';
  const showEmpty = status === 'success' && gameIds.length === 0;

  const renderItem = useCallback(
    ({ item: gameId }) => {
      const game = getGameById(gameId);
      if (!game) return null;

      return (
        <GameCard
          id={game.id}
          title={game.title}
          genre={game.genre}
          rating={game.rating}
          imageUrl={game.imageUrl}
          isFavorite={isFavorite(gameId)}
          onToggleFavorite={onToggleFavorite}
        />
      );
    },
    [getGameById, isFavorite, onToggleFavorite]
  );

  const keyExtractor = useCallback((gameId) => gameId, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const handleEndReached = useCallback(() => {
    if (hasMore && status === 'success') {
      onLoadMore();
    }
  }, [hasMore, status, onLoadMore]);

  const ListFooter = useMemo(() => {
    if (isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#e94560" />
          <Text style={styles.footerText}>Loading more…</Text>
        </View>
      );
    }
    if (!hasMore && gameIds.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>You&apos;ve reached the end</Text>
        </View>
      );
    }
    return <View style={styles.footerSpacer} />;
  }, [isLoadingMore, hasMore, gameIds.length]);

  const ListEmpty = useMemo(() => {
    if (isInitialLoading) return null;

    if (isError) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    if (showEmpty) {
      return (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>No games found</Text>
          <Text style={styles.emptyMessage}>
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search.`
              : 'No games available right now.'}
          </Text>
        </View>
      );
    }

    return null;
  }, [isInitialLoading, isError, showEmpty, error, onRetry, searchQuery]);

  // Full-screen loader on first fetch (no cached data to show)
  if (isInitialLoading && gameIds.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Discovering games…</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={gameIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.4}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#e94560"
          colors={['#e94560']}
        />
      }
      // FlatList performance knobs
      removeClippedSubviews
      maxToRenderPerBatch={8}
      windowSize={7}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
      contentContainerStyle={gameIds.length === 0 ? styles.emptyContainer : styles.listContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

export const GamesList = memo(GamesListComponent);

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  loadingText: {
    marginTop: 12,
    color: '#a0a0b8',
    fontSize: 15,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyMessage: {
    color: '#a0a0b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorTitle: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#a0a0b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerSpacer: {
    height: 16,
  },
  footerText: {
    color: '#a0a0b8',
    fontSize: 13,
  },
});

/**
 * GameCard — presentational row for a single game.
 *
 * Interview talking points:
 * - React.memo: skip re-render when props are referentially equal
 * - Receives primitives + stable callbacks, not the whole store
 * - expo-image caches remote URLs and avoids layout shift via contentFit
 */

import React, { memo, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

/**
 * @param {{
 *   id: string,
 *   title: string,
 *   genre: string,
 *   rating: number,
 *   imageUrl: string,
 *   isFavorite: boolean,
 *   onToggleFavorite: (id: string) => void,
 * }} props
 */
function GameCardComponent({
  id,
  title,
  genre,
  rating,
  imageUrl,
  isFavorite,
  onToggleFavorite,
}) {
  const handleFavoritePress = useCallback(() => {
    onToggleFavorite(id);
  }, [id, onToggleFavorite]);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
        accessibilityLabel={`${title} cover art`}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.genre}>{genre}</Text>
        <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
      </View>

      <Pressable
        onPress={handleFavoritePress}
        style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityState={{ selected: isFavorite }}
        hitSlop={8}
      >
        <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
          {isFavorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

/** Shallow prop compare — sufficient because we pass flat primitives */
export const GameCard = memo(GameCardComponent);

const CARD_HEIGHT = 104;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    height: CARD_HEIGHT,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#2a2a4a',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  genre: {
    color: '#a0a0b8',
    fontSize: 13,
    marginBottom: 2,
  },
  rating: {
    color: '#f5c518',
    fontSize: 13,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#666680',
  },
  favoriteActive: {
    color: '#e94560',
  },
});

export { CARD_HEIGHT };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, SavedGame } from '../types/sudoku';

const CURRENT_GAME_KEY = '@sudoku_current_game';
const SAVED_GAMES_KEY = '@sudoku_saved_games';

// Save current game
export async function saveCurrentGame(gameState: GameState): Promise<void> {
  try {
    const jsonValue = JSON.stringify(gameState);
    await AsyncStorage.setItem(CURRENT_GAME_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving current game:', e);
  }
}

// Load current game
export async function loadCurrentGame(): Promise<GameState | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(CURRENT_GAME_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error loading current game:', e);
    return null;
  }
}

// Clear current game
export async function clearCurrentGame(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_GAME_KEY);
  } catch (e) {
    console.error('Error clearing current game:', e);
  }
}

// Save completed game
export async function saveCompletedGame(gameState: GameState): Promise<void> {
  try {
    const savedGames = await loadSavedGames();
    const newGame: SavedGame = {
      id: Date.now().toString(),
      gameState,
      savedAt: Date.now(),
    };
    
    savedGames.push(newGame);
    
    // Keep only last 10 games
    const recentGames = savedGames.slice(-10);
    const jsonValue = JSON.stringify(recentGames);
    await AsyncStorage.setItem(SAVED_GAMES_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving completed game:', e);
  }
}

// Load saved games
export async function loadSavedGames(): Promise<SavedGame[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(SAVED_GAMES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading saved games:', e);
    return [];
  }
}

// Delete saved game
export async function deleteSavedGame(gameId: string): Promise<void> {
  try {
    const savedGames = await loadSavedGames();
    const filteredGames = savedGames.filter(game => game.id !== gameId);
    const jsonValue = JSON.stringify(filteredGames);
    await AsyncStorage.setItem(SAVED_GAMES_KEY, jsonValue);
  } catch (e) {
    console.error('Error deleting saved game:', e);
  }
}


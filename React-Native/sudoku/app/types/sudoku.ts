export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export interface Cell {
  value: CellValue;
  isFixed: boolean; // True for initial puzzle numbers (immutable)
  isValid: boolean; // True if the number doesn't violate Sudoku rules
  notes?: number[]; // For note-taking feature (optional)
}

export type SudokuGrid = Cell[][];

export interface GameState {
  grid: SudokuGrid;
  initialGrid: SudokuGrid; // Store the initial state for reset
  selectedCell: { row: number; col: number } | null;
  isComplete: boolean;
}

export interface SavedGame {
  id: string;
  gameState: GameState;
  savedAt: number;
}

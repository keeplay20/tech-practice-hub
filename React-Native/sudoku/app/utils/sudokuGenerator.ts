import { SudokuGrid, CellValue } from "../types/sudoku";

// Helper function to check if a number is valid in a given position
export function isValidPlacement(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: CellValue
): boolean {
  if (num === null) return true;

  // Check row
  for (let x = 0; x < 9; x++) {
    if (x !== col && grid[row][x].value === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (x !== row && grid[x][col].value === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentRow = boxRow + i;
      const currentCol = boxCol + j;
      if (
        (currentRow !== row || currentCol !== col) &&
        grid[currentRow][currentCol].value === num
      ) {
        return false;
      }
    }
  }

  return true;
}

// Create empty grid
export function createEmptyGrid(): SudokuGrid {
  const grid: SudokuGrid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      grid[i][j] = {
        value: null,
        isFixed: false,
        isValid: true,
      };
    }
  }
  return grid;
}

// Deep clone grid
export function cloneGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
    }))
  );
}

// Validate the entire grid
export function validateGrid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = grid[row][col];
      if (cell.value !== null) {
        // Temporarily remove the value to check if it's valid
        const temp = cell.value;
        grid[row][col].value = null;
        const valid = isValidPlacement(grid, row, col, temp);
        grid[row][col].value = temp;
        grid[row][col].isValid = valid;
        if (!valid) return false;
      }
    }
  }
  return true;
}

// Check if puzzle is complete
export function isPuzzleComplete(grid: SudokuGrid): boolean {
  // Check if all cells are filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        return false;
      }
    }
  }

  // Check if the grid is valid
  return validateGrid(grid);
}

// Update cell validation status
export function updateCellValidation(grid: SudokuGrid): SudokuGrid {
  const newGrid = cloneGrid(grid);
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (newGrid[row][col].value !== null) {
        const temp = newGrid[row][col].value;
        newGrid[row][col].value = null;
        newGrid[row][col].isValid = isValidPlacement(newGrid, row, col, temp);
        newGrid[row][col].value = temp;
      }
    }
  }
  return newGrid;
}

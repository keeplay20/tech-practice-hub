# Memory Card Matching Game 🎮

A beautiful and interactive memory card matching game built with React and Vite.

## Features ✨

- **Card Grid Layout**: 4x4 grid with 16 cards (8 pairs of matching symbols)
- **Card Flipping Animation**: Smooth 3D flip animations when cards are clicked
- **Matching Logic**:
  - Click two cards to flip them
  - If they match, they stay flipped and get highlighted
  - If they don't match, they flip back after a brief delay
- **Game Lock**: Players cannot click additional cards while two cards are being compared
- **Score Tracking**: 
  - Moves counter
  - Matched pairs counter
- **Win Condition**: Beautiful celebration modal when all pairs are matched
- **Reset Button**: Start a new game anytime

## Game Rules 📋

1. Click on any card to reveal its symbol
2. Click on a second card to reveal it
3. If both cards have the same symbol:
   - They remain face up
   - They are marked as matched with a special color
4. If the cards don't match:
   - Both cards flip back face down after 1 second
5. During comparison (when 2 cards are revealed):
   - You cannot click on other cards
6. The game ends when all pairs are matched

## Tech Stack 🛠️

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Animations and styling
- **JavaScript** - Game logic

## Running the Game 🚀

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Game Symbols 🎨

The game uses the following emoji symbols:
- 🎮 Game Controller
- 🎯 Target
- 🎨 Artist Palette
- 🎭 Theater Masks
- 🎪 Circus Tent
- 🎸 Guitar
- 🎲 Dice
- 🎳 Bowling

## Project Structure 📁

```
src/
├── App.jsx        # Main game component with game logic
├── App.css        # Game styling and animations
├── index.css      # Global styles
└── main.jsx       # Entry point
```

## Key Features Implementation 🔑

### Card Data Structure
Each card has:
- `id`: Unique identifier
- `symbol`: The emoji symbol
- `isFlipped`: Whether the card is currently flipped
- `isMatched`: Whether the card has been matched

### State Management
- `cards`: Array of all card objects
- `flippedCards`: Currently flipped cards (max 2)
- `isLocked`: Prevents clicking during comparison
- `moves`: Total number of moves made
- `matchedPairs`: Number of successfully matched pairs

### Animations
- 3D flip animation using CSS transforms
- Hover scale effect on unflipped cards
- Pulse animation on matched pairs
- Slide-in animation for win modal

## Future Enhancements 💡

- Multiple difficulty levels (4x4, 6x6, 8x8)
- Timer to track completion time
- Leaderboard for best scores
- Sound effects
- Different themes and symbol sets
- Multiplayer mode

Enjoy the game! 🎉

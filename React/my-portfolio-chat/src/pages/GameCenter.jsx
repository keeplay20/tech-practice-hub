import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TicTacToe from "../components/TicTacToe/TicTacToe";
import RockPaperScissors from "../components/RockPaperScissors/RockPaperScissors";
import Snake from "../components/Snake/Snake";
import TypingTest from "../components/TypingTest/TypingTest";

const games = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "⭕",
    description: "Classic game of X's and O's",
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    icon: "✌️",
    description: "Test your luck against AI",
  },
  {
    id: "snake",
    title: "Snake Game",
    icon: "🐍",
    description: "Classic snake adventure",
  },
  {
    id: "typing",
    title: "Typing Speed Test",
    icon: "⌨️",
    description: "Test your coding typing speed",
  },
];

const GameCard = ({ game, onSelect, isSelected }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-dark-lighter rounded-xl p-6 cursor-pointer
                transition-all duration-300 border-2
                ${
                  isSelected
                    ? "border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.2)]"
                    : "border-accent hover:border-accent-light"
                }`}
    onClick={() => onSelect(game.id)}
  >
    <div className="flex items-center gap-4">
      <span className="text-4xl">{game.icon}</span>
      <div>
        <h3 className="text-text-primary text-xl mb-1 font-mono">
          {game.title}
        </h3>
        <p className="text-text-secondary text-sm">{game.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function GameCenter({ onBack }) {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-dark text-text-primary">
      <header className="border-b border-accent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-mono"
          >
            Game Center
          </motion.h1>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full border-2 border-accent
                     hover:border-accent-light text-text-secondary
                     hover:text-text-primary transition-all duration-300"
          >
            ← Back to portfolio
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={setSelectedGame}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => setSelectedGame(null)}
                className="mb-8 text-text-secondary hover:text-text-primary
                         transition-colors duration-300"
              >
                ← Choose Another Game
              </button>
              {selectedGame === "tictactoe" ? (
                <TicTacToe />
              ) : selectedGame === "rps" ? (
                <RockPaperScissors />
              ) : selectedGame === "snake" ? (
                <Snake />
              ) : selectedGame === "typing" ? (
                <TypingTest />
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

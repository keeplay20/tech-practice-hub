import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TicTacToe from "../Games/TicTacToe/TicTacToe";
import RockPaperScissors from "../Games/RockPaperScissors/RockPaperScissors";
import Snake from "../Games/Snake/Snake";
import TypingTest from "../Games/TypingTest/TypingTest";
import "./GameCenter.css";

interface GameCenterProps {
  onBack: () => void;
}

interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const games: Game[] = [
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

interface GameCardProps {
  game: Game;
  onSelect: (gameId: string) => void;
  isSelected?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  isSelected = false,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`game-card ${isSelected ? "game-card--selected" : ""}`}
    onClick={() => onSelect(game.id)}
  >
    <div className="game-card__content">
      <span className="game-card__icon">{game.icon}</span>
      <div className="game-card__info">
        <h3 className="game-card__title">{game.title}</h3>
        <p className="game-card__description">{game.description}</p>
      </div>
    </div>
  </motion.div>
);

const GameCenter: React.FC<GameCenterProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case "tictactoe":
        return <TicTacToe />;
      case "rps":
        return <RockPaperScissors />;
      case "snake":
        return <Snake />;
      case "typing":
        return <TypingTest />;
      default:
        return null;
    }
  };

  return (
    <div className="game-center">
      <motion.header
        className="game-center__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="game-center__header-container">
          <motion.h1
            className="game-center__title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎮 Game Center
          </motion.h1>
          <motion.button
            className="btn btn-ghost game-center__back-btn"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Portfolio
          </motion.button>
        </div>
      </motion.header>

      <main className="game-center__main">
        <div className="game-center__container">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="game-center__selection"
              >
                <div className="game-center__intro">
                  <h2>Choose Your Game</h2>
                  <p>
                    Take a break and enjoy some interactive games I've built!
                  </p>
                </div>
                <div className="game-center__grid">
                  {games.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GameCard game={game} onSelect={setSelectedGame} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="game-center__game"
              >
                <div className="game-center__game-header">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="game-center__back-game-btn"
                  >
                    ← Choose Another Game
                  </button>
                </div>
                <div className="game-center__game-content">{renderGame()}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default GameCenter;

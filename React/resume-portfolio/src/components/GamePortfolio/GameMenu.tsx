import React from "react";
import { motion } from "framer-motion";
import { GameState } from "./GamePortfolio";
import "./GameMenu.css";

interface GameMenuProps {
  gameState: GameState;
  onClose: () => void;
  onReset: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ gameState, onClose, onReset }) => {
  return (
    <motion.div
      className="game-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="game-menu-panel"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-header">
          <h2>⚙️ Game Menu</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="menu-stats">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-label">Level</div>
              <div className="stat-value">{gameState.level}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <div className="stat-label">Total XP</div>
              <div className="stat-value">{gameState.xp}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <div className="stat-label">Coins</div>
              <div className="stat-value">{gameState.coins}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-label">Quests</div>
              <div className="stat-value">{gameState.questsCompleted}</div>
            </div>
          </div>
        </div>

        <div className="menu-actions">
          <motion.button
            className="menu-button resume-button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶️ Resume Game
          </motion.button>
          <motion.button
            className="menu-button reset-button"
            onClick={onReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Reset Progress
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameMenu;

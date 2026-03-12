import React from "react";
import { motion } from "framer-motion";
import { GameState } from "./GamePortfolio";
import "./GameHUD.css";

interface GameHUDProps {
  gameState: GameState;
  onMenuClick: () => void;
  onQuestClick: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({ gameState, onMenuClick, onQuestClick }) => {
  const xpPercentage = (gameState.xp / gameState.xpToNextLevel) * 100;

  return (
    <div className="game-hud">
      {/* Top Bar */}
      <div className="hud-top">
        <motion.div
          className="hud-stat level-stat"
          whileHover={{ scale: 1.1 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-label">Level</div>
            <div className="stat-value">{gameState.level}</div>
          </div>
        </motion.div>

        <motion.div
          className="hud-stat xp-stat"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-label">XP</div>
            <div className="xp-bar-container">
              <motion.div
                className="xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
              <div className="xp-bar-text">
                {gameState.xp} / {gameState.xpToNextLevel}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hud-stat coins-stat"
          whileHover={{ scale: 1.1 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Coins</div>
            <div className="stat-value">{gameState.coins}</div>
          </div>
        </motion.div>
      </div>

      {/* Right Side Actions */}
      <div className="hud-right">
        <motion.button
          className="hud-button quest-button"
          onClick={onQuestClick}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="button-icon">📜</span>
          <span className="button-label">Quests</span>
          {gameState.questsCompleted > 0 && (
            <span className="button-badge">{gameState.questsCompleted}</span>
          )}
        </motion.button>

        <motion.button
          className="hud-button menu-button"
          onClick={onMenuClick}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="button-icon">☰</span>
          <span className="button-label">Menu</span>
        </motion.button>
      </div>

      {/* Zone Indicator */}
      <motion.div
        className="zone-indicator"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="zone-name">
          {gameState.currentZone === "home"
            ? "🏠 Home Base"
            : gameState.currentZone === "projects"
            ? "💻 Project Zone"
            : gameState.currentZone === "skills"
            ? "📚 Skill Tree"
            : gameState.currentZone === "experience"
            ? "⚔️ Experience Dungeon"
            : "📧 Contact Portal"}
        </div>
      </motion.div>
    </div>
  );
};

export default GameHUD;

import React from "react";
import { motion } from "framer-motion";
import { GameState } from "./GamePortfolio";
import "./QuestSystem.css";

interface Quest {
  id: string;
  title: string;
  description: string;
  type: "explore" | "complete" | "discover";
  target: string;
  reward: { xp: number; coins: number };
  completed: boolean;
}

interface QuestSystemProps {
  gameState: GameState;
  onClose: () => void;
  onQuestComplete: (questId: string, reward: { xp: number; coins: number }) => void;
}

const QuestSystem: React.FC<QuestSystemProps> = ({ gameState, onClose, onQuestComplete }) => {
  const quests: Quest[] = [
    {
      id: "explore-projects",
      title: "🎯 Explore Projects",
      description: "Visit the Project Zone and view at least 2 projects",
      type: "explore",
      target: "projects",
      reward: { xp: 50, coins: 25 },
      completed: gameState.unlockedZones.includes("projects"),
    },
    {
      id: "master-skills",
      title: "📚 Master Skills",
      description: "Unlock the Skill Tree and discover 5 skills",
      type: "discover",
      target: "skills",
      reward: { xp: 75, coins: 50 },
      completed: gameState.unlockedZones.includes("skills"),
    },
    {
      id: "level-up",
      title: "⭐ Level Up",
      description: "Reach Level 3",
      type: "complete",
      target: "level",
      reward: { xp: 100, coins: 75 },
      completed: gameState.level >= 3,
    },
    {
      id: "collect-coins",
      title: "💰 Coin Collector",
      description: "Collect 100 coins",
      type: "complete",
      target: "coins",
      reward: { xp: 50, coins: 50 },
      completed: gameState.coins >= 100,
    },
  ];

  const handleQuestClick = (quest: Quest) => {
    if (!quest.completed) {
      // Mark as completed and give reward
      onQuestComplete(quest.id, quest.reward);
    }
  };

  return (
    <motion.div
      className="quest-system-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="quest-system-panel"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="quest-header">
          <h2>📜 Quest Log</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="quest-list">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              className={`quest-item ${quest.completed ? "completed" : ""}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleQuestClick(quest)}
            >
              <div className="quest-icon">{quest.completed ? "✅" : "⭕"}</div>
              <div className="quest-content">
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <div className="quest-reward">
                  <span>⚡ +{quest.reward.xp} XP</span>
                  <span>💰 +{quest.reward.coins} Coins</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="quest-stats">
          <p>
            Completed: {quests.filter((q) => q.completed).length} / {quests.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestSystem;

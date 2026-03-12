import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WorkspaceScene.css";

interface WorkspaceSceneProps {
  onNavigate: (section: string) => void;
}

interface FunFact {
  emoji: string;
  text: string;
}

const funFacts: FunFact[] = [
  { emoji: "☕", text: "Powered by TypeScript & Caffeine" },
  { emoji: "🎮", text: "Built 3 games for this portfolio!" },
  { emoji: "📱", text: "React Native is my superpower" },
  { emoji: "🌙", text: "Best code written after midnight" },
  { emoji: "🎨", text: "Design + Code = ❤️" },
  { emoji: "⚡", text: "Performance optimization enthusiast" },
];

const WorkspaceScene: React.FC<WorkspaceSceneProps> = ({ onNavigate }) => {
  const [showFunFact, setShowFunFact] = useState(false);
  const [currentFact, setCurrentFact] = useState(funFacts[0]);
  const [discoveredItems, setDiscoveredItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleItemClick = (item: string) => {
    if (!discoveredItems.includes(item)) {
      setDiscoveredItems([...discoveredItems, item]);
      setScore(score + 10);
    }
  };

  const handleCoffeeClick = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFact(randomFact);
    setShowFunFact(true);
    handleItemClick("coffee");
    setTimeout(() => setShowFunFact(false), 3000);
  };

  const handleComputerClick = () => {
    handleItemClick("computer");
    onNavigate("projects");
  };

  const handleBooksClick = () => {
    handleItemClick("books");
    onNavigate("skills");
  };

  const handlePhoneClick = () => {
    handleItemClick("phone");
    onNavigate("contact");
  };

  const handleTrophyClick = () => {
    handleItemClick("trophy");
    onNavigate("games");
  };

  return (
    <div className="workspace-scene">
      {/* Progress Tracker */}
      <motion.div
        className="progress-tracker"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="progress-content">
          <span className="progress-label">Exploration</span>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(discoveredItems.length / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-text">
            {discoveredItems.length}/5 discovered
          </span>
        </div>
        {score > 0 && (
          <motion.div
            className="score-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🎯 {score} pts
          </motion.div>
        )}
      </motion.div>

      {/* Main Workspace */}
      <div className="workspace-container">
        <motion.div
          className="workspace-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome to My Digital Workspace</h1>
          <p className="workspace-subtitle">Click around to discover what I do</p>
        </motion.div>

        <div className="desk-grid">
          {/* Computer - Projects */}
          <motion.div
            className="workspace-item computer"
            onClick={handleComputerClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="item-icon">💻</div>
            <div className="item-content">
              <h3>My Projects</h3>
              <p>Click to explore</p>
            </div>
            <div className="item-glow" />
            {discoveredItems.includes("computer") && (
              <motion.div
                className="discovered-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Books - Skills */}
          <motion.div
            className="workspace-item books"
            onClick={handleBooksClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="item-icon">📚</div>
            <div className="item-content">
              <h3>Tech Stack</h3>
              <p>My skillset</p>
            </div>
            <div className="item-glow" />
            {discoveredItems.includes("books") && (
              <motion.div
                className="discovered-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Coffee - Fun Facts */}
          <motion.div
            className="workspace-item coffee"
            onClick={handleCoffeeClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="item-icon">☕</div>
            <div className="item-content">
              <h3>Fun Fact</h3>
              <p>Click for surprise</p>
            </div>
            <div className="item-glow" />
            {discoveredItems.includes("coffee") && (
              <motion.div
                className="discovered-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Phone - Contact */}
          <motion.div
            className="workspace-item phone"
            onClick={handlePhoneClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="item-icon">📱</div>
            <div className="item-content">
              <h3>Contact</h3>
              <p>Let's connect</p>
            </div>
            <div className="item-glow" />
            {discoveredItems.includes("phone") && (
              <motion.div
                className="discovered-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Trophy - Games */}
          <motion.div
            className="workspace-item trophy"
            onClick={handleTrophyClick}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="item-icon">🎮</div>
            <div className="item-content">
              <h3>Play Games</h3>
              <p>Test your skills</p>
            </div>
            <div className="item-glow" />
            {discoveredItems.includes("trophy") && (
              <motion.div
                className="discovered-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Achievement Notification */}
        {discoveredItems.length === 5 && (
          <motion.div
            className="achievement-popup"
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="achievement-content">
              <span className="achievement-icon">🏆</span>
              <div>
                <h4>Achievement Unlocked!</h4>
                <p>Curious Explorer - Discovered all items</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fun Fact Popup */}
      <AnimatePresence>
        {showFunFact && (
          <motion.div
            className="fun-fact-popup"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="fun-fact-emoji">{currentFact.emoji}</span>
            <p>{currentFact.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100],
              x: Math.random() * 50 - 25,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceScene;

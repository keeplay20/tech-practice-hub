import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./GamePortfolio.css";
import GameCharacter from "./GameCharacter";
import GameWorld from "./GameWorld";
import GameHUD from "./GameHUD";
import QuestSystem from "./QuestSystem";
import ProjectZone from "./zones/ProjectZone";
import SkillZone from "./zones/SkillZone";
import ExperienceZone from "./zones/ExperienceZone";
import ContactZone from "./zones/ContactZone";
import GameMenu from "./GameMenu";

export interface GameState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  questsCompleted: number;
  currentZone: string;
  unlockedZones: string[];
  inventory: string[];
}

const INITIAL_STATE: GameState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  coins: 0,
  questsCompleted: 0,
  currentZone: "home",
  unlockedZones: ["home"],
  inventory: [],
};

const GamePortfolio: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem("gamePortfolioState");
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [showMenu, setShowMenu] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Save game state
  useEffect(() => {
    localStorage.setItem("gamePortfolioState", JSON.stringify(gameState));
  }, [gameState]);

  // Show notification
  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Add XP
  const addXP = useCallback((amount: number) => {
    setGameState((prev) => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNextLevel;

      // Level up
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel += 1;
        newXPToNext = Math.floor(newXPToNext * 1.5);
        showNotification(`🎉 Level Up! You're now Level ${newLevel}!`);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
      };
    });
  }, [showNotification]);

  // Add coins
  const addCoins = useCallback((amount: number) => {
    setGameState((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
    showNotification(`💰 +${amount} Coins!`);
  }, [showNotification]);

  // Complete quest
  const completeQuest = useCallback((questId: string, reward: { xp: number; coins: number }) => {
    setGameState((prev) => ({
      ...prev,
      questsCompleted: prev.questsCompleted + 1,
    }));
    addXP(reward.xp);
    addCoins(reward.coins);
    showNotification(`✅ Quest Completed! +${reward.xp} XP, +${reward.coins} Coins`);
  }, [addXP, addCoins, showNotification]);

  // Unlock zone
  const unlockZone = useCallback((zoneId: string) => {
    setGameState((prev) => {
      if (prev.unlockedZones.includes(zoneId)) return prev;
      return {
        ...prev,
        unlockedZones: [...prev.unlockedZones, zoneId],
      };
    });
    showNotification(`🗺️ New Zone Unlocked: ${zoneId.toUpperCase()}!`);
  }, [showNotification]);

  // Move character
  const moveCharacter = useCallback((targetX: number, targetY: number) => {
    setIsMoving(true);
    setCharacterPosition({ x: targetX, y: targetY });
    setTimeout(() => setIsMoving(false), 1000);
  }, []);

  // Change zone
  const changeZone = useCallback((zoneId: string) => {
    if (zoneId === "home") {
      setGameState((prev) => ({ ...prev, currentZone: "home" }));
      moveCharacter(50, 50);
      return;
    }
    if (!gameState.unlockedZones.includes(zoneId)) {
      showNotification("🔒 This zone is locked! Complete quests to unlock it.");
      return;
    }
    setGameState((prev) => ({ ...prev, currentZone: zoneId }));
    moveCharacter(50, 50);
  }, [gameState.unlockedZones, moveCharacter, showNotification]);

  // Handle world click
  const handleWorldClick = useCallback((zoneId: string, x: number, y: number) => {
    if (gameState.unlockedZones.includes(zoneId)) {
      changeZone(zoneId);
      moveCharacter(x, y);
    }
  }, [gameState.unlockedZones, changeZone, moveCharacter]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showMenu) return;

      const moveSpeed = 5;
      let newX = characterPosition.x;
      let newY = characterPosition.y;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          newY = Math.max(10, characterPosition.y - moveSpeed);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newY = Math.min(90, characterPosition.y + moveSpeed);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newX = Math.max(10, characterPosition.x - moveSpeed);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newX = Math.min(90, characterPosition.x + moveSpeed);
          break;
        case "Escape":
          setShowMenu(true);
          break;
        case "q":
        case "Q":
          setShowQuest(!showQuest);
          break;
      }

      if (newX !== characterPosition.x || newY !== characterPosition.y) {
        moveCharacter(newX, newY);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [characterPosition, showMenu, showQuest, moveCharacter]);

  const renderZone = () => {
    switch (gameState.currentZone) {
      case "projects":
        return (
          <ProjectZone
            gameState={gameState}
            onQuestComplete={completeQuest}
            onAddXP={addXP}
            onAddCoins={addCoins}
            onBack={() => changeZone("home")}
          />
        );
      case "skills":
        return (
          <SkillZone
            gameState={gameState}
            onQuestComplete={completeQuest}
            onAddXP={addXP}
            onAddCoins={addCoins}
            onBack={() => changeZone("home")}
          />
        );
      case "experience":
        return (
          <ExperienceZone
            gameState={gameState}
            onQuestComplete={completeQuest}
            onAddXP={addXP}
            onAddCoins={addCoins}
            onBack={() => changeZone("home")}
          />
        );
      case "contact":
        return (
          <ContactZone
            gameState={gameState}
            onQuestComplete={completeQuest}
            onAddXP={addXP}
            onAddCoins={addCoins}
            onBack={() => changeZone("home")}
          />
        );
      default:
        return (
          <GameWorld
            gameState={gameState}
            characterPosition={characterPosition}
            onZoneClick={handleWorldClick}
            onUnlockZone={unlockZone}
          />
        );
    }
  };

  return (
    <div className="game-portfolio">
      {/* Game HUD */}
      <GameHUD
        gameState={gameState}
        onMenuClick={() => setShowMenu(true)}
        onQuestClick={() => setShowQuest(!showQuest)}
      />

      {/* Main Game Area */}
      <div className="game-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.currentZone}
            className="zone-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {renderZone()}
          </motion.div>
        </AnimatePresence>

        {/* Character */}
        {gameState.currentZone === "home" && (
          <GameCharacter
            position={characterPosition}
            isMoving={isMoving}
            direction="down"
          />
        )}
      </div>

      {/* Quest System */}
      <AnimatePresence>
        {showQuest && (
          <QuestSystem
            gameState={gameState}
            onClose={() => setShowQuest(false)}
            onQuestComplete={completeQuest}
          />
        )}
      </AnimatePresence>

      {/* Game Menu */}
      <AnimatePresence>
        {showMenu && (
          <GameMenu
            gameState={gameState}
            onClose={() => setShowMenu(false)}
            onReset={() => {
              setGameState(INITIAL_STATE);
              localStorage.removeItem("gamePortfolioState");
              showNotification("🔄 Game Reset!");
            }}
          />
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="game-notification"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Hint */}
      <motion.div
        className="controls-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>🎮 Use WASD or Arrow Keys to move | Q for Quests | ESC for Menu</p>
      </motion.div>
    </div>
  );
};

export default GamePortfolio;

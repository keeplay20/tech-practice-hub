import React from "react";
import { motion } from "framer-motion";
import { GameState } from "./GamePortfolio";
import "./GameWorld.css";

interface GameWorldProps {
  gameState: GameState;
  characterPosition: { x: number; y: number };
  onZoneClick: (zoneId: string, x: number, y: number) => void;
  onUnlockZone: (zoneId: string) => void;
}

const GameWorld: React.FC<GameWorldProps> = ({
  gameState,
  onZoneClick,
  onUnlockZone,
}) => {
  const zones = [
    {
      id: "projects",
      name: "Project Zone",
      icon: "💻",
      position: { x: 20, y: 30 },
      color: "#60a5fa",
      description: "Explore my projects",
      unlockLevel: 1,
    },
    {
      id: "skills",
      name: "Skill Tree",
      icon: "📚",
      position: { x: 80, y: 25 },
      color: "#a78bfa",
      description: "Master your skills",
      unlockLevel: 2,
    },
    {
      id: "experience",
      name: "Experience Dungeon",
      icon: "⚔️",
      position: { x: 15, y: 70 },
      color: "#f472b6",
      description: "Battle experience",
      unlockLevel: 3,
    },
    {
      id: "contact",
      name: "Contact Portal",
      icon: "📧",
      position: { x: 85, y: 75 },
      color: "#34d399",
      description: "Reach out",
      unlockLevel: 1,
    },
  ];

  const isZoneUnlocked = (zone: typeof zones[0]) => {
    return gameState.unlockedZones.includes(zone.id) || gameState.level >= zone.unlockLevel;
  };

  return (
    <div className="game-world">
      {/* Animated Background */}
      <div className="world-background">
        <motion.div
          className="bg-layer layer-1"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="bg-layer layer-2"
          animate={{
            backgroundPosition: ["100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="world-particle"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Zone Portals */}
      {zones.map((zone, index) => {
        const unlocked = isZoneUnlocked(zone);
        return (
          <motion.div
            key={zone.id}
            className={`zone-portal ${unlocked ? "unlocked" : "locked"}`}
            style={{
              left: `${zone.position.x}%`,
              top: `${zone.position.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={unlocked ? { scale: 1.2, rotate: 5 } : {}}
            whileTap={unlocked ? { scale: 0.9 } : {}}
            onClick={() => {
              if (unlocked) {
                onZoneClick(zone.id, zone.position.x, zone.position.y);
              } else {
                onUnlockZone(zone.id);
              }
            }}
          >
            <motion.div
              className="portal-glow"
              animate={{
                boxShadow: [
                  `0 0 20px ${zone.color}40`,
                  `0 0 40px ${zone.color}80`,
                  `0 0 20px ${zone.color}40`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="portal-icon">{zone.icon}</div>
            <div className="portal-name">{zone.name}</div>
            {!unlocked && (
              <motion.div
                className="lock-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔒
              </motion.div>
            )}
            {unlocked && (
              <motion.div
                className="unlock-effect"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Welcome Message */}
      <motion.div
        className="world-welcome"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h1>Welcome to the Developer's Realm!</h1>
        <p>Click on portals to explore different zones</p>
        <p className="hint">💡 Complete quests to unlock new areas!</p>
      </motion.div>

      {/* Path Lines */}
      <svg className="zone-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        {zones.map((zone) => (
          <motion.line
            key={zone.id}
            x1="50"
            y1="50"
            x2={zone.position.x}
            y2={zone.position.y}
            stroke={zone.color}
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity={0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default GameWorld;

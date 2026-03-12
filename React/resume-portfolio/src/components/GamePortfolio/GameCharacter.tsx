import React from "react";
import { motion } from "framer-motion";
import "./GameCharacter.css";

interface GameCharacterProps {
  position: { x: number; y: number };
  isMoving: boolean;
  direction: "up" | "down" | "left" | "right";
}

const GameCharacter: React.FC<GameCharacterProps> = ({
  position,
  isMoving,
  direction,
}) => {
  return (
    <motion.div
      className={`game-character ${isMoving ? "walking" : ""} ${direction}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        y: isMoving ? [-2, 2, -2] : 0,
      }}
      transition={{
        duration: 0.5,
        repeat: isMoving ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div className="character-sprite">
        <div className="character-head">👤</div>
        <div className="character-body">
          <div className="character-arms">
            <span className="arm left">╱</span>
            <span className="arm right">╲</span>
          </div>
          <div className="character-torso">█</div>
          <div className="character-legs">
            <span className="leg left">╱</span>
            <span className="leg right">╲</span>
          </div>
        </div>
      </div>
      {isMoving && (
        <motion.div
          className="walking-particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <span>✨</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameCharacter;

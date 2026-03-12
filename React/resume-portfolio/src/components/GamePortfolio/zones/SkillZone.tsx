import React, { useState } from "react";
import { motion } from "framer-motion";
import { GameState } from "../GamePortfolio";
import "./ZoneStyles.css";

interface SkillZoneProps {
  gameState: GameState;
  onQuestComplete: (questId: string, reward: { xp: number; coins: number }) => void;
  onAddXP: (amount: number) => void;
  onAddCoins: (amount: number) => void;
  onBack: () => void;
}

const skills = [
  { name: "React Native", level: 90, icon: "📱", color: "#61DAFB" },
  { name: "TypeScript", level: 85, icon: "📘", color: "#3178C6" },
  { name: "React", level: 88, icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", level: 90, icon: "🟨", color: "#F7DF1E" },
  { name: "CSS/SCSS", level: 85, icon: "🎨", color: "#1572B6" },
  { name: "Node.js", level: 75, icon: "🟢", color: "#339933" },
  { name: "Git", level: 80, icon: "🔀", color: "#F05032" },
  { name: "Expo", level: 85, icon: "📦", color: "#000020" },
];

const SkillZone: React.FC<SkillZoneProps> = ({ onAddXP, onAddCoins, onBack }) => {
  const [discoveredSkills, setDiscoveredSkills] = useState<string[]>([]);

  const handleSkillClick = (skillName: string) => {
    if (!discoveredSkills.includes(skillName)) {
      setDiscoveredSkills([...discoveredSkills, skillName]);
      onAddXP(15);
      onAddCoins(10);
    }
  };

  return (
    <div className="zone-container skill-zone">
      <div className="zone-background skill-bg" />
      
      <motion.div
        className="zone-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.button
          className="back-button"
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← Back to World
        </motion.button>
        <h1>📚 Skill Tree</h1>
        <p>Click skills to discover your proficiency levels</p>
      </motion.div>

      <div className="skill-tree">
        {skills.map((skill, index) => {
          const discovered = discoveredSkills.includes(skill.name);
          return (
            <motion.div
              key={skill.name}
              className={`skill-node ${discovered ? "discovered" : "hidden"}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSkillClick(skill.name)}
            >
              <div className="skill-icon">{skill.icon}</div>
              {discovered ? (
                <>
                  <h3>{skill.name}</h3>
                  <div className="skill-level-bar">
                    <motion.div
                      className="skill-level-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="skill-level-text">{skill.level}%</span>
                  </div>
                </>
              ) : (
                <div className="skill-mystery">❓</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="skill-stats">
        <p>Discovered: {discoveredSkills.length} / {skills.length}</p>
      </div>
    </div>
  );
};

export default SkillZone;

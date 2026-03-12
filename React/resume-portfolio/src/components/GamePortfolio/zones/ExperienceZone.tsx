import React from "react";
import { motion } from "framer-motion";
import { GameState } from "../GamePortfolio";
import "./ZoneStyles.css";

interface ExperienceZoneProps {
  gameState: GameState;
  onQuestComplete: (questId: string, reward: { xp: number; coins: number }) => void;
  onAddXP: (amount: number) => void;
  onAddCoins: (amount: number) => void;
  onBack: () => void;
}

const ExperienceZone: React.FC<ExperienceZoneProps> = ({ onAddXP, onAddCoins, onBack }) => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      achievements: [
        "Built 10+ mobile applications",
        "Developed responsive web applications",
        "Collaborated with clients worldwide",
      ],
    },
    {
      title: "React Native Specialist",
      company: "Personal Projects",
      period: "2021 - Present",
      achievements: [
        "Created MovieBuzz app",
        "Developed Sudoku game",
        "Built Travel Explorer app",
      ],
    },
  ];

  return (
    <div className="zone-container experience-zone">
      <div className="zone-background experience-bg" />
      
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
        <h1>⚔️ Experience Dungeon</h1>
        <p>Battle through your professional journey</p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <div className="exp-icon">⚔️</div>
            <div className="exp-content">
              <h3>{exp.title}</h3>
              <p className="exp-company">{exp.company}</p>
              <p className="exp-period">{exp.period}</p>
              <ul className="exp-achievements">
                {exp.achievements.map((ach, i) => (
                  <li key={i}>✓ {ach}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceZone;

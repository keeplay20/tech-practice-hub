import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "../GamePortfolio";
import { projects } from "../../../data/portfolio";
import "./ZoneStyles.css";

interface ProjectZoneProps {
  gameState: GameState;
  onQuestComplete: (questId: string, reward: { xp: number; coins: number }) => void;
  onAddXP: (amount: number) => void;
  onAddCoins: (amount: number) => void;
  onBack: () => void;
}

const ProjectZone: React.FC<ProjectZoneProps> = ({
  gameState,
  onAddXP,
  onAddCoins,
  onBack,
}) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [viewedProjects, setViewedProjects] = useState<string[]>([]);

  const handleProjectClick = (projectId: string) => {
    if (!viewedProjects.includes(projectId)) {
      setViewedProjects([...viewedProjects, projectId]);
      onAddXP(25);
      onAddCoins(15);
    }
    setSelectedProject(projectId);
  };

  const project = projects.find((p) => p.id === selectedProject);

  return (
    <div className="zone-container project-zone">
      <div className="zone-background project-bg" />
      
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
        <h1>💻 Project Zone</h1>
        <p>Click on project cards to explore</p>
      </motion.div>

      <div className="zone-content">
        <div className="project-grid">
          {projects.slice(0, 4).map((proj, index) => (
            <motion.div
              key={proj.id}
              className={`project-card ${viewedProjects.includes(proj.id) ? "viewed" : ""}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProjectClick(proj.id)}
            >
              <div className="card-glow" />
              <div className="card-icon">{proj.category === "Mobile App" ? "📱" : "🌐"}</div>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <div className="card-badges">
                {proj.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              {viewedProjects.includes(proj.id) && (
                <motion.div
                  className="viewed-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓ Viewed
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {project && (
            <motion.div
              className="project-detail-panel"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
            >
              <button
                className="close-detail"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <h2>{project.title}</h2>
              <div className="detail-content">
                <div className="detail-section">
                  <h3>🎯 Features</h3>
                  <ul>
                    {project.features.slice(0, 4).map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-section">
                  <h3>⚡ Highlights</h3>
                  <ul>
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-actions">
                  {project.githubRepo && (
                    <a
                      href={project.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button"
                    >
                      🔗 View Code
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button"
                    >
                      🚀 Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectZone;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryNode } from "./ResumeStory3D";
import "./StoryUI.css";

interface StoryUIProps {
  currentNode: StoryNode | null;
  onClose: () => void;
  isTransitioning: boolean;
}

const StoryUI: React.FC<StoryUIProps> = ({ currentNode, onClose, isTransitioning }) => {
  if (!currentNode) return null;

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          className="story-detail-panel"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <button className="close-button" onClick={onClose}>
            ✕
          </button>

          <div className="detail-header">
            <span className="detail-icon">{currentNode.icon}</span>
            <h2>{currentNode.title}</h2>
            <p className="detail-description">{currentNode.description}</p>
          </div>

          {currentNode.details && (
            <div className="detail-content">
              {currentNode.type === "project" && currentNode.details.technologies && (
                <div className="detail-section">
                  <h3>Technologies</h3>
                  <div className="tech-tags">
                    {currentNode.details.technologies.map((tech: string, i: number) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {currentNode.details.link && (
                    <a
                      href={currentNode.details.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-link"
                    >
                      🔗 View Project
                    </a>
                  )}
                </div>
              )}

              {currentNode.type === "skill" && currentNode.details.skills && (
                <div className="detail-section">
                  <h3>Core Skills</h3>
                  <div className="skill-list">
                    {currentNode.details.skills.map((skill: string, i: number) => (
                      <div key={i} className="skill-item">
                        <span className="skill-bullet">●</span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentNode.type === "contact" && (
                <div className="detail-section">
                  <h3>Get in Touch</h3>
                  <div className="contact-options">
                    <a
                      href="https://github.com/mandarvyas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      🔗 GitHub
                    </a>
                    <a
                      href="mailto:your-email@example.com"
                      className="contact-link"
                    >
                      📧 Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryUI;

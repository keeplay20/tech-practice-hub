import React from "react";
import { motion } from "framer-motion";
import Projects from "../Projects/Projects"; // Re-using the Projects component
import "./ProjectsPage.css";

interface ProjectsPageProps {
  onBack: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
  return (
    <div className="projects-page">
      {/* Header */}
      <motion.header
        className="projects-page__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="projects-page__header-container">
          <motion.h1
            className="projects-page__title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🚀 My Projects
          </motion.h1>
          <motion.button
            className="btn btn-ghost projects-page__back-btn"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Portfolio
          </motion.button>
        </div>
      </motion.header>

      <main className="projects-page__content">
        <Projects /> {/* Render the Projects component here */}
      </main>
    </div>
  );
};

export default ProjectsPage;

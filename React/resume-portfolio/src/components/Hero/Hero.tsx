import React from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolio";
import "./Hero.css";

interface HeroProps {
  onProjectsClick: () => void;
  onGamesClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onProjectsClick, onGamesClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero__badge" variants={itemVariants}>
            <span className="hero__badge-dot" />
            10 years · React &amp; React Native
          </motion.div>

          {/* Headline */}
          <motion.h1 className="hero__title" variants={itemVariants}>
            Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
          </motion.h1>

          {/* Role */}
          <motion.p className="hero__role" variants={itemVariants}>
            {personalInfo.title} · Dream11
          </motion.p>

          {/* Description */}
          <motion.p className="hero__description" variants={itemVariants}>
            I build the React Native features 150M+ Dream11 users tap every match day.
          </motion.p>

          {/* Action Cards */}
          <motion.div className="hero__cards" variants={itemVariants}>
            <motion.div
              className="hero__card hero__card--projects"
              onClick={onProjectsClick}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <span className="hero__card-title">Projects</span>
              <span className="hero__card-sub">View my work →</span>
            </motion.div>
            <motion.div
              className="hero__card hero__card--games"
              onClick={onGamesClick}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              <span className="hero__card-title">Mini Games</span>
              <span className="hero__card-sub">Play & explore →</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background */}
      <div className="hero__background">
        <motion.div
          className="hero__bg-element hero__bg-element--1"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="hero__bg-element hero__bg-element--2"
          animate={{ rotate: -360, scale: [1, 0.9, 1] }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>
    </section>
  );
};

export default Hero;

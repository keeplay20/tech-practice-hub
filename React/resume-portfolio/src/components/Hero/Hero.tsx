import React from "react";
import { motion } from "framer-motion";
import { personalInfo, heroStats } from "../../data/portfolio";
import "./Hero.css";

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
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
          {/* Main Content */}
          <div className="hero__main">
            <motion.div className="hero__text" variants={itemVariants}>
              <motion.h1 className="hero__title">
                Hi, I'm{" "}
                <span className="hero__name text-gradient">
                  {personalInfo.name}
                </span>
              </motion.h1>

              <motion.h2 className="hero__subtitle" variants={itemVariants}>
                {personalInfo.title}
              </motion.h2>

              <motion.p className="hero__description" variants={itemVariants}>
                {personalInfo.summary}
              </motion.p>

              <motion.div className="hero__actions" variants={itemVariants}>
                <motion.button
                  className="btn btn-primary"
                  onClick={() => scrollToSection("experience")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>

                <motion.button
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Profile Card */}
            <motion.div className="hero__profile" variants={itemVariants}>
              <div className="hero__profile-card">
                <div className="hero__avatar">
                  <span className="hero__avatar-text">
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="hero__profile-info">
                  <h3 className="hero__profile-name">{personalInfo.name}</h3>
                  <p className="hero__profile-title">{personalInfo.title}</p>

                  <div className="hero__profile-stats">
                    {heroStats.slice(0, 2).map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="hero__stat"
                        whileHover={{ scale: 1.05 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="hero__stat-number">{stat.value}</span>
                        <span className="hero__stat-label">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div className="hero__stats" variants={itemVariants}>
            <div className="hero__stats-grid">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="hero__stats-item"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <span className="hero__stats-number">{stat.value}</span>
                  <span className="hero__stats-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="hero__scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            onClick={() => scrollToSection("about")}
          >
            <span>↓</span>
          </motion.div>
          <p className="hero__scroll-text">Scroll to explore</p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="hero__background">
        <motion.div
          className="hero__bg-element hero__bg-element--1"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="hero__bg-element hero__bg-element--2"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
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

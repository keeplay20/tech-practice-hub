import React from "react";
import { motion } from "framer-motion";
import { aboutText, personalInfo, certifications } from "../../data/portfolio";
import "./About.css";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const highlights = [
    {
      year: "2021-Present",
      title: "Software Development Engineer 2 -> Dream11",
      description: "Building features for millions of fantasy sports users",
    },
    {
      year: "10+ Years",
      title: "Software Development Experience",
      description: "From technical consulting to senior development roles",
    },
    {
      year: "ISTQB Certified",
      title: "Test Automation Engineer",
      description: "Professional certification in automation testing",
    },
  ];

  return (
    <section id="about" className="about section">
      <div className="about__container container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Full Stack Developer with a passion for creating exceptional digital
            experiences
          </p>
        </motion.div>

        <div className="about__content">
          <motion.div
            className="about__main"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <div className="about__text">
              {aboutText.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="about__paragraph"
                  variants={itemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Profile Image/Card */}
            <motion.div className="about__profile" variants={itemVariants}>
              <div className="about__profile-card">
                <div className="about__avatar">
                  <span className="about__avatar-text">
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="about__profile-details">
                  <h3 className="about__profile-name">{personalInfo.name}</h3>
                  <p className="about__profile-role">{personalInfo.title}</p>
                  <div className="about__profile-location">
                    <span className="about__location-icon">📍</span>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="about__highlights-title">Career Highlights</h3>
            <div className="about__highlights-grid">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="about__highlight-card"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="about__highlight-year">{highlight.year}</div>
                  <h4 className="about__highlight-title">{highlight.title}</h4>
                  <p className="about__highlight-description">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <motion.div
              className="about__certifications"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="about__certifications-title">Certifications</h3>
              <div className="about__certifications-list">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="about__certification"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="about__cert-icon">🏆</div>
                    <div className="about__cert-details">
                      <h4 className="about__cert-name">{cert.name}</h4>
                      <p className="about__cert-issuer">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;

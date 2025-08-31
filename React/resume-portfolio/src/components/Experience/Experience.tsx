import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../../data/portfolio";
import "./Experience.css";

const Experience: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="experience" className="experience section">
      <div className="experience__container container">
        <motion.div
          className="experience__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey and key achievements
          </p>
        </motion.div>

        <motion.div
          className="experience__timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience__item"
              variants={itemVariants}
            >
              <div className="experience__dot"></div>
              <motion.div
                className="experience__content"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="experience__header-info">
                  <div className="experience__main-info">
                    <h3 className="experience__position">{exp.position}</h3>
                    <div className="experience__company-info">
                      <span className="experience__company">{exp.company}</span>
                      {exp.location && (
                        <span className="experience__location">
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="experience__duration">{exp.duration}</span>
                </div>

                <ul className="experience__description">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <div className="experience__technologies">
                  {exp.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="experience__tech-tag"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

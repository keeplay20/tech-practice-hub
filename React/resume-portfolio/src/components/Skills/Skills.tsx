import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../../data/portfolio";
import "./Skills.css";

const Skills: React.FC = () => {
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

  return (
    <section id="skills" className="skills section">
      <div className="skills__container container">
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I work with to build amazing products
          </p>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="skills__category"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="skills__category-header">
                <div className="skills__category-icon">{category.icon}</div>
                <h3 className="skills__category-title">{category.name}</h3>
              </div>

              {category.description && (
                <p className="skills__category-description">
                  {category.description}
                </p>
              )}

              <div className="skills__category-skills">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skills__skill-tag"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

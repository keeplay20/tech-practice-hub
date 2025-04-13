import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import styles from "../../styles/Skills.module.css";

const skills = [
  {
    name: "JavaScript",
    level: "Expert",
    description: "Experienced in ES6+, frameworks like React, Node.js, etc.",
  },
  {
    name: "React",
    level: "Advanced",
    description:
      "Strong knowledge of React.js and React Native, building scalable apps.",
  },
  {
    name: "Node.js",
    level: "Intermediate",
    description:
      "Backend services, API creation, and integration with databases.",
  },
];

export default function Skills() {
  return (
    <section className={styles.skills}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <div className={styles.skillList}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={styles.skill}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            data-tooltip-id={`skill-${index}`}
            data-tooltip-content={skill.description}
          >
            <h3>{skill.name}</h3>
            <p>{skill.level}</p>
            <Tooltip id={`skill-${index}`} place="top" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import styles from "../../styles/Projects.module.css";

const projects = [
  {
    name: "Project A",
    description:
      "A React-based web app that provides a task management solution.",
    techStack: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    name: "Project B",
    description: "A mobile app for e-commerce developed using React Native.",
    techStack: ["React Native", "Firebase", "Redux"],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section className={styles.projects}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.projectCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className={styles.techStack}>
              {project.techStack.map((tech, idx) => (
                <span key={idx} className={styles.tech} title={tech}>
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.links}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

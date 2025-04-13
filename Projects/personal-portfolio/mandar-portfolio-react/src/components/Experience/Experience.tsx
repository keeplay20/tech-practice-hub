import { motion } from "framer-motion";
import styles from "../../styles/Experience.module.css";

const experienceSteps = [
  {
    year: "2018",
    role: "Software Engineer",
    description:
      "Worked on various web development projects using React and Node.js.",
  },
  {
    year: "2020",
    role: "Senior Software Engineer",
    description:
      "Led development of a scalable system using microservices architecture.",
  },
];

export default function Experience() {
  return (
    <section className={styles.experience}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className={styles.timeline}>
        {experienceSteps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.content}>
              <h3>
                {step.year} — {step.role}
              </h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import styles from "../../styles/About.module.css";

// Replace with your own image URL or import the image
import profilePic from "./assets/MandarVyas.jpg";

export default function About() {
  return (
    <section className={styles.about}>
      <motion.div
        className={styles.textContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          I'm a passionate software engineer with experience in both manual and
          automated testing as well as full-stack development. My goal is to
          build innovative and user-friendly applications.
        </motion.p>
      </motion.div>

      <motion.img
        className={styles.avatar}
        src={profilePic}
        alt="Profile Picture"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />
    </section>
  );
}

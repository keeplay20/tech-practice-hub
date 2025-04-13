import { motion } from "framer-motion";
import styles from "../../styles/Contact.module.css";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section className={styles.contact}>
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      <motion.div
        className={styles.socialLinks}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.linkedin.com/in/mandar-vyas/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
        >
          <FaLinkedin size={32} />
        </a>
        <a
          href="https://github.com/keeplay20"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
        >
          <FaGithub size={32} />
        </a>
        <a href="mailto:mandar.vyas20@gmail.com" className={styles.iconLink}>
          <FaEnvelope size={32} />
        </a>
      </motion.div>
    </section>
  );
}

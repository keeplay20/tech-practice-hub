import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import styles from "../../styles/Hero.module.css";
import { profiles } from "../../data/profile";
import { motion } from "framer-motion";

type Role = "SDET" | "SDE";

interface HeroProps {
  role: Role;
  onSwitch: () => void;
}

export default function Hero({ role, onSwitch }: HeroProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = profiles[role].title;

  // Change title every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000); // 4s includes type + backspace
    return () => clearInterval(interval);
  }, [role]);

  // Reset index when role switches
  useEffect(() => {
    setTitleIndex(0);
  }, [role]);

  const currentProfile = profiles[role];

  return (
    <section
      className={`${styles.hero} ${
        role === "SDET" ? styles.sdetBackground : styles.sdeBackground
      }`}
    >
      <motion.div
        className={styles.fade}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="typeit">
          <TypeIt
            key={titleIndex}
            getBeforeInit={(instance) => {
              instance
                .type(titles[titleIndex])
                .pause(1000) // shorter pause after typing
                .delete()
                .pause(300); // shorter pause before next loop
              return instance;
            }}
            options={{
              speed: 60, // faster typing speed
              deleteSpeed: 40, // faster deleting speed
              lifeLike: true,
              cursor: true,
              breakLines: false,
              waitUntilVisible: true,
            }}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {currentProfile.summary}
        </motion.p>

        <motion.button
          onClick={onSwitch}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className={styles.button}
        >
          {currentProfile.buttonText}
        </motion.button>
      </motion.div>
    </section>
  );
}

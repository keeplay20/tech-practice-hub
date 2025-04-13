import "./App.css";
import styles from "./styles/App.module.css";
import Hero from "./components/Hero/Hero";
import { useState, useEffect } from "react";
import DeveloperStory from "./components/DeveloperStory/DeveloperStory";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [role, setRole] = useState<"SDET" | "SDE">("SDET");
  const [activeSection, setActiveSection] = useState<string>("");

  const handleSwitch = () => {
    setRole((prev) => (prev === "SDET" ? "SDE" : "SDET"));
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold to trigger when 50% of the section is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      {/* Pass active section to Navbar */}
      <div className={styles.app}>
        <Hero role={role} onSwitch={handleSwitch} />

        <section id="developer-story" className={styles.sectionContainer}>
          <DeveloperStory role={role} />
        </section>

        <section id="about" className={styles.sectionContainer}>
          <About />
        </section>

        <section id="projects" className={styles.sectionContainer}>
          <Projects />
        </section>

        <section id="skills" className={styles.sectionContainer}>
          <Skills />
        </section>

        <section id="contact" className={styles.sectionContainer}>
          <Contact />
        </section>
      </div>
    </>
  );
}

export default App;

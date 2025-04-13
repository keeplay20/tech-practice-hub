import React from "react";
import styles from "../../styles/Navbar.module.css";

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    const resumeLink = `${import.meta.env.BASE_URL}MandarVyas.pdf`;
    const link = document.createElement("a");
    link.href = resumeLink;
    link.download = "MandarVyasResume.pdf";
    link.click();
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <a
            href="#"
            onClick={handleScrollToTop}
            className={activeSection === "about" ? styles.activeLink : ""}
          >
            My Portfolio
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeSection === "about" ? styles.activeLink : ""}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className={activeSection === "projects" ? styles.activeLink : ""}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className={activeSection === "skills" ? styles.activeLink : ""}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeSection === "contact" ? styles.activeLink : ""}
          >
            Contact
          </a>
        </li>
      </ul>
      <button onClick={handleDownloadResume} className={styles.downloadButton}>
        Download My Resume
      </button>
    </nav>
  );
};

export default Navbar;

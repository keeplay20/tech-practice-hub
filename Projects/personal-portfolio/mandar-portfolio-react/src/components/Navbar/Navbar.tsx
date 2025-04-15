import React from "react";
import styles from "../../styles/Navbar.module.css";
import emailjs from "emailjs-com";

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    // Trigger file download
    const resumeLink = `${import.meta.env.BASE_URL}MandarVyas.pdf`;
    const link = document.createElement("a");
    link.href = resumeLink;
    link.download = "MandarVyasResume.pdf";
    link.click();

    // Send an email notification via EmailJS
    const templateParams = {
      to_name: "Mandar Vyas", // Your name or company name
      from_name: "Portfolio Visitor", // Name of the person visiting your portfolio
      message: "Someone downloaded the resume from the portfolio.",
    };

    // Send email using EmailJS with the public key (use it as the user ID)
    emailjs
      .send(
        "service_dsabn5s", // Your Service ID
        "template_aoslhpk", // Your Template ID
        templateParams,
        "UoOUeIiY8Sqkygo1J" // Replace with your Public Key from EmailJS
      )
      .then(
        (response) => {
          console.log("Email sent successfully", response);
        },
        (error) => {
          console.error("Failed to send email", error);
        }
      );
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

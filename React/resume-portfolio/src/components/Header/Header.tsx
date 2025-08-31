import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Header.css";

interface HeaderProps {
  onGameCenterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGameCenterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`header ${isScrolled ? "header--scrolled" : ""}`}
    >
      <div className="header__container">
        {/* Logo */}
        <motion.div
          className="header__logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection("hero")}
        >
          <span className="header__logo-text">MV</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="header__nav-item">
                <button
                  className="header__nav-link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="header__actions">
          <motion.button
            className="btn btn-ghost header__game-btn"
            onClick={onGameCenterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="header__game-icon">🎮</span>
            <span className="header__game-text">Games</span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className={`header__mobile-toggle ${
              isMobileMenuOpen ? "header__mobile-toggle--active" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`header__mobile-menu ${
          isMobileMenuOpen ? "header__mobile-menu--open" : ""
        }`}
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="header__mobile-nav">
          <ul className="header__mobile-nav-list">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.id}
                className="header__mobile-nav-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="header__mobile-nav-link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
            <motion.li
              className="header__mobile-nav-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: menuItems.length * 0.1 }}
            >
              <button
                className="header__mobile-nav-link header__mobile-game-btn"
                onClick={() => {
                  onGameCenterClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                🎮 Game Center
              </button>
            </motion.li>
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;

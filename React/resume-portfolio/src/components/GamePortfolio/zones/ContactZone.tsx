import React, { useState } from "react";
import { motion } from "framer-motion";
import { GameState } from "../GamePortfolio";
import "./ZoneStyles.css";

interface ContactZoneProps {
  gameState: GameState;
  onQuestComplete: (questId: string, reward: { xp: number; coins: number }) => void;
  onAddXP: (amount: number) => void;
  onAddCoins: (amount: number) => void;
  onBack: () => void;
}

const ContactZone: React.FC<ContactZoneProps> = ({ onAddXP, onAddCoins, onBack }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onAddXP(100);
    onAddCoins(50);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="zone-container contact-zone">
      <div className="zone-background contact-bg" />
      
      <motion.div
        className="zone-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.button
          className="back-button"
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← Back to World
        </motion.button>
        <h1>📧 Contact Portal</h1>
        <p>Send a message to start a quest together!</p>
      </motion.div>

      <div className="contact-content">
        <motion.div
          className="contact-form-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              className="success-message"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="success-icon">✅</div>
              <h2>Message Sent!</h2>
              <p>+100 XP, +50 Coins earned!</p>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                whileFocus={{ scale: 1.05 }}
                required
              />
              <motion.input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                whileFocus={{ scale: 1.05 }}
                required
              />
              <motion.textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                whileFocus={{ scale: 1.02 }}
                required
              />
              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Send Message
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.div
          className="contact-info"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Or find me here:</h3>
          <div className="social-links">
            <a href="https://github.com/mandarvyas" target="_blank" rel="noopener noreferrer">
              🔗 GitHub
            </a>
            <a href="https://linkedin.com/in/mandarvyas" target="_blank" rel="noopener noreferrer">
              🔗 LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactZone;

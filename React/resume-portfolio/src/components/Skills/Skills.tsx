import React from "react";
import { motion } from "framer-motion";
import { contact } from "../../data/portfolio";
import "./Skills.css";

const primarySkills = [
  { name: "React.js", icon: "⚛️", color: "#61dafb", bg: "rgba(97,218,251,0.1)", desc: "Web · Primary" },
  { name: "React Native", icon: "📱", color: "#6366f1", bg: "rgba(99,102,241,0.1)", desc: "Mobile · Primary" },
  { name: "TypeScript", icon: "🔷", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", desc: "Type Safety" },
  { name: "JavaScript", icon: "⚡", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", desc: "Core Language" },
];


const contactLinks = [
  { label: "Email", icon: "✉️", href: `mailto:${contact.email}`, display: contact.email },
  { label: "LinkedIn", icon: "💼", href: contact.linkedin, display: "mandar-vyas" },
  { label: "GitHub", icon: "🐙", href: contact.github, display: "keeplay20" },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills section">
      <div className="skills__container container">

        {/* Header */}
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="skills__eyebrow">Collected Along The Journey</span>
          <h2 className="section-title">
            The <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            React &amp; React Native first — backed by a decade of battle-tested craft.
          </p>
        </motion.div>

        {/* Primary Stack */}
        <motion.div
          className="skills__primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }, hidden: {} }}
        >
          {primarySkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="skills__primary-card"
              variants={itemVariants}
              whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
              style={{ borderColor: `${skill.color}40`, background: skill.bg }}
            >
              <span className="skills__primary-icon">{skill.icon}</span>
              <span className="skills__primary-name" style={{ color: skill.color }}>{skill.name}</span>
              <span className="skills__primary-desc">{skill.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Strip */}
        <motion.div
          id="contact"
          className="skills__contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="skills__contact-headline">
            Open to new opportunities — <span className="text-gradient">let's talk</span>
          </p>
          <div className="skills__contact-links">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="skills__contact-link"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="skills__contact-icon">{link.icon}</span>
                <span className="skills__contact-display">{link.display}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;

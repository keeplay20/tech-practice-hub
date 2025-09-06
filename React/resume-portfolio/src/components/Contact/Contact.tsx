import React from "react";
import { motion } from "framer-motion";
import { contact } from "../../data/portfolio";
import "./Contact.css";

const Contact: React.FC = () => {
  const contactItems = [
    {
      icon: "📧",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: contact.linkedin,
      href: contact.linkedin,
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: contact.github,
      href: contact.github,
    },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="contact__container container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Let's discuss your next project or opportunity
          </p>
        </motion.div>

        <div className="contact__content">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contactItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="contact__item"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="contact__item-icon">{item.icon}</div>
                <div className="contact__item-details">
                  <h3 className="contact__item-label">{item.label}</h3>
                  <p className="contact__item-value">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="contact__cta"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact__cta-title">Ready to work together?</h3>
            <p className="contact__cta-description">
              I'm always interested in discussing new opportunities and
              challenging projects. Let's build something amazing together!
            </p>
            <motion.a
              href={`mailto:${contact.email}`}
              className="btn btn-primary contact__cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

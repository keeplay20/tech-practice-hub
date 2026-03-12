import React, { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "../../data/portfolio";
import "./StoryJourney.css";

const CHAPTER_META: Record<
  string,
  {
    roman: string;
    title: string;
    color: string;
    icon: string;
    narrative: string;
    gained: string;
    transition?: string;
  }
> = {
  wipro: {
    roman: "I",
    title: "Where The Story Begins",
    color: "#3b82f6",
    icon: "🏢",
    narrative:
      "Fresh out of engineering, I stepped into the corporate world at Wipro as a Technical Consultant. This was my baptism by fire — configuring enterprise SharePoint systems, writing my first production JavaScript, and learning that software has real consequences for real people. Every workflow I automated saved hours for actual humans on the other side.",
    gained:
      "This chapter gave me discipline, enterprise thinking, and my first real taste of JavaScript — the language that would define my career.",
    transition:
      "Enterprise consulting was a solid start. But I craved ownership. The startup world was calling...",
  },
  freelancer: {
    roman: "II",
    title: "Taking The Leap",
    color: "#8b5cf6",
    icon: "🚀",
    narrative:
      "I took a calculated risk and went independent. Working with multiple startups, I wore every hat — developer, tester, architect, and sometimes tech support. This was the chapter that forced me to grow fast. React entered my life here, and I fell in love with building interfaces that people actually used.",
    gained:
      "Freelancing built my versatility. I shipped real products end-to-end, learned to communicate with clients, and discovered my passion for frontend development.",
    transition:
      "Going solo taught me breadth. But I craved depth — diving into a product and watching it scale. Time to join a team.",
  },
  vxl: {
    roman: "III",
    title: "The Craft Deepens",
    color: "#10b981",
    icon: "⚙️",
    narrative:
      "VXL Instruments brought me into the world of hardware-software integration. For three years, I built automation frameworks for Linux-based systems, tested Lenovo Terminal Manager, and learned the critical importance of quality engineering. Selenium and TestNG became my daily tools. I didn't just test software — I made sure it was bulletproof.",
    gained:
      "Three years of methodical, deep technical work built my engineering foundation. I learned that great software isn't just built — it's rigorously validated.",
    transition:
      "The craft was sharp. Now it was time to apply it at massive scale in the world of messaging and APIs.",
  },
  gupshup: {
    roman: "IV",
    title: "Scaling New Heights",
    color: "#f59e0b",
    icon: "📡",
    narrative:
      "Gupshup opened my eyes to distributed systems operating at genuine scale. Millions of messages flowing through pipelines, API performance that could make or break SLAs, and the art of finding bottlenecks before users did. I automated backend components, built test data generators, and collaborated with teams across time zones.",
    gained:
      "Scale changes everything. This chapter made me think differently about reliability, performance, and the ripple effects of every line of code.",
    transition:
      "I understood scale now. But what about impact? What about building for hundreds of millions of people — and actually seeing them use what you built?",
  },
  dream11: {
    roman: "V",
    title: "The Dream Chapter",
    color: "#6366f1",
    icon: "🏆",
    narrative:
      "Dream11 is where everything came together. As SDE-2, I ship features in a React Native app used by 150M+ users across India. My Balance, Transactions, Verification flows — features that millions of cricket fans interact with every match day. I architect E2E testing frameworks with Detox, build internal admin panels in React, and help drive engineering quality at scale.",
    gained:
      "React Native mastery, E2E testing architecture, and the privilege of building for India's largest fantasy sports platform. This is where craft meets real impact.",
  },
};

const chapters = experiences.map((exp, index) => ({
  ...exp,
  ...CHAPTER_META[exp.id],
  number: index + 1,
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const chapterVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const StoryJourney: React.FC = () => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  return (
    <section id="experience" className="story-journey section">
      <div className="story-journey__container container">
        {/* Section Header */}
        <motion.div
          className="story-journey__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="story-journey__eyebrow">A Developer's Chronicle</span>
          <h2 className="section-title">
            The Story <span className="text-gradient">So Far</span>
          </h2>
          <p className="section-subtitle">
            A decade of code, companies, and craft — each chapter building on
            the last
          </p>
        </motion.div>

        {/* Journey Spine */}
        <motion.div
          className="story-journey__spine"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {chapters.map((chapter, index) => {
            const isExpanded = expandedChapter === chapter.id;
            const isLast = index === chapters.length - 1;

            return (
              <motion.div
                key={chapter.id}
                className={`story-chapter ${isExpanded ? "story-chapter--expanded" : ""}`}
                variants={chapterVariants}
              >
                {/* Chapter Marker */}
                <div className="story-chapter__marker">
                  <motion.div
                    className="story-chapter__badge"
                    style={{ borderColor: chapter.color, color: chapter.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="story-chapter__roman">{chapter.roman}</span>
                  </motion.div>
                  {!isLast && (
                    <div
                      className="story-chapter__spine-line"
                      style={{
                        background: `linear-gradient(to bottom, ${chapter.color}80, ${chapters[index + 1].color}40)`,
                      }}
                    />
                  )}
                </div>

                {/* Chapter Content */}
                <div className="story-chapter__body">
                  {/* Chapter Header */}
                  <motion.div
                    className="story-chapter__header"
                    style={{ borderLeftColor: chapter.color }}
                    onClick={() =>
                      setExpandedChapter(isExpanded ? null : chapter.id)
                    }
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="story-chapter__meta">
                      <span
                        className="story-chapter__eyebrow"
                        style={{ color: chapter.color }}
                      >
                        Chapter {chapter.roman} · {chapter.duration}
                      </span>
                    </div>

                    <h3 className="story-chapter__title" style={{ color: chapter.color }}>
                      {chapter.company}
                    </h3>

                    <div className="story-chapter__company-row">
                      <span className="story-chapter__position">
                        {chapter.position}
                      </span>
                      {chapter.location && (
                        <>
                          <span className="story-chapter__divider">·</span>
                          <span className="story-chapter__location">
                            {chapter.location}
                          </span>
                        </>
                      )}
                      <span className="story-chapter__divider">·</span>
                      <span className="story-chapter__chapter-name">{chapter.title}</span>
                    </div>

                    <div
                      className="story-chapter__expand-btn"
                      style={{ color: chapter.color }}
                    >
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: "inline-block", lineHeight: 1 }}
                      >
                        ▾
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Expanded: Narrative + Achievements + Skills */}
                  <motion.div
                    className="story-chapter__details"
                    initial={false}
                    animate={
                      isExpanded
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="story-chapter__details-inner">
                      {/* Narrative */}
                      <div className="story-chapter__narrative">
                        <p>{chapter.narrative}</p>
                      </div>

                      {/* Achievements */}
                      <div className="story-chapter__achievements">
                        <h4 className="story-chapter__section-label">
                          <span style={{ color: chapter.color }}>▸</span> What I
                          Built & Delivered
                        </h4>
                        <ul className="story-chapter__list">
                          {chapter.description.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                isExpanded
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{ delay: i * 0.06 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="story-chapter__skills">
                        <h4 className="story-chapter__section-label">
                          <span style={{ color: chapter.color }}>▸</span> Stack
                          & Tools
                        </h4>
                        <div className="story-chapter__tech-tags">
                          {chapter.technologies.map((tech) => (
                            <motion.span
                              key={tech}
                              className="story-chapter__tag"
                              style={{
                                borderColor: `${chapter.color}50`,
                                color: chapter.color,
                                background: `${chapter.color}15`,
                              }}
                              whileHover={{
                                scale: 1.05,
                                background: chapter.color,
                                color: "#fff",
                              }}
                              transition={{ duration: 0.15 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Gained */}
                      <div className="story-chapter__gained">
                        <p>
                          <span
                            className="story-chapter__gained-label"
                            style={{ color: chapter.color }}
                          >
                            The Takeaway:{" "}
                          </span>
                          {chapter.gained}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default StoryJourney;

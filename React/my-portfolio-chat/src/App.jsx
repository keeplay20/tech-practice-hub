import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameCenter from "./pages/GameCenter";

const Header = () => (
  <header className="relative border-b border-red-500/20 bg-gray-900 overflow-hidden">
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold text-white"
        >
          🏎️ Mandar's Racing Portfolio
        </motion.div>
        <div className="text-red-500 text-sm">Senior Developer</div>
      </div>
    </div>
  </header>
);

const WelcomeSection = ({ onNavigate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8"
  >
    <motion.h1
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="text-6xl font-bold mb-6 text-center"
    >
      🏁 Welcome to the Track!
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-xl text-gray-300 mb-8 text-center max-w-2xl"
    >
      Ready to take a high-speed tour through my tech journey? I'm Mandar Vyas,
      approaching coding like a Formula 1 race with precision engineering and
      rapid problem solving.
    </motion.p>

    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("experience")}
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 
                   px-8 py-4 rounded-lg font-semibold transition-all duration-300"
      >
        💼 Professional Experience
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("games")}
        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 
                   px-8 py-4 rounded-lg font-semibold transition-all duration-300"
      >
        🎮 Interactive Game Center
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("skills")}
        className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 
                   px-8 py-4 rounded-lg font-semibold transition-all duration-300"
      >
        🛠️ Technical Skills
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate("contact")}
        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 
                   px-8 py-4 rounded-lg font-semibold transition-all duration-300"
      >
        📞 Get In Touch
      </motion.button>
    </motion.div>
  </motion.div>
);

const ExperienceSection = ({ onBack }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gray-900 text-white p-8"
  >
    <Header />
    <div className="max-w-4xl mx-auto mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
      >
        ← Back to Home
      </motion.button>

      <h2 className="text-4xl font-bold mb-8">💼 Professional Experience</h2>

      <div className="space-y-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-blue-400">
            Senior Full Stack Developer
          </h3>
          <p className="text-lg text-gray-300">Dream11 (2021-Present)</p>
          <ul className="mt-4 text-gray-300 space-y-2">
            <li>• Built and shipped features in Dream11 React Native app</li>
            <li>• Developed internal React-based admin panels</li>
            <li>• Architected Detox-based E2E testing framework</li>
            <li>• Created label-based automation framework</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-green-400">
            Software Engineer
          </h3>
          <p className="text-lg text-gray-300">Gupshup (2019-2021)</p>
          <ul className="mt-4 text-gray-300 space-y-2">
            <li>• Automated backend components for messaging flows</li>
            <li>• Developed shell scripts for test data generation</li>
            <li>• Conducted API performance testing with JMeter</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const SkillsSection = ({ onBack }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gray-900 text-white p-8"
  >
    <Header />
    <div className="max-w-4xl mx-auto mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
      >
        ← Back to Home
      </motion.button>

      <h2 className="text-4xl font-bold mb-8">🛠️ Technical Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React.js",
              "React Native",
              "JavaScript",
              "TypeScript",
              "HTML5",
              "CSS3",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">
            Tools & DevOps
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Git",
              "GitHub Actions",
              "Jenkins",
              "Jira",
              "Postman",
              "JMeter",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-green-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactSection = ({ onBack }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gray-900 text-white p-8"
  >
    <Header />
    <div className="max-w-4xl mx-auto mt-8 text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
      >
        ← Back to Home
      </motion.button>

      <h2 className="text-4xl font-bold mb-8">📞 Let's Connect</h2>

      <div className="space-y-6">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://www.linkedin.com/in/mandar-vyas/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          💼 LinkedIn - Connect Professionally
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="mailto:mandar.vyas20@gmail.com"
          className="block bg-red-600 hover:bg-red-500 px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          📧 Email - mandar.vyas20@gmail.com
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/keeplay20"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gray-600 hover:bg-gray-500 px-8 py-4 rounded-lg font-semibold transition-colors"
        >
          🔗 GitHub - View My Projects
        </motion.a>
      </div>
    </div>
  </motion.div>
);

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const goHome = () => {
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header />
            <WelcomeSection onNavigate={navigate} />
          </motion.div>
        )}

        {currentPage === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <ExperienceSection onBack={goHome} />
          </motion.div>
        )}

        {currentPage === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <SkillsSection onBack={goHome} />
          </motion.div>
        )}

        {currentPage === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <ContactSection onBack={goHome} />
          </motion.div>
        )}

        {currentPage === "games" && (
          <motion.div
            key="games"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <GameCenter onBack={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

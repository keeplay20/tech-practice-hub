import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./components/ChatBubble";
import RaceLoader from "./components/RaceLoader";
import SkillChips from "./components/SkillChips";
import RaceTrack from "./components/RaceTrack";
import GameCenter from "./pages/GameCenter";
import {
  categoryResponses,
  companyExperiences,
  skillExperiences,
  certificationExperiences,
} from "./data/responses";

const Header = React.memo(() => {
  return (
    <header className="relative border-b border-[#FF1801]/20 bg-[#15151E] overflow-hidden hidden lg:block">
      <div className="w-full px-4 py-4">
        {/* Racing stripe background */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF1801]/5 to-transparent transform -skew-x-45"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center justify-center gap-4"
        >
          {/* Animated racing car */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: [1, 1.1, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8 },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="text-3xl transform hover:scale-110 transition-transform cursor-pointer"
          >
            🏎️
          </motion.div>

          {/* Title with glowing effect */}
          <div className="relative">
            <motion.h1
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="text-xl font-mono font-bold relative z-10"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-black tracking-wider text-[#FF1801]"
                >
                  READY
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-xl font-black tracking-wider text-[#FF1801]"
                >
                  SET
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="text-2xl font-black tracking-wider"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 8px #FF1801",
                        "0 0 12px #FF1801",
                        "0 0 8px #FF1801",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                    className="bg-gradient-to-r from-[#FF1801] via-[#FF8F00] to-[#FF1801] text-transparent bg-clip-text"
                  >
                    CODE!
                  </motion.span>
                </motion.span>
              </div>
            </motion.h1>

            {/* Underlining racing stripe */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="h-0.5 bg-gradient-to-r from-[#FF1801] to-[#FF8F00] mt-0.5"
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

const App = () => {
  const [messages, setMessages] = useState([
    {
      from: "me",
      text: `Rev up your engines! I'm Mandar Vyas, your developer in the fast lane. Like a Formula 1 champion, I've mastered both speed and precision in the tech world.

🔥 RACE STATS:
• Position: P1 in Full Stack Development
• Specialization: React & React Native Racing Division
• Top Speed: Lightning-fast performance optimization
• Pit Crew Lead: Cloud architecture & DevOps
• Track Record: Mobile-first development champion

🛠️ ENGINE SPECS:
• Turbocharged with latest tech
• High-octane problem-solving
• Aerodynamic code architecture
• Maximum efficiency tuning

🏁 CHOOSE YOUR CIRCUIT:
• Experience: My career Grand Prix victories
• Skills: My championship-winning toolkit
• Certifications: My podium finishes
• Games: Fun in the pit lane!

Ready to take a lap through my portfolio? Select a track from Quick Actions to start the race! 🚥`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState("chat");
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleCompanyClick = useCallback(
    (companyId) => {
      setActiveCompany(companyId);
      let experience;
      let category;

      if (highlightedCategory === "experience") {
        experience = companyExperiences[companyId];
        category = "experience";
      } else if (highlightedCategory === "skills") {
        experience = skillExperiences[companyId];
        category = "skills";
      } else if (highlightedCategory === "certifications") {
        experience = certificationExperiences[companyId];
        category = "certifications";
      }

      if (experience) {
        setMessages([
          {
            ...categoryResponses[highlightedCategory],
            category: category,
            selectedExperience: experience,
          },
        ]);
      }
    },
    [highlightedCategory]
  );

  const handleChipClick = useCallback(
    (categoryId) => {
      if (!categoryId) return;

      if (categoryId === "bored") {
        setCurrentPage("games");
        return;
      }

      if (categoryId === "reset") {
        setMessages([
          {
            from: "me",
            text: `Rev up your engines! I'm Mandar Vyas, your developer in the fast lane. Like a Formula 1 champion, I've mastered both speed and precision in the tech world.

🔥 RACE STATS:
• Position: P1 in Full Stack Development
• Specialization: React & React Native Racing Division
• Top Speed: Lightning-fast performance optimization
• Pit Crew Lead: Cloud architecture & DevOps
• Track Record: Mobile-first development champion

🛠️ ENGINE SPECS:
• Turbocharged with latest tech
• High-octane problem-solving
• Aerodynamic code architecture
• Maximum efficiency tuning

🏁 CHOOSE YOUR CIRCUIT:
• Experience: My career Grand Prix victories
• Skills: My championship-winning toolkit
• Certifications: My podium finishes
• Games: Fun in the pit lane!

Ready to take a lap through my portfolio? Select a track from Quick Actions to start the race! 🚥`,
          },
        ]);
        setHighlightedCategory(null);
        setActiveCompany(null);
        return;
      }

      // Toggle highlight if clicking the same category
      if (categoryId === highlightedCategory) {
        setHighlightedCategory(null);
        setMessages([]);
        setActiveCompany(null);
        return;
      }

      console.log("Handling category click:", categoryId);
      setHighlightedCategory(categoryId);

      // Get the first company/skill/certification ID based on the category
      let firstItemId = null;
      if (categoryId === "experience") {
        firstItemId = Object.keys(companyExperiences)[0];
      } else if (categoryId === "skills") {
        firstItemId = Object.keys(skillExperiences)[0];
      } else if (categoryId === "certifications") {
        firstItemId = Object.keys(certificationExperiences)[0];
      }

      setActiveCompany(firstItemId);
      setMessages([]); // Clear previous messages

      const response = categoryResponses[categoryId];
      if (!response) return;

      // Show loading immediately
      setTyping(true);

      // Wait for countdown (3,2,1 = ~1800ms) + extra delay for smooth transition
      setTimeout(() => {
        // Keep loading for a bit after GO
        setTimeout(() => {
          setTyping(false);
          setMessages([
            {
              ...response,
              category: categoryId,
              selectedExperience: firstItemId
                ? categoryId === "experience"
                  ? companyExperiences[firstItemId]
                  : categoryId === "skills"
                  ? skillExperiences[firstItemId]
                  : categoryId === "certifications"
                  ? certificationExperiences[firstItemId]
                  : null
                : null,
            },
          ]);
        }, 500);
      }, 1800);
    },
    [highlightedCategory, activeCompany]
  );

  return (
    <AnimatePresence mode="wait">
      {currentPage === "chat" ? (
        <motion.div
          key="chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#15151E] flex flex-col"
        >
          <Header />

          <div className="flex-1 flex bg-gradient-to-b from-[#15151E] to-[#1C1C25] overflow-hidden">
            <div className="w-full h-full p-4 flex flex-col gap-4">
              {/* Main Content Area */}
              <div className="flex flex-col lg:flex-row gap-4 flex-1">
                {/* Chat Area */}
                <div className="flex-1 min-w-0">
                  <div className="h-full rounded-2xl bg-[#1C1C25] shadow-xl border border-[#FF1801]/10">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                        {messages.map((msg, i) => (
                          <ChatBubble
                            key={i}
                            from={msg.from || "me"}
                            text={msg.text || ""}
                            category={msg.category}
                            companies={msg.companies}
                            onCompanyClick={handleCompanyClick}
                            activeCompany={activeCompany}
                            selectedExperience={msg.selectedExperience}
                            skills={msg.skills}
                            isLoading={typing}
                          />
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Race Section - Only visible on desktop */}
                <div className="hidden lg:block lg:w-72 shrink-0">
                  <div className="rounded-2xl bg-[#1C1C25]/80 backdrop-blur-lg p-4 shadow-xl border border-[#FF1801]/10">
                    <div className="mb-4">
                      <h3 className="text-text-primary font-mono text-sm uppercase tracking-wider bg-gradient-to-r from-[#FF1801] to-[#FF8F00] inline-block text-transparent bg-clip-text">
                        Quick Race
                      </h3>
                      <p className="text-xs text-gray-500 italic mt-1">
                        Select a track to begin your journey
                      </p>
                    </div>
                    <div
                      className={`overflow-x-auto scrollbar-none ${
                        highlightedCategory ? "lg:block hidden" : ""
                      }`}
                    >
                      <SkillChips
                        onChipClick={handleChipClick}
                        activeCategory={highlightedCategory}
                      />
                    </div>
                    {/* Mobile Selected Category View */}
                    {highlightedCategory && (
                      <div className="lg:hidden flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#FF1801]">
                              {highlightedCategory.charAt(0).toUpperCase() +
                                highlightedCategory.slice(1)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleChipClick(highlightedCategory)}
                            className="text-xs text-gray-400 hover:text-white"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Quick Race Section - Only visible on mobile */}
              <div className="block lg:hidden w-full">
                <div className="rounded-2xl bg-[#1C1C25]/80 backdrop-blur-lg p-4 shadow-xl border border-[#FF1801]/10 overflow-hidden">
                  <div className="mb-4 flex items-center gap-3">
                    <h3 className="text-text-primary font-mono text-sm uppercase tracking-wider bg-gradient-to-r from-[#FF1801] to-[#FF8F00] inline-block text-transparent bg-clip-text">
                      Quick Race
                    </h3>
                    <p className="text-xs text-gray-500 italic">
                      Select a track to begin your journey
                    </p>
                  </div>
                  <div className="overflow-x-auto overflow-y-hidden scrollbar-none flex justify-center">
                    <SkillChips
                      onChipClick={handleChipClick}
                      activeCategory={highlightedCategory}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Race Track */}
              <div className="h-[160px] lg:h-[240px] shrink-0">
                <RaceTrack
                  activeCar={highlightedCategory}
                  onCarSelect={handleChipClick}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="games"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#15151E]"
        >
          <GameCenter onBack={() => setCurrentPage("chat")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;

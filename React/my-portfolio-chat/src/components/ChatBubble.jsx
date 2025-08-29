import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cars } from "../data/cars";
import CompanyList from "./CompanyList";
import RaceLoader from "./RaceLoader";

const ChatBubble = ({
  from,
  text,
  category,
  companies,
  onCompanyClick,
  activeCompany,
  selectedExperience,
  skills,
  isLoading,
}) => {
  const car = category ? cars[category] : null;

  // Handle skills section differently
  if (category === "skills" && skills) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-lg bg-[#1C1C25]/80 overflow-y-auto scrollbar-none"
      >
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-300
                bg-gradient-to-r from-[#1C1C25] to-[#15151E] hover:from-[#1C1C25]/90 hover:to-[#15151E]/90`}
            >
              <span className="bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Handle experience and certifications sections
  if (companies) {
    return (
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 h-full">
        <div className="lg:w-72 w-full overflow-hidden">
          <CompanyList
            companies={companies}
            onCompanyClick={onCompanyClick}
            activeCompany={activeCompany}
            category={category}
          />
        </div>
        {isLoading ? (
          <div className="flex-1 hidden lg:flex items-center justify-center">
            <RaceLoader category={category} />
          </div>
        ) : (
          activeCompany &&
          selectedExperience && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 0.6,
                  bounce: 0.3,
                },
              }}
              className="flex-1 pt-2 px-4 pb-4 lg:p-6 rounded-lg overflow-y-auto scrollbar-none mt-1 lg:mt-0 bg-[#1C1C25] backdrop-blur-sm border border-[#FF1801]/10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.4,
                  },
                }}
                className="space-y-0"
              >
                {/* Title Section */}
                <div className="space-y-1">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-medium text-white/90"
                  >
                    {selectedExperience.company || selectedExperience.name}
                  </motion.h3>
                  {selectedExperience.role && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm text-[#FF1801]"
                    >
                      {selectedExperience.role}
                    </motion.p>
                  )}
                  {selectedExperience.duration && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs text-gray-500 tracking-wider"
                    >
                      {selectedExperience.duration}
                    </motion.p>
                  )}
                </div>

                {/* Content Section */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedExperience.id || selectedExperience.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-gray-400 leading-relaxed"
                  >
                    {selectedExperience.text
                      .split("\n")
                      .filter((line) => line.startsWith("•"))
                      .map((line, index) =>
                        line.startsWith("•") ? (
                          <motion.div
                            key={`${
                              selectedExperience.id || selectedExperience.name
                            }-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + index * 0.15,
                              duration: 0.3,
                              type: "spring",
                              stiffness: 100,
                            }}
                            className="flex gap-3 items-baseline mt-1.5"
                          >
                            <span className="text-[#FF1801]/40">•</span>
                            <span>{line.replace("•", "").trim()}</span>
                          </motion.div>
                        ) : null
                      )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        )}
      </div>
    );
  }

  // Split text into sections for welcome message
  if (text.includes("Rev up your engines!")) {
    const sections = text.split("\n\n");
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 rounded-lg whitespace-pre-line
                   ${
                     car
                       ? car.bgLight
                       : "bg-gradient-to-br from-[#1C1C25] to-[#15151E]"
                   }`}
      >
        {/* Main Layout - Responsive */}
        <div className="flex flex-col gap-6">
          {/* Name Section - Full Width */}
          <div className="relative py-8 overflow-hidden w-full">
            {/* Racing stripe background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-[#FF1801]/10 via-transparent to-[#FF1801]/10"
            />

            {/* Champion name container */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="relative flex flex-col items-center"
            >
              {/* Championship number */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-1">
                  <motion.div
                    initial={{ scale: 0, x: -50 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="w-10 h-10 bg-[#FF1801] rounded-full flex items-center justify-center shrink-0"
                  >
                    <span className="text-lg font-bold">#1</span>
                  </motion.div>

                  {/* Name with championship styling */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
                    className="text-sm uppercase tracking-widest text-[#FF1801] font-semibold"
                  >
                    Frontend Champion
                  </motion.div>
                </div>

                <motion.div className="relative text-center">
                  <motion.h2
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
                    className="text-4xl lg:text-5xl font-bold tracking-tight relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                  >
                    MANDAR VYAS
                  </motion.h2>

                  {/* Glowing effect */}
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-[#FF1801] to-transparent opacity-20 blur-xl z-0"
                  />
                </motion.div>

                {/* Racing stripes */}
                <div className="w-full max-w-md">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-[#FF1801] to-transparent mt-2"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-[#FF1801] to-transparent mt-1 mx-auto"
                  />
                </div>
              </div>
            </motion.div>

            {/* Subtitle with delayed entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="mt-4 text-gray-300 text-lg text-center"
            >
              your developer in the fast lane
            </motion.div>
          </div>

          {/* Stats and Circuit Grid - Two Columns */}
          <div className="grid grid-cols-2 gap-4">
            {/* Engine Specs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#1C1C25]/50 p-2 lg:p-4 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#FF1801]"></div>
                <h2 className="font-bold bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text">
                  {sections[2].split("\n")[0]}
                </h2>
              </div>
              <ul className="space-y-2">
                {sections[2]
                  .split("\n")
                  .slice(1)
                  .map((stat, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center gap-2 group"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="h-1.5 w-1.5 rounded-full bg-[#FF1801] group-hover:w-3 transition-all duration-300"
                      />
                      {stat.replace("•", "")}
                    </motion.li>
                  ))}
              </ul>
            </motion.div>

            {/* Choose Circuit */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-[#1C1C25]/50 p-2 lg:p-4 rounded-lg backdrop-blur-sm"
            >
              <div className="relative">
                <div className="flex items-center gap-2 mb-2 lg:mb-6">
                  <div className="w-1 h-4 bg-[#FF1801]"></div>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text">
                    {sections[3].split("\n")[0]}
                  </h2>
                </div>
                <ul className="space-y-2 lg:space-y-4">
                  {sections[3]
                    .split("\n")
                    .slice(1)
                    .map((track, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        className="group flex items-center gap-3 cursor-pointer"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.6 + index * 0.1 }}
                          className="h-2 w-2 rounded-full bg-[#FF1801] group-hover:w-4 transition-all duration-300"
                        />
                        <span className="group-hover:text-[#FF1801] transition-colors duration-300">
                          {track.replace("•", "")}
                        </span>
                      </motion.li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default message rendering
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg whitespace-pre-line
                 ${car ? car.bgLight : "bg-chat-box"}`}
    >
      {text}
    </motion.div>
  );
};

export default ChatBubble;

import React from "react";
import { motion, useAnimation } from "framer-motion";
import SpeedLines from "./SpeedLines";
import { cars } from "../data/cars";

const SkillChips = ({ onChipClick, activeCategory }) => {
  const controls = useAnimation();
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    if (!activeCategory && !isHovering) {
      // Start the sequential highlight animation
      const interval = setInterval(() => {
        setHighlightedIndex((prev) => (prev + 1) % 4);
      }, 2000); // Slower cycle for more prominent effect

      return () => clearInterval(interval);
    } else {
      setHighlightedIndex(-1); // No highlight when category selected or hovering
    }
  }, [activeCategory, isHovering]);

  const handleChipClick = (id) => {
    // Trigger rev animation
    controls.start({
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.2 },
    });
    onChipClick(id);
  };
  const chips = [
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Technical Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "bored", label: "Bored?" },
  ];

  return (
    <div className="flex flex-col gap-1.5 scrollbar-none">
      <div className="grid grid-cols-2 sm:flex gap-2 w-full md:w-fit md:flex-row lg:flex-col lg:gap-2 overflow-x-auto scrollbar-none pb-2">
        {chips.map((chip, index) => {
          const isActive = activeCategory === chip.id;
          const isHighlighted = index === highlightedIndex && !activeCategory;
          const car = cars[chip.id];

          return (
            <motion.button
              key={chip.id}
              onClick={() => handleChipClick(chip.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              animate={controls}
              className={`w-[180px] md:w-[140px] lg:w-full text-left py-2 px-3 lg:p-5 rounded-lg lg:rounded-xl transition-all duration-500
                      relative overflow-hidden group backdrop-blur-sm
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#FF1801]/10 to-[#FF8F00]/10"
                          : ""
                      }
                      ${isHighlighted ? "bg-[#1C1C25]/50" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="hidden lg:block w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#1C1C25] to-[#15151E] p-2">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-sm lg:text-base font-bold tracking-wide transition-colors duration-300 bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text break-words whitespace-normal text-center w-full">
                    {chip.label}
                  </span>
                </div>
              </div>

              {/* Speed Lines Animation */}
              {isActive && <SpeedLines />}

              {/* Hover/Active glow effect */}
              <div
                className={`absolute inset-0 rounded-lg transition-all duration-300
                           bg-gradient-to-r from-[#FF1801] to-[#FF8F00] opacity-0 shadow-none
                           ${
                             isActive
                               ? "opacity-5 shadow-[0_0_15px] shadow-current"
                               : "group-hover:opacity-3"
                           }`}
              />

              {/* Highlight pulse effect - base layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF1801]/80 to-[#FF8F00]/80 rounded-lg"
                initial={{ opacity: 0 }}
                animate={
                  isHighlighted
                    ? {
                        opacity: [0.05, 0.2, 0.05],
                        scale: [1, 1.03, 1],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                        },
                      }
                    : {}
                }
              />

              {/* Glow effect layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF1801]/40 to-[#FF8F00]/40 rounded-lg blur-md"
                initial={{ opacity: 0 }}
                animate={
                  isHighlighted
                    ? {
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1.02, 1.04, 1.02],
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                        },
                      }
                    : {}
                }
              />

              {/* Engine rev effect on hover */}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: [0, 0.1, 0],
                  transition: {
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SkillChips;

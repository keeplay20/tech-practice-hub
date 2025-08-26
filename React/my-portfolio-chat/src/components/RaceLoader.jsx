import React from "react";
import { motion } from "framer-motion";
import { cars } from "../data/cars";

const RaceLoader = ({ category }) => {
  const car = category ? cars[category] : null;
  const defaultColor = "red-500";
  const color = car?.borderColor.replace("border-", "") || defaultColor;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-24 h-12">
        {/* Track */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-700">
          {/* Track markers */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-${color}`}
              animate={{
                x: ["0%", "100%"],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.33,
              }}
            />
          ))}
        </div>

        {/* F1 Car */}
        <motion.div
          className="absolute bottom-2 left-4"
          animate={{
            x: [-2, 2],
            y: [-1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {/* Main Body */}
          <div className={`relative w-14 h-3`}>
            {/* Nose Cone */}
            <div
              className={`absolute left-0 w-4 h-2 bg-${color} rounded-l-full skew-x-12`}
            />

            {/* Front Wing */}
            <div
              className={`absolute -left-2 bottom-0 w-4 h-[3px] bg-${color} rounded-l-md`}
            />

            {/* Side Pods */}
            <div className={`absolute left-4 w-6 h-3 bg-${color} rounded-sm`} />

            {/* Engine Cover */}
            <div
              className={`absolute right-1 w-4 h-2 bg-${color} rounded-r-sm`}
            />

            {/* Rear Wing */}
            <div className={`absolute -right-2 -top-1 w-2 h-3`}>
              <div className={`absolute top-0 w-full h-[2px] bg-${color}`} />
              <div className={`absolute bottom-0 w-full h-[2px] bg-${color}`} />
              <div className={`absolute right-0 h-full w-[2px] bg-${color}`} />
            </div>

            {/* Cockpit/Halo */}
            <div className={`absolute left-5 -top-1 w-3 h-1.5`}>
              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-${color}/80 rounded-t-md`}
              />
              <div
                className={`absolute left-1/2 -top-0.5 w-[2px] h-1 bg-${color}/80 -translate-x-1/2`}
              />
            </div>

            {/* Wheels */}
            <div className="absolute left-2 -bottom-1 w-2.5 h-2.5 bg-black rounded-full border-2 border-gray-400" />
            <div className="absolute right-2 -bottom-1 w-2.5 h-2.5 bg-black rounded-full border-2 border-gray-400" />

            {/* Racing Number */}
            <div
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-bold text-white`}
            >
              {category === "experience"
                ? "16"
                : category === "skills"
                ? "44"
                : category === "certifications"
                ? "4"
                : "1"}
            </div>
          </div>
        </motion.div>

        {/* Speed lines */}
        <motion.div className="absolute inset-y-0 left-0 w-full flex items-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[1px] bg-${color}/40`}
              style={{
                left: `${i * 30}%`,
                width: "20%",
              }}
              animate={{
                scaleX: [1, 0],
                x: ["0%", "100%"],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RaceLoader;

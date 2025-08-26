import React from "react";
import { motion } from "framer-motion";

const SpeedLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] bg-[#FF1801] opacity-60"
          style={{
            top: `${20 + i * 15}%`,
            left: "100%",
            width: "50%",
          }}
          animate={{
            x: [0, -200],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SpeedLines;

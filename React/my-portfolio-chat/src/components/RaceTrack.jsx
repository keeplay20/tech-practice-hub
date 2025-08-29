import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cars } from "../data/cars";
import Countdown from "./Countdown";
import RaceLoader from "./RaceLoader";

const RaceTrack = ({ activeCar, onCarSelect }) => {
  const [isRacing, setIsRacing] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = React.useRef(null);

  // Track environment effects
  const TireMarks = ({ isActive }) => (
    <motion.div
      className="absolute left-[150px] right-[40px] h-[2px] bg-gradient-to-r from-white/10 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? [0.5, 0] : 0 }}
      transition={{
        duration: 0.3,
        repeat: isActive ? Infinity : 0,
        repeatDelay: 0.1,
      }}
    />
  );

  const SpeedLines = ({ isActive }) => (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-white/20"
          style={{
            left: `${i * 10}%`,
            top: `${Math.random() * 100}%`,
            width: "100px",
          }}
          animate={{
            x: [0, -200],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );

  const handleCountdownComplete = () => {
    setIsCountingDown(false);
    setIsRacing(true);
  };

  useEffect(() => {
    // Reset all cars to starting position when active car changes
    setIsRacing(false);

    if (activeCar) {
      if (trackRef.current) {
        const width = trackRef.current.offsetWidth;
        const startLine = 40; // left-[40px] from the CSS
        const finishLine = 40; // right padding + finish line width
        const carWidth = 112; // w-28 = 7rem = 112px
        setTrackWidth(width - startLine - finishLine - carWidth);
      }
      // Start countdown
      setIsCountingDown(true);
    }

    // Cleanup timeout on unmount or when active car changes
    return () => {
      setIsRacing(false);
      setIsCountingDown(false);
    };
  }, [activeCar]);

  // Filter out the 'bored' car as it's for games
  const racingCars = Object.entries(cars).filter(([id]) => id !== "bored");

  return (
    <div
      className={`rounded-2xl bg-[#1C1C25]/80 backdrop-blur-lg p-4 shadow-xl
                     border border-[#ff1801]/10 transition-all duration-500
                     ${!activeCar ? "blur-sm" : ""}`}
    >
      <div
        className={`flex items-center justify-between mb-4 transition-all duration-500 ${
          !activeCar ? "blur-sm" : ""
        }`}
      >
        <h3
          className="text-text-primary font-mono text-sm uppercase tracking-wider
                        bg-gradient-to-r from-[#ff1801] to-[#ff8f00] inline-block text-transparent bg-clip-text"
        >
          Race Track
        </h3>
        <button
          onClick={() => onCarSelect("reset")}
          className="font-mono text-sm uppercase tracking-wider bg-gradient-to-r from-[#ff1801] to-[#ff8f00] inline-block text-transparent bg-clip-text hover:scale-105 transition-transform"
        >
          Back to Pit
        </button>
      </div>

      <div
        className={`relative h-[240px] overflow-hidden transition-all duration-500 ${
          !activeCar ? "blur-sm" : ""
        }`}
      >
        {/* Countdown */}
        <Countdown
          isActive={isCountingDown}
          onComplete={handleCountdownComplete}
        />

        {/* Racing Track Background */}
        <div className="absolute inset-0">
          {/* Track Border Top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF1801]/20 via-[#FF1801]/40 to-[#FF1801]/20"
            animate={{
              opacity: [0.5, 1, 0.5],
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Track Border Bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF1801]/20 via-[#FF1801]/40 to-[#FF1801]/20"
            animate={{
              opacity: [0.5, 1, 0.5],
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Starting Line at Left */}
          <div className="absolute left-4 top-8 bottom-8 w-6 flex flex-col overflow-hidden rounded-lg">
            <motion.div
              className="flex flex-col h-full"
              animate={{
                y: [0, -100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(20)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="w-full h-4 bg-white" />
                  <div className="w-full h-4 bg-black" />
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Finish Line at Right */}
          <div className="absolute right-4 top-8 bottom-8 w-6 flex flex-col overflow-hidden rounded-lg">
            <motion.div
              className="flex flex-col h-full"
              animate={{
                y: [0, -100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(20)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="w-full h-4 bg-white" />
                  <div className="w-full h-4 bg-black" />
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Side Borders */}
          <div className="absolute left-12 top-4 bottom-4 w-1 bg-gradient-to-b from-[#FF1801]/0 via-[#FF1801]/20 to-[#FF1801]/0" />
          <div className="absolute right-12 top-4 bottom-4 w-1 bg-gradient-to-b from-[#FF1801]/0 via-[#FF1801]/20 to-[#FF1801]/0" />
        </div>

        {/* Track Effects */}
        <SpeedLines isActive={isRacing} />

        {/* Cars */}
        <div className="relative h-full" ref={trackRef}>
          <div className="absolute left-[40px] top-0 bottom-0 flex flex-col justify-evenly py-4">
            {racingCars.map(([id, car], index) => (
              <motion.div
                key={id}
                className={`relative ${activeCar === id ? "z-20" : "z-10"}`}
                animate={{
                  x: isRacing
                    ? activeCar === id
                      ? trackWidth
                      : trackWidth * 0.75
                    : 0,
                  y: isRacing && activeCar === id ? [-2, 2, -2] : 0, // Suspension effect
                  transition: {
                    x: {
                      type: "spring",
                      duration: 0.8,
                      bounce: activeCar === id ? 0.2 : 0.4,
                      delay: isRacing ? (activeCar === id ? 0 : 0.2) : 0,
                    },
                    y: {
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  },
                }}
              >
                {/* Tire Marks */}
                {activeCar === id && <TireMarks isActive={isRacing} />}

                {/* Car Container */}
                <div className="relative py-1">
                  <div className="relative flex justify-center">
                    {/* Car Image with Glow */}
                    <motion.div
                      className={`w-28 h-14 relative ${
                        isRacing && activeCar === id
                          ? "drop-shadow-[0_0_8px_rgba(255,24,1,0.5)]"
                          : ""
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        className={`w-full h-full object-contain transition-transform duration-300
                          ${
                            isRacing && activeCar === id
                              ? "scale-110"
                              : "scale-100"
                          }`}
                      />

                      {/* Exhaust Effect */}
                      {isRacing && (
                        <motion.div
                          className="absolute -left-4 top-1/2 -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{
                            opacity: [0.5, 0],
                            scale: [0.5, 1.5],
                            x: [-5, -20],
                          }}
                          transition={{
                            duration: 0.4,
                            repeat: Infinity,
                            repeatDelay: 0.1,
                          }}
                        >
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF1801]/20 to-transparent" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;

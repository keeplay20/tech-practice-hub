import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = ({ isActive, onComplete }) => {
  const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    if (isActive && count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      const timer = setTimeout(() => {
        onComplete();
        setCount(3);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [count, isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-6xl font-bold text-white"
          >
            {count}
          </motion.div>
        ) : (
          <motion.div
            key="go"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-6xl font-bold bg-gradient-to-r from-[#FF1801] to-[#FF8F00] text-transparent bg-clip-text"
          >
            GO!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;

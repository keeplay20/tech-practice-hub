import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const programmingTexts = [
  `function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}`,
  `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};`,
  `class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert(value) {
    if (value < this.value) {
      if (!this.left) this.left = new BinaryTree(value);
      else this.left.insert(value);
    }
  }
}`,
  `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}`,
  `const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
};`,
  `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserRole = 'admin' | 'user' | 'moderator';

const createUser = (userData: Omit<User, 'id'>): User => {
  return { id: Math.random(), ...userData };
};`,
];

const getRandomText = () =>
  programmingTexts[Math.floor(Math.random() * programmingTexts.length)];

const TypingChar = ({ char, status, isActive }) => (
  <span
    className={`${
      status === "correct"
        ? "text-green-400 bg-green-900 bg-opacity-30"
        : status === "incorrect"
        ? "text-red-400 bg-red-900 bg-opacity-30"
        : isActive
        ? "bg-accent bg-opacity-50 text-text-primary"
        : "text-text-secondary"
    } ${isActive ? "animate-pulse" : ""}`}
  >
    {char === " " ? "·" : char}
  </span>
);

const StatsCard = ({ label, value, unit, color = "text-accent" }) => (
  <div className="bg-dark-lighter rounded-lg p-4 text-center">
    <p className="text-text-secondary text-sm mb-1">{label}</p>
    <p className={`text-2xl font-mono ${color}`}>
      {value}
      {unit && <span className="text-sm text-text-secondary ml-1">{unit}</span>}
    </p>
  </div>
);

const ProgressBar = ({ progress, duration }) => (
  <div className="w-full bg-dark-lighter rounded-full h-2 mb-4">
    <motion.div
      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

export default function TypingTest() {
  const [text, setText] = useState(() => getRandomText());
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const calculateStats = useCallback(() => {
    if (!startTime || !endTime) return;

    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = text.length / 5; // Standard: 5 characters = 1 word
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes);
    const calculatedAccuracy = Math.round(
      ((text.length - errors) / text.length) * 100
    );

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  }, [startTime, endTime, text.length, errors]);

  const resetTest = () => {
    setText(getRandomText());
    setUserInput("");
    setCurrentIndex(0);
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
    clearInterval(timerRef.current);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());

      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    setUserInput(value);

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Update current index
    setCurrentIndex(value.length);

    // Check if finished
    if (value.length === text.length) {
      setIsFinished(true);
      setEndTime(Date.now());
      clearInterval(timerRef.current);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent backspace beyond current position
    if (e.key === "Backspace" && userInput.length === 0) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => clearInterval(timerRef.current);
  }, []);

  const progress = (userInput.length / text.length) * 100;
  const currentWpm =
    isStarted && timeElapsed > 0
      ? Math.round(userInput.length / 5 / (timeElapsed / 60))
      : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          label="WPM"
          value={isFinished ? wpm : currentWpm}
          color="text-green-400"
        />
        <StatsCard
          label="Accuracy"
          value={
            isFinished
              ? accuracy
              : Math.round(
                  ((userInput.length - errors) /
                    Math.max(1, userInput.length)) *
                    100
                )
          }
          unit="%"
          color="text-blue-400"
        />
        <StatsCard label="Errors" value={errors} color="text-red-400" />
        <StatsCard
          label="Time"
          value={timeElapsed}
          unit="s"
          color="text-purple-400"
        />
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Text Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-lighter rounded-lg p-6 mb-6 font-mono text-sm md:text-base 
                   leading-relaxed border-2 border-accent min-h-[200px] relative
                   overflow-hidden"
      >
        <div className="text-left whitespace-pre-wrap break-words overflow-wrap-anywhere">
          {text.split("").map((char, index) => {
            let status = "";
            if (index < userInput.length) {
              status = userInput[index] === char ? "correct" : "incorrect";
            }

            return (
              <TypingChar
                key={index}
                char={char}
                status={status}
                isActive={index === currentIndex}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Input Area */}
      <div className="mb-6">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isFinished}
          placeholder={isStarted ? "" : "Start typing to begin the test..."}
          className="w-full p-4 bg-dark border-2 border-accent rounded-lg
                     text-text-primary font-mono text-sm md:text-base resize-none 
                     focus:outline-none focus:border-accent-light transition-colors 
                     duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     whitespace-pre-wrap"
          rows={6}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTest}
          className="px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-700
                     hover:from-purple-800 hover:to-purple-600 rounded-full
                     text-text-primary font-mono shadow-lg"
        >
          🔄 New Test
        </motion.button>

        {!isStarted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => inputRef.current?.focus()}
            className="px-6 py-3 bg-gradient-to-r from-green-900 to-green-700
                       hover:from-green-800 hover:to-green-600 rounded-full
                       text-text-primary font-mono shadow-lg"
          >
            ⌨️ Start Typing
          </motion.button>
        )}
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={resetTest}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-dark-lighter rounded-xl p-8 max-w-md w-full mx-4
                         border-2 border-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-mono text-text-primary mb-6">
                  🎉 Test Complete!
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-text-secondary text-sm">Speed</p>
                    <p className="text-3xl font-mono text-green-400">{wpm}</p>
                    <p className="text-text-secondary text-xs">WPM</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-secondary text-sm">Accuracy</p>
                    <p className="text-3xl font-mono text-blue-400">
                      {accuracy}%
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetTest}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-700
                             hover:from-purple-800 hover:to-purple-600 rounded-full
                             text-text-primary font-mono shadow-lg"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="text-center text-text-secondary text-sm mt-6">
        <p>
          💡 Tips: Focus on accuracy over speed. Use programming-related text
          for practice!
        </p>
      </div>
    </div>
  );
}

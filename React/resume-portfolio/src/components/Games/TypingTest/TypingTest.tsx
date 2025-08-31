import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TypingTest.css";

const programmingTexts = [
  "function calculateSum(a, b) { return a + b; }",
  'const users = await fetch("/api/users").then(res => res.json());',
  "for (let i = 0; i < array.length; i++) { console.log(array[i]); }",
  "const debounce = (func, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), delay); }; };",
  "class Component extends React.Component { constructor(props) { super(props); this.state = {}; } }",
];

const getRandomText = () =>
  programmingTexts[Math.floor(Math.random() * programmingTexts.length)];

interface StatsCardProps {
  label: string;
  value: number | string;
  unit?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  unit,
  color = "var(--accent-color)",
}) => (
  <div className="typing-test__stat-card">
    <p className="typing-test__stat-label">{label}</p>
    <p className="typing-test__stat-value" style={{ color }}>
      {value}
      {unit && <span className="typing-test__stat-unit">{unit}</span>}
    </p>
  </div>
);

const TypingTest: React.FC = () => {
  const [text, setText] = useState(() => getRandomText());
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const calculateStats = useCallback(() => {
    if (!startTime || !endTime) return;

    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = text.length / 5;
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
    clearInterval(timerRef.current!);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    setUserInput(value);

    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCurrentIndex(value.length);

    if (value.length === text.length) {
      setIsFinished(true);
      setEndTime(Date.now());
      clearInterval(timerRef.current!);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && userInput.length === 0) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => clearInterval(timerRef.current!);
  }, []);

  const progress = (userInput.length / text.length) * 100;
  const currentWpm =
    isStarted && timeElapsed > 0
      ? Math.round(userInput.length / 5 / (timeElapsed / 60))
      : 0;

  return (
    <div className="typing-test">
      {/* Stats Dashboard */}
      <div className="typing-test__stats">
        <StatsCard
          label="WPM"
          value={isFinished ? wpm : currentWpm}
          color="#10b981"
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
          color="#3b82f6"
        />
        <StatsCard label="Errors" value={errors} color="#ef4444" />
        <StatsCard label="Time" value={timeElapsed} unit="s" color="#8b5cf6" />
      </div>

      {/* Progress Bar */}
      <div className="typing-test__progress-bar">
        <motion.div
          className="typing-test__progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Text Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="typing-test__text-display"
      >
        <div className="typing-test__text">
          {text.split("").map((char, index) => {
            let status = "";
            if (index < userInput.length) {
              status = userInput[index] === char ? "correct" : "incorrect";
            }

            return (
              <span
                key={index}
                className={`typing-test__char ${
                  status === "correct"
                    ? "typing-test__char--correct"
                    : status === "incorrect"
                    ? "typing-test__char--incorrect"
                    : index === currentIndex
                    ? "typing-test__char--active"
                    : "typing-test__char--pending"
                }`}
              >
                {char === " " ? "·" : char}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Input Area */}
      <div className="typing-test__input-area">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isFinished}
          placeholder={isStarted ? "" : "Start typing to begin the test..."}
          className="typing-test__input"
          rows={4}
        />
      </div>

      {/* Action Buttons */}
      <div className="typing-test__actions">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTest}
          className="btn btn-primary"
        >
          🔄 New Test
        </motion.button>

        {!isStarted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => inputRef.current?.focus()}
            className="btn btn-secondary"
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
            className="typing-test__modal"
            onClick={resetTest}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="typing-test__modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="typing-test__modal-header">
                <h3>🎉 Test Complete!</h3>
              </div>

              <div className="typing-test__modal-stats">
                <div className="typing-test__modal-stat">
                  <p className="typing-test__modal-stat-label">Speed</p>
                  <p className="typing-test__modal-stat-value">{wpm}</p>
                  <p className="typing-test__modal-stat-unit">WPM</p>
                </div>
                <div className="typing-test__modal-stat">
                  <p className="typing-test__modal-stat-label">Accuracy</p>
                  <p className="typing-test__modal-stat-value">{accuracy}%</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTest}
                className="btn btn-primary typing-test__modal-btn"
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="typing-test__instructions">
        <p>
          💡 Tip: Focus on accuracy over speed. Practice with programming
          syntax!
        </p>
      </div>
    </div>
  );
};

export default TypingTest;

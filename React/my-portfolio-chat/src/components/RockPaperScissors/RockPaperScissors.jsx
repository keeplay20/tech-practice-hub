import { useState } from "react";
import { motion } from "framer-motion";

const choices = ["✊", "✋", "✌️"];
const choiceNames = ["Rock", "Paper", "Scissors"];

const getWinner = (player, computer) => {
  if (player === computer) return "draw";
  if (
    (player === 0 && computer === 2) || // Rock beats Scissors
    (player === 1 && computer === 0) || // Paper beats Rock
    (player === 2 && computer === 1) // Scissors beats Paper
  ) {
    return "player";
  }
  return "computer";
};

const Choice = ({ symbol, name, onClick, disabled, selected, isWinner }) => (
  <motion.button
    whileHover={!disabled && { scale: 1.1 }}
    whileTap={!disabled && { scale: 0.9 }}
    className={`p-4 rounded-xl text-4xl md:text-5xl aspect-square
                transition-all duration-300 ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                } ${
      selected
        ? "bg-dark-lighter border-2 border-accent-light"
        : "bg-dark border-2 border-accent hover:border-accent-light"
    } ${isWinner ? "shadow-[0_0_20px_rgba(147,51,234,0.5)]" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    <div className="flex flex-col items-center">
      <span className="mb-2">{symbol}</span>
      <span className="text-sm text-text-secondary">{name}</span>
    </div>
  </motion.button>
);

const ResultDisplay = ({ result, playerChoice, computerChoice }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <div className="flex justify-center items-center gap-8 mb-4">
      <div className="text-center">
        <p className="text-text-secondary mb-2">You</p>
        <span className="text-5xl">{choices[playerChoice]}</span>
      </div>
      <div className="text-text-primary text-xl">VS</div>
      <div className="text-center">
        <p className="text-text-secondary mb-2">AI</p>
        <span className="text-5xl">{choices[computerChoice]}</span>
      </div>
    </div>
    <p
      className={`text-2xl font-mono ${
        result === "player"
          ? "text-green-400"
          : result === "computer"
          ? "text-red-400"
          : "text-text-primary"
      }`}
    >
      {result === "player"
        ? "You Win! 🎉"
        : result === "computer"
        ? "AI Wins! 🤖"
        : "It's a Draw! 🤝"}
    </p>
  </motion.div>
);

const ScoreBoard = ({ scores }) => (
  <div className="flex justify-center gap-12 mb-6">
    <div className="text-center">
      <p className="text-text-secondary">You</p>
      <p className="text-3xl font-mono text-green-400">{scores.player}</p>
    </div>
    <div className="text-center">
      <p className="text-text-secondary">AI</p>
      <p className="text-3xl font-mono text-red-400">{scores.computer}</p>
    </div>
  </div>
);

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChoice = (choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);

    // Animate computer thinking
    setTimeout(() => {
      const aiChoice = Math.floor(Math.random() * 3);
      setComputerChoice(aiChoice);

      const gameResult = getWinner(choice, aiChoice);
      setResult(gameResult);

      if (gameResult !== "draw") {
        setScores((prev) => ({
          ...prev,
          [gameResult]: prev[gameResult] + 1,
        }));
      }

      setIsPlaying(false);
    }, 1000);
  };

  const playAgain = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center">
      <ScoreBoard scores={scores} />

      {result && (
        <ResultDisplay
          result={result}
          playerChoice={playerChoice}
          computerChoice={computerChoice}
        />
      )}

      <div className="grid grid-cols-3 gap-4">
        {choices.map((symbol, index) => (
          <Choice
            key={index}
            symbol={symbol}
            name={choiceNames[index]}
            onClick={() => handleChoice(index)}
            disabled={isPlaying}
            selected={playerChoice === index}
            isWinner={
              result &&
              ((result === "player" && playerChoice === index) ||
                (result === "computer" && computerChoice === index))
            }
          />
        ))}
      </div>

      {result && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playAgain}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-700
                     hover:from-purple-800 hover:to-purple-600 rounded-full
                     text-text-primary font-mono shadow-lg"
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./RockPaperScissors.css";

type Choice = 0 | 1 | 2; // Rock, Paper, Scissors
type GameResult = "player" | "computer" | "draw";

const choices = ["✊", "✋", "✌️"];
const choiceNames = ["Rock", "Paper", "Scissors"];

const getWinner = (player: Choice, computer: Choice): GameResult => {
  if (player === computer) return "draw";
  if (
    (player === 0 && computer === 2) ||
    (player === 1 && computer === 0) ||
    (player === 2 && computer === 1)
  ) {
    return "player";
  }
  return "computer";
};

interface ChoiceButtonProps {
  symbol: string;
  name: string;
  onClick: () => void;
  disabled: boolean;
  selected: boolean;
  isWinner: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  symbol,
  name,
  onClick,
  disabled,
  selected,
  isWinner,
}) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.1 } : undefined}
    whileTap={!disabled ? { scale: 0.9 } : undefined}
    className={`rps__choice ${selected ? "rps__choice--selected" : ""} ${
      isWinner ? "rps__choice--winner" : ""
    } ${disabled ? "rps__choice--disabled" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    <div className="rps__choice-content">
      <span className="rps__choice-symbol">{symbol}</span>
      <span className="rps__choice-name">{name}</span>
    </div>
  </motion.button>
);

interface ResultDisplayProps {
  result: GameResult;
  playerChoice: Choice;
  computerChoice: Choice;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  playerChoice,
  computerChoice,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rps__result"
  >
    <div className="rps__battle">
      <div className="rps__battle-choice">
        <p className="rps__battle-label">You</p>
        <span className="rps__battle-symbol">{choices[playerChoice]}</span>
      </div>
      <div className="rps__battle-vs">VS</div>
      <div className="rps__battle-choice">
        <p className="rps__battle-label">AI</p>
        <span className="rps__battle-symbol">{choices[computerChoice]}</span>
      </div>
    </div>
    <p className={`rps__result-text rps__result-text--${result}`}>
      {result === "player"
        ? "You Win! 🎉"
        : result === "computer"
        ? "AI Wins! 🤖"
        : "It's a Draw! 🤝"}
    </p>
  </motion.div>
);

interface ScoreBoardProps {
  scores: { player: number; computer: number };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => (
  <div className="rps__scoreboard">
    <div className="rps__score">
      <p className="rps__score-label">You</p>
      <p className="rps__score-value rps__score-value--player">
        {scores.player}
      </p>
    </div>
    <div className="rps__score">
      <p className="rps__score-label">AI</p>
      <p className="rps__score-value rps__score-value--computer">
        {scores.computer}
      </p>
    </div>
  </div>
);

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [scores, setScores] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChoice = (choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);

    setTimeout(() => {
      const aiChoice = Math.floor(Math.random() * 3) as Choice;
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
    <div className="rps">
      <ScoreBoard scores={scores} />

      {result && playerChoice !== null && computerChoice !== null && (
        <ResultDisplay
          result={result}
          playerChoice={playerChoice}
          computerChoice={computerChoice}
        />
      )}

      <div className="rps__choices">
        {choices.map((symbol, index) => (
          <ChoiceButton
            key={index}
            symbol={symbol}
            name={choiceNames[index]}
            onClick={() => handleChoice(index as Choice)}
            disabled={isPlaying}
            selected={playerChoice === index}
            isWinner={
              result !== null &&
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
          className="rps__play-again btn btn-primary"
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
};

export default RockPaperScissors;

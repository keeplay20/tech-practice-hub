import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const Cell = ({ value, onClick, isWinning, disabled }) => (
  <motion.button
    whileHover={!disabled && { scale: 1.05 }}
    whileTap={!disabled && { scale: 0.95 }}
    className={`w-20 h-20 md:w-24 md:h-24 bg-dark rounded-lg m-1
                border-2 border-accent flex items-center justify-center
                transition-colors duration-300
                ${isWinning ? "border-purple-500" : "hover:border-accent-light"}
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    onClick={onClick}
    disabled={disabled}
  >
    <AnimatePresence mode="wait">
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`text-4xl md:text-5xl font-bold
                     ${value === "X" ? "text-indigo-400" : "text-purple-400"}
                     ${
                       isWinning
                         ? "drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                         : ""
                     }`}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

const ScoreBoard = ({ scores }) => (
  <div className="flex justify-center gap-8 mb-6 text-text-primary">
    <div className="text-center">
      <span className="text-indigo-400 text-xl font-bold">X</span>
      <p className="text-2xl font-mono">{scores.X}</p>
    </div>
    <div className="text-center">
      <span className="text-purple-400 text-xl font-bold">O</span>
      <p className="text-2xl font-mono">{scores.O}</p>
    </div>
  </div>
);

const GameStatus = ({ winner, isDraw, currentPlayer }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-4"
  >
    {winner ? (
      <p className="text-xl font-mono text-text-primary">
        Winner:{" "}
        <span
          className={winner === "X" ? "text-indigo-400" : "text-purple-400"}
        >
          {winner}
        </span>
        !
      </p>
    ) : isDraw ? (
      <p className="text-xl font-mono text-text-primary">It's a draw!</p>
    ) : (
      <p className="text-lg font-mono text-text-secondary">
        Current player:{" "}
        <span
          className={
            currentPlayer === "X" ? "text-indigo-400" : "text-purple-400"
          }
        >
          {currentPlayer}
        </span>
      </p>
    )}
  </motion.div>
);

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameNumber, setGameNumber] = useState(1);

  const checkWinner = (boardState) => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return { winner: boardState[a], winningCells: combo };
      }
    }
    return null;
  };

  const handleClick = useCallback(
    (index) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningCells(result.winningCells);
        setScores((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1,
        }));
      } else if (!newBoard.includes(null)) {
        setWinner("draw");
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, winner]
  );

  useEffect(() => {
    if (currentPlayer === "O" && !winner) {
      const timeout = setTimeout(() => {
        const emptyCells = board.reduce(
          (acc, cell, idx) => (!cell ? [...acc, idx] : acc),
          []
        );
        if (emptyCells.length > 0) {
          const randomIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
          handleClick(randomIndex);
        }
      }, 750);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, winner, handleClick]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(gameNumber % 2 === 0 ? "O" : "X");
    setWinner(null);
    setWinningCells([]);
    setGameNumber((prev) => prev + 1);
  };

  const isDraw = !winner && !board.includes(null);

  return (
    <div className="flex flex-col items-center">
      <ScoreBoard scores={scores} />
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />

      <div className="grid grid-cols-3 gap-1 p-2 bg-dark-lighter rounded-lg shadow-lg">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => currentPlayer === "X" && handleClick(index)}
            isWinning={winningCells.includes(index)}
            disabled={cell !== null || winner || currentPlayer === "O"}
          />
        ))}
      </div>

      {(winner || isDraw) && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-700
                     hover:from-purple-800 hover:to-purple-600 rounded-full
                     text-text-primary font-mono shadow-lg"
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
}

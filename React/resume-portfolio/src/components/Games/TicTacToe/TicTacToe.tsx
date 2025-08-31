import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TicTacToe.css";

type Player = "X" | "O" | null;
type Board = Player[];

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

interface CellProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, disabled }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05 } : undefined}
    whileTap={!disabled ? { scale: 0.95 } : undefined}
    className={`tic-tac-toe__cell ${
      isWinning ? "tic-tac-toe__cell--winning" : ""
    } ${disabled ? "tic-tac-toe__cell--disabled" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    <AnimatePresence mode="wait">
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`tic-tac-toe__symbol tic-tac-toe__symbol--${value.toLowerCase()}`}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

interface ScoreBoardProps {
  scores: { X: number; O: number };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => (
  <div className="tic-tac-toe__scoreboard">
    <div className="tic-tac-toe__score">
      <span className="tic-tac-toe__score-label tic-tac-toe__score-label--x">
        X (You)
      </span>
      <p className="tic-tac-toe__score-value">{scores.X}</p>
    </div>
    <div className="tic-tac-toe__score">
      <span className="tic-tac-toe__score-label tic-tac-toe__score-label--o">
        O (AI)
      </span>
      <p className="tic-tac-toe__score-value">{scores.O}</p>
    </div>
  </div>
);

interface GameStatusProps {
  winner: Player | "draw";
  isDraw: boolean;
  currentPlayer: Player;
}

const GameStatus: React.FC<GameStatusProps> = ({
  winner,
  isDraw,
  currentPlayer,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="tic-tac-toe__status"
  >
    {winner && winner !== "draw" ? (
      <p className="tic-tac-toe__status-text">
        Winner:{" "}
        <span
          className={`tic-tac-toe__winner tic-tac-toe__winner--${winner.toLowerCase()}`}
        >
          {winner}
        </span>
        !
      </p>
    ) : isDraw ? (
      <p className="tic-tac-toe__status-text">It's a draw!</p>
    ) : (
      <p className="tic-tac-toe__status-text">
        Current player:{" "}
        <span
          className={`tic-tac-toe__current tic-tac-toe__current--${currentPlayer?.toLowerCase()}`}
        >
          {currentPlayer}
        </span>
      </p>
    )}
  </motion.div>
);

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameNumber, setGameNumber] = useState(1);

  const checkWinner = (
    boardState: Board
  ): { winner: Player; winningCells: number[] } | null => {
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
    (index: number) => {
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
          [result.winner!]: prev[result.winner! as "X" | "O"] + 1,
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
          (acc: number[], cell, idx) => (!cell ? [...acc, idx] : acc),
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
  }, [currentPlayer, winner, handleClick, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(gameNumber % 2 === 0 ? "O" : "X");
    setWinner(null);
    setWinningCells([]);
    setGameNumber((prev) => prev + 1);
  };

  const isDraw = winner === "draw";

  return (
    <div className="tic-tac-toe">
      <ScoreBoard scores={scores} />
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />

      <div className="tic-tac-toe__board">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => currentPlayer === "X" && handleClick(index)}
            isWinning={winningCells.includes(index)}
            disabled={cell !== null || !!winner || currentPlayer === "O"}
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
          className="tic-tac-toe__reset-btn btn btn-primary"
        >
          Play Again
        </motion.button>
      )}
    </div>
  );
};

export default TicTacToe;

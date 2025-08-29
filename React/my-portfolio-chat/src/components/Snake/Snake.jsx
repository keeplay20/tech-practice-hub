import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 15, y: 15 };

const generateFood = (snake) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
  );
  return newFood;
};

const SnakeCell = ({ x, y, type, index }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={`absolute rounded-md ${
      type === "head"
        ? "bg-gradient-to-br from-green-400 to-green-600"
        : type === "body"
        ? "bg-gradient-to-br from-green-500 to-green-700"
        : "bg-gradient-to-br from-red-400 to-red-600"
    }`}
    style={{
      left: `${x * CELL_SIZE}px`,
      top: `${y * CELL_SIZE}px`,
      width: `${CELL_SIZE - 1}px`,
      height: `${CELL_SIZE - 1}px`,
      zIndex: type === "food" ? 10 : 5 - index,
    }}
  >
    {type === "food" && (
      <div className="w-full h-full flex items-center justify-center text-xs">
        🍎
      </div>
    )}
  </motion.div>
);

const GameBoard = ({ snake, food, gameOver }) => (
  <div
    className="relative bg-dark-lighter border-2 border-accent rounded-lg"
    style={{
      width: `${GRID_SIZE * CELL_SIZE}px`,
      height: `${GRID_SIZE * CELL_SIZE}px`,
    }}
  >
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-10">
      {Array.from({ length: GRID_SIZE }).map((_, row) =>
        Array.from({ length: GRID_SIZE }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute border border-accent"
            style={{
              left: `${col * CELL_SIZE}px`,
              top: `${row * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        ))
      )}
    </div>

    {/* Snake */}
    {snake.map((segment, index) => (
      <SnakeCell
        key={index}
        x={segment.x}
        y={segment.y}
        type={index === 0 ? "head" : "body"}
        index={index}
      />
    ))}

    {/* Food */}
    <SnakeCell x={food.x} y={food.y} type="food" />

    {/* Game Over Overlay */}
    <AnimatePresence>
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <p className="text-2xl font-mono text-red-400 mb-2">
              💀 Game Over!
            </p>
            <p className="text-text-secondary">Press Space to restart</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ScoreBoard = ({ score, highScore }) => (
  <div className="flex justify-center gap-8 mb-6">
    <div className="text-center">
      <p className="text-text-secondary text-sm">Score</p>
      <p className="text-2xl font-mono text-green-400">{score}</p>
    </div>
    <div className="text-center">
      <p className="text-text-secondary text-sm">High Score</p>
      <p className="text-2xl font-mono text-purple-400">{highScore}</p>
    </div>
  </div>
);

const Controls = () => (
  <div className="text-center text-text-secondary text-sm mt-4">
    <p className="mb-2">🎮 Controls:</p>
    <div className="flex justify-center gap-4 flex-wrap">
      <span>↑↓←→ Arrow Keys</span>
      <span>WASD</span>
      <span>Space: Restart</span>
    </div>
  </div>
);

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snakeHighScore") || "0");
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef();
  const lastDirectionRef = useRef(INITIAL_DIRECTION);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
    lastDirectionRef.current = INITIAL_DIRECTION;
  }, []);

  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      // Move head
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snakeHighScore", newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, highScore]);

  const handleKeyPress = useCallback(
    (e) => {
      const key = e.key.toLowerCase();
      const currentDirection = lastDirectionRef.current;

      if (key === " " || key === "spacebar") {
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else if (!isPlaying) {
          setIsPlaying(true);
        }
        return;
      }

      if (!isPlaying || gameOver) return;

      let newDirection = { ...currentDirection };

      switch (key) {
        case "arrowup":
        case "w":
          if (currentDirection.y === 0) newDirection = { x: 0, y: -1 };
          break;
        case "arrowdown":
        case "s":
          if (currentDirection.y === 0) newDirection = { x: 0, y: 1 };
          break;
        case "arrowleft":
        case "a":
          if (currentDirection.x === 0) newDirection = { x: -1, y: 0 };
          break;
        case "arrowright":
        case "d":
          if (currentDirection.x === 0) newDirection = { x: 1, y: 0 };
          break;
        default:
          return;
      }

      setDirection(newDirection);
      lastDirectionRef.current = newDirection;
    },
    [isPlaying, gameOver, resetGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      clearInterval(gameLoopRef.current);
    }

    return () => clearInterval(gameLoopRef.current);
  }, [isPlaying, gameOver, moveSnake]);

  useEffect(() => {
    lastDirectionRef.current = direction;
  }, [direction]);

  return (
    <div className="flex flex-col items-center">
      <ScoreBoard score={score} highScore={highScore} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4"
      >
        <GameBoard snake={snake} food={food} gameOver={gameOver} />
      </motion.div>

      {!isPlaying && !gameOver && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-900 to-green-700
                     hover:from-green-800 hover:to-green-600 rounded-full
                     text-text-primary font-mono shadow-lg"
        >
          🐍 Start Game
        </motion.button>
      )}

      {gameOver && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-700
                     hover:from-purple-800 hover:to-purple-600 rounded-full
                     text-text-primary font-mono shadow-lg"
        >
          🔄 Play Again
        </motion.button>
      )}

      <Controls />
    </div>
  );
}

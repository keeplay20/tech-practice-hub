import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Snake.css";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 15, y: 15 };

interface Position {
  x: number;
  y: number;
}

const generateFood = (snake: Position[]): Position => {
  const getRandomPosition = (): Position => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  const isPositionOccupied = (position: Position): boolean => {
    return snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  };

  let newFood = getRandomPosition();
  while (isPositionOccupied(newFood)) {
    newFood = getRandomPosition();
  }
  return newFood;
};

const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snakeHighScore") || "0");
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const lastDirectionRef = useRef(INITIAL_DIRECTION);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
    lastDirectionRef.current = INITIAL_DIRECTION;
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Direction change handler
  const changeDirection = useCallback(
    (newDirection: Position) => {
      if (!isPlaying || gameOver) return;

      const currentDirection = lastDirectionRef.current;

      // Prevent reverse direction
      if (
        (newDirection.x === -currentDirection.x &&
          newDirection.y === currentDirection.y) ||
        (newDirection.y === -currentDirection.y &&
          newDirection.x === currentDirection.x)
      ) {
        return;
      }

      setDirection(newDirection);
      lastDirectionRef.current = newDirection;
    },
    [isPlaying, gameOver]
  );

  // Touch handlers for swipe gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 30;

      if (
        Math.abs(deltaX) < minSwipeDistance &&
        Math.abs(deltaY) < minSwipeDistance
      ) {
        // Tap - start/restart game
        if (gameOver) {
          resetGame();
        } else if (!isPlaying) {
          setIsPlaying(true);
        }
        return;
      }

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          changeDirection({ x: 1, y: 0 }); // Right
        } else {
          changeDirection({ x: -1, y: 0 }); // Left
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          changeDirection({ x: 0, y: 1 }); // Down
        } else {
          changeDirection({ x: 0, y: -1 }); // Up
        }
      }

      touchStartRef.current = null;
    },
    [changeDirection, gameOver, isPlaying, resetGame]
  );

  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

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

      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

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
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

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

      switch (key) {
        case "arrowup":
        case "w":
          changeDirection({ x: 0, y: -1 });
          break;
        case "arrowdown":
        case "s":
          changeDirection({ x: 0, y: 1 });
          break;
        case "arrowleft":
        case "a":
          changeDirection({ x: -1, y: 0 });
          break;
        case "arrowright":
        case "d":
          changeDirection({ x: 1, y: 0 });
          break;
        default:
          return;
      }
    },
    [isPlaying, gameOver, resetGame, changeDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      clearInterval(gameLoopRef.current!);
    }

    return () => clearInterval(gameLoopRef.current!);
  }, [isPlaying, gameOver, moveSnake]);

  useEffect(() => {
    lastDirectionRef.current = direction;
  }, [direction]);

  return (
    <div className="snake-game">
      {/* Score Board */}
      <div className="snake-game__scoreboard">
        <div className="snake-game__score">
          <p className="snake-game__score-label">Score</p>
          <p className="snake-game__score-value">{score}</p>
        </div>
        <div className="snake-game__score">
          <p className="snake-game__score-label">High Score</p>
          <p className="snake-game__score-value snake-game__score-value--high">
            {highScore}
          </p>
        </div>
      </div>

      {/* Game Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="snake-game__board"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          width: `${GRID_SIZE * CELL_SIZE}px`,
          height: `${GRID_SIZE * CELL_SIZE}px`,
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`snake-game__cell ${
              index === 0 ? "snake-game__cell--head" : "snake-game__cell--body"
            }`}
            style={{
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              width: `${CELL_SIZE - 1}px`,
              height: `${CELL_SIZE - 1}px`,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="snake-game__cell snake-game__cell--food"
          style={{
            left: `${food.x * CELL_SIZE}px`,
            top: `${food.y * CELL_SIZE}px`,
            width: `${CELL_SIZE - 1}px`,
            height: `${CELL_SIZE - 1}px`,
          }}
        >
          🍎
        </motion.div>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="snake-game__overlay"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="snake-game__game-over"
              >
                <p className="snake-game__game-over-title">💀 Game Over!</p>
                <p className="snake-game__game-over-text">
                  Press Space to restart
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      {!isPlaying && !gameOver && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(true)}
          className="btn btn-primary snake-game__start-btn"
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
          className="btn btn-primary snake-game__restart-btn"
        >
          🔄 Play Again
        </motion.button>
      )}

      {/* Mobile Controls */}
      {isMobile && isPlaying && !gameOver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="snake-game__mobile-controls"
        >
          <div className="snake-game__d-pad">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => changeDirection({ x: 0, y: -1 })}
              className="snake-game__control-btn snake-game__control-btn--up"
              aria-label="Move Up"
            >
              ⬆️
            </motion.button>
            <div className="snake-game__horizontal-controls">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => changeDirection({ x: -1, y: 0 })}
                className="snake-game__control-btn snake-game__control-btn--left"
                aria-label="Move Left"
              >
                ⬅️
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => changeDirection({ x: 1, y: 0 })}
                className="snake-game__control-btn snake-game__control-btn--right"
                aria-label="Move Right"
              >
                ➡️
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => changeDirection({ x: 0, y: 1 })}
              className="snake-game__control-btn snake-game__control-btn--down"
              aria-label="Move Down"
            >
              ⬇️
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="snake-game__controls">
        <p>
          {isMobile
            ? "📱 Controls: Swipe to move • Tap to start/restart"
            : "🎮 Controls: Arrow Keys or WASD • Space: Start/Restart"}
        </p>
      </div>
    </div>
  );
};

export default Snake;

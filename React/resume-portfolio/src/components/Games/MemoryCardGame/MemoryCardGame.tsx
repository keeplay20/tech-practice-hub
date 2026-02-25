import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MemoryCardGame.css";

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface BestScore {
  moves: number;
  time: number;
}

const CARD_SYMBOLS = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🍑"];

const createInitialCards = (): Card[] => {
  const cards: Card[] = [];
  CARD_SYMBOLS.forEach((symbol, index) => {
    cards.push(
      {
        id: index * 2,
        symbol,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: index * 2 + 1,
        symbol,
        isFlipped: false,
        isMatched: false,
      }
    );
  });
  return cards;
};

const shuffleCards = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryCardGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(() =>
    shuffleCards(createInitialCards())
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore | null>(() => {
    const saved = localStorage.getItem("memoryGameBestScore");
    return saved ? JSON.parse(saved) : null;
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !hasWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, hasWon]);

  // Check for win condition
  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && moves > 0 && !hasWon) {
      setHasWon(true);
      setIsGameActive(false);

      // Update best score if this is better
      if (
        !bestScore ||
        moves < bestScore.moves ||
        (moves === bestScore.moves && timer < bestScore.time)
      ) {
        const newBestScore = { moves, time: timer };
        setBestScore(newBestScore);
        localStorage.setItem("memoryGameBestScore", JSON.stringify(newBestScore));
      }
    }
  }, [cards, moves, timer, bestScore, hasWon]);

  // Card comparison logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsComparing(true);
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsComparing(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsComparing(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (!isGameActive) {
        setIsGameActive(true);
      }

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isMatched || card.isFlipped || isComparing || flippedCards.length >= 2) {
        return;
      }

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );
      setFlippedCards((prev) => [...prev, cardId]);
    },
    [cards, isComparing, flippedCards, isGameActive]
  );

  const handleNewGame = useCallback(() => {
    setCards(shuffleCards(createInitialCards()));
    setFlippedCards([]);
    setIsComparing(false);
    setMoves(0);
    setHasWon(false);
    setTimer(0);
    setIsGameActive(false);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="memory-card-game">
      <motion.div
        className="memory-card-game__container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="memory-card-game__header">
          <h2 className="memory-card-game__title">🎮 Memory Card Game</h2>
          <p className="memory-card-game__subtitle">
            Match all pairs in the fewest moves!
          </p>
        </div>

        <div className="memory-card-game__stats">
          <div className="memory-card-game__stat">
            <span className="memory-card-game__stat-label">Time</span>
            <span className="memory-card-game__stat-value">
              {formatTime(timer)}
            </span>
          </div>
          <div className="memory-card-game__stat">
            <span className="memory-card-game__stat-label">Moves</span>
            <span className="memory-card-game__stat-value">{moves}</span>
          </div>
          {bestScore && (
            <div className="memory-card-game__stat memory-card-game__stat--best">
              <span className="memory-card-game__stat-label">Best</span>
              <span className="memory-card-game__stat-value">
                {bestScore.moves} / {formatTime(bestScore.time)}
              </span>
            </div>
          )}
          <motion.button
            className="memory-card-game__new-game-btn"
            onClick={handleNewGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Game
          </motion.button>
        </div>

        <div className="memory-card-game__board">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`memory-card-game__card ${
                card.isFlipped || card.isMatched
                  ? "memory-card-game__card--flipped"
                  : ""
              } ${card.isMatched ? "memory-card-game__card--matched" : ""}`}
              onClick={() => handleCardClick(card.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={
                !card.isMatched && !card.isFlipped ? { scale: 1.05 } : undefined
              }
              whileTap={
                !card.isMatched && !card.isFlipped ? { scale: 0.95 } : undefined
              }
            >
              <div className="memory-card-game__card-inner">
                <div className="memory-card-game__card-front">?</div>
                <div className="memory-card-game__card-back">{card.symbol}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Win Modal */}
      <AnimatePresence>
        {hasWon && (
          <motion.div
            className="memory-card-game__modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHasWon(false)}
          >
            <motion.div
              className="memory-card-game__modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="memory-card-game__modal-title">
                🎉 Congratulations! 🎉
              </h2>
              <p className="memory-card-game__modal-message">
                You completed the game!
              </p>
              <div className="memory-card-game__modal-stats">
                <div className="memory-card-game__modal-stat">
                  <span className="memory-card-game__modal-stat-label">
                    Time
                  </span>
                  <span className="memory-card-game__modal-stat-value">
                    {formatTime(timer)}
                  </span>
                </div>
                <div className="memory-card-game__modal-stat">
                  <span className="memory-card-game__modal-stat-label">
                    Moves
                  </span>
                  <span className="memory-card-game__modal-stat-value">
                    {moves}
                  </span>
                </div>
              </div>
              {bestScore &&
                moves === bestScore.moves &&
                timer === bestScore.time && (
                  <p className="memory-card-game__modal-record">
                    🏆 New Best Score! 🏆
                  </p>
                )}
              <motion.button
                className="memory-card-game__modal-btn"
                onClick={() => {
                  setHasWon(false);
                  handleNewGame();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryCardGame;

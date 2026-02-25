
import './App.css'
import { useEffect, useState } from 'react';

const initialCardsData = [
  {
    id: 1,
    symbol: '🍎',
    isMatched: false,
  },
  {
    id: 2,
    symbol: '🍎',
    isMatched: false,
  },
  {
    id: 3,
    symbol: '🍌',
    isMatched: false,
  },
  {
    id: 4,
    symbol: '🍌',
    isMatched: false,
  },
  {
    id: 5,
    symbol: '🍇',
    isMatched: false,
  },
  {
    id: 6,
    symbol: '🍇',
    isMatched: false,
  },
  {
    id: 7,
    symbol: '🍊',
    isMatched: false,
  },
  {
    id: 8,
    symbol: '🍊',
    isMatched: false,
  },
  {
    id: 9,
    symbol: '🍓',
    isMatched: false,
  },
  {
    id: 10,
    symbol: '🍓',
    isMatched: false,
  },
  {
    id: 11,
    symbol: '🍉',
    isMatched: false,
  },
  {
    id: 12,
    symbol: '🍉',
    isMatched: false,
  },
  {
    id: 13,
    symbol: '🍒',
    isMatched: false,
  },
  {
    id: 14,
    symbol: '🍒',
    isMatched: false,
  },
  {
    id: 15,
    symbol: '🍑',
    isMatched: false,
  },
  {
    id: 16,
    symbol: '🍑',
    isMatched: false,
  },
]

const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [cards, setCards] = useState(() => shuffleCards(initialCardsData));
  const [flippedCards, setFlippedCards] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('memoryGameBestScore');
    return saved ? JSON.parse(saved) : null;
  });

  // Timer effect
  useEffect(() => {
    let interval;
    if (isGameActive && !hasWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, hasWon]);

  // Check for win condition
  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && moves > 0) {
      setHasWon(true);
      setIsGameActive(false);
      
      // Update best score if this is better
      if (!bestScore || moves < bestScore.moves || (moves === bestScore.moves && timer < bestScore.time)) {
        const newBestScore = { moves, time: timer };
        setBestScore(newBestScore);
        localStorage.setItem('memoryGameBestScore', JSON.stringify(newBestScore));
      }
    }
  }, [cards, moves, timer, bestScore, hasWon]);

  useEffect(() => {
    if(flippedCards.length === 2) {
      setIsComparing(true);
      setMoves((prev) => prev + 1);
      const firstCard = cards.find((card) => card.id === flippedCards[0])
      const secondCard = cards.find((card) => card.id === flippedCards[1])

      if(firstCard.symbol === secondCard.symbol) {
        console.log("cards matched")
        setTimeout(() => {
          setCards((prev) => prev.map(card => 
            card.id === firstCard.id || card.id === secondCard.id 
              ? { ...card, isMatched: true } 
              : card
          ))
          setFlippedCards([]);
          setIsComparing(false);
        }, 500);
      } else {
        console.log("cards did not match")
        setTimeout(() => {
          setFlippedCards([]);
          setIsComparing(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards])

  const handleCardClick = (cardId) => {
    if (!isGameActive) {
      setIsGameActive(true);
    }
    if(isComparing) return;
    if(flippedCards.includes(cardId)) return;
    if(flippedCards.length === 2) return;
    setFlippedCards((prev) => [...prev, cardId]);
  }

  const handleNewGame = () => {
    setCards(shuffleCards(initialCardsData));
    setFlippedCards([]);
    setIsComparing(false);
    setMoves(0);
    setHasWon(false);
    setTimer(0);
    setIsGameActive(false);
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  return (
    <div className='app-container'>
      <h1>🎮 Memory Card Game 🎮</h1>
      <div className='game-stats'>
        <div className='stat-item'>
          <span className='stat-label'>Time:</span>
          <span className='stat-value'>{formatTime(timer)}</span>
        </div>
        <div className='stat-item'>
          <span className='stat-label'>Moves:</span>
          <span className='stat-value'>{moves}</span>
        </div>
        {bestScore && (
          <div className='stat-item best-score'>
            <span className='stat-label'>Best:</span>
            <span className='stat-value'>{bestScore.moves} moves / {formatTime(bestScore.time)}</span>
          </div>
        )}
        <button className='new-game-btn' onClick={handleNewGame}>New Game</button>
      </div>
      <div className='card-container'>
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card.id);
          const isMatched = card.isMatched;
          
          return (
            <div 
              key={card.id} 
              onClick={() => {
                if(isMatched) return;
                handleCardClick(card.id)
              }} 
              className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            >
              {isMatched || isFlipped ? card.symbol : '?'}
            </div>
          )
        })}
      </div>

      {hasWon && (
        <div className='win-modal-overlay' onClick={() => setHasWon(false)}>
          <div className='win-modal' onClick={(e) => e.stopPropagation()}>
            <h2>🎉 Congratulations! 🎉</h2>
            <p className='win-message'>You won the game!</p>
            <div className='win-stats'>
              <div className='win-stat'>
                <span className='win-stat-label'>Time:</span>
                <span className='win-stat-value'>{formatTime(timer)}</span>
              </div>
              <div className='win-stat'>
                <span className='win-stat-label'>Moves:</span>
                <span className='win-stat-value'>{moves}</span>
              </div>
            </div>
            {bestScore && (moves === bestScore.moves && timer === bestScore.time) && (
              <p className='new-record'>🏆 New Best Score! 🏆</p>
            )}
            <button className='play-again-btn' onClick={() => {
              setHasWon(false);
              handleNewGame();
            }}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

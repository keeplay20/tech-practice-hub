
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
  }
  
  return (
    <div className='app-container'>
      <h1>🎮 Memory Card Game 🎮</h1>
      <div className='game-stats'>
        <div className='moves'>Moves: {moves}</div>
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
    </div>
  )
}

export default App

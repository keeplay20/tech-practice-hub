import { motion } from "framer-motion";

const games = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "⭕",
    description: "Classic game of X's and O's",
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    icon: "✌️",
    description: "Test your luck against AI",
  },
];

const GameCard = ({ game, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-dark-lighter rounded-xl p-6 cursor-pointer
              transition-all duration-300 border-2 border-accent 
              hover:border-accent-light"
    onClick={() => onSelect(game.id)}
  >
    <div className="flex items-center gap-4">
      <span className="text-4xl">{game.icon}</span>
      <div>
        <h3 className="text-text-primary text-xl mb-1 font-mono">
          {game.title}
        </h3>
        <p className="text-text-secondary text-sm">{game.description}</p>
      </div>
    </div>
  </motion.div>
);

export default function GameSelector({ onSelectGame }) {
  return (
    <div className="flex flex-col items-center p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl text-text-primary font-mono mb-8"
      >
        Choose a Game
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelect={onSelectGame} />
        ))}
      </div>
    </div>
  );
}

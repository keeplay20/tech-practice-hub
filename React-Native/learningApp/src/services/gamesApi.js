/**
 * Mock Games API — simulates server-side search + pagination.
 *
 * Interview talking points:
 * - Keeps UI/store free of fake latency and filtering logic
 * - Returns the same shape a real REST endpoint would ({ data, total, hasMore })
 * - `setTimeout` mimics network delay so loading states are realistic
 */

const PAGE_SIZE = 10;
const NETWORK_DELAY_MS = 800;

// Programmatic catalog so we have enough rows for infinite scroll (5+ pages)
const GENRES = ['Action', 'RPG', 'Strategy', 'Sports', 'Puzzle', 'Adventure', 'Racing', 'Simulation'];

const GAME_TITLES = [
  'Elden Ring', 'Zelda Breath', 'God of War', 'Halo Infinite', 'Fortnite',
  'Minecraft', 'Cyberpunk 2077', 'Red Dead 2', 'GTA V', 'The Witcher 3',
  'Dark Souls III', 'Sekiro', 'Bloodborne', 'Horizon Zero', 'Spider-Man',
  'Uncharted 4', 'Last of Us', 'Ghost of Tsushima', 'Death Stranding', 'Control',
  'Doom Eternal', 'Hades', 'Stardew Valley', 'Celeste', 'Hollow Knight',
  'Portal 2', 'Half-Life 2', 'Bioshock', 'Mass Effect', 'Dragon Age',
  'Skyrim', 'Fallout 4', 'Resident Evil 4', 'Silent Hill 2', 'Metal Gear',
  'Final Fantasy XVI', 'Persona 5', 'Animal Crossing', 'Splatoon 3', 'Mario Kart',
  'Smash Bros', 'Tetris Effect', 'Overwatch 2', 'Valorant', 'Apex Legends',
  'League of Legends', 'Dota 2', 'Counter-Strike 2', 'Rocket League', 'Among Us',
  'Civilization VI', 'XCOM 2', 'Crusader Kings', 'Europa Universalis', 'Factorio',
];

/** @type {import('../store/gamesStore').Game[]} */
const ALL_GAMES = GAME_TITLES.map((title, index) => ({
  id: String(index + 1),
  title,
  genre: GENRES[index % GENRES.length],
  rating: Number((3.5 + (index % 15) * 0.1).toFixed(1)),
  imageUrl: `https://picsum.photos/seed/game-${index + 1}/320/180`,
}));

/**
 * Server-side style filter: matches title OR genre (case-insensitive).
 * Empty query returns the full catalog — same as omitting `q` on a real API.
 */
function filterGames(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return ALL_GAMES;

  return ALL_GAMES.filter(
    (game) =>
      game.title.toLowerCase().includes(normalized) ||
      game.genre.toLowerCase().includes(normalized)
  );
}

/**
 * @param {{ query?: string, page?: number, pageSize?: number }} params
 * @returns {Promise<{ data: import('../store/gamesStore').Game[], total: number, hasMore: boolean }>}
 */
export function fetchGames({ query = '', page = 1, pageSize = PAGE_SIZE } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo hook: typing "error" triggers the error state for interview walkthrough
      if (query.trim().toLowerCase() === 'error') {
        reject(new Error('Failed to load games. Please try again.'));
        return;
      }

      const filtered = filterGames(query);
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const data = filtered.slice(start, end);
      const total = filtered.length;
      const hasMore = end < total;

      resolve({ data, total, hasMore });
    }, NETWORK_DELAY_MS);
  });
}

export { PAGE_SIZE };

import { useEffect, useState } from "react";
import { fetchProducts } from "../data/products";
import { formatPrice } from "../utils/format";
import "../App.css";

/**
 * EXERCISE 3 — 60 min
 * GOAL: Debounced async search with loading + error + race-condition safety
 *
 * TODO:
 * 1. query state (immediate input value)
 * 2. debouncedQuery — useEffect + setTimeout 300ms, cleanup on unmount/change
 * 3. On debouncedQuery change: set loading, call fetchProducts(debouncedQuery)
 * 4. Use cancelled flag OR AbortController so stale responses don't overwrite
 * 5. error state on catch
 * 6. Show spinner while loading, results when done
 */
export default function Ex3_DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: debounce effect
  useEffect(() => {
    // implement debounce here
  }, [query]);

  // TODO: fetch effect when debouncedQuery changes
  useEffect(() => {
    // implement fetch with cancellation
  }, [debouncedQuery]);

  return (
    <main className="app">
      <h1>Exercise 3: Debounced Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search (400ms fake API)..."
        aria-label="Search products"
      />

      {loading && <p className="loading">Searching...</p>}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <ul className="product-grid">
          {results.map((p) => (
            <li key={p.id} className="product-card">
              <h2>{p.name}</h2>
              <p className="muted">{p.sku}</p>
              <p className="price">{formatPrice(p.price)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

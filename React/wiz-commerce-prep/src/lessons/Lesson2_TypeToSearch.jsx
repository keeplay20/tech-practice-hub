import { useState } from "react";
import { PRODUCTS } from "../data/products";
import "../App.css";

/**
 * LESSON 2 — Typing in a box changes what you see.
 *
 * 1. User types → query changes
 * 2. We filter PRODUCTS → only names that match
 * 3. React shows the smaller list
 *
 * That's 90% of interview machine coding.
 */
export default function Lesson2_TypeToSearch() {
  const [query, setQuery] = useState("");

  const shown = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="app">
      <h1>Lesson 2: Search box</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type 'lamp' or 'table'..."
      />

      <p>Showing {shown.length} of {PRODUCTS.length}</p>

      <ul className="product-grid">
        {shown.map((p) => (
          <li key={p.id} className="product-card">
            <h2>{p.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}

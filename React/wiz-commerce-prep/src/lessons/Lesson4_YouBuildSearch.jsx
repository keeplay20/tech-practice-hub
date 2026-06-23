import { useState } from "react";
import { PRODUCTS } from "../data/products";
import "../App.css";

/**
 * YOUR TURN — build search yourself. Follow the steps in chat.
 * Delete the comment below and type each step as you go.
 */

export default function Lesson4_YouBuildSearch() {
  // STEP 1: add → const [query, setQuery] = useState("");

  // STEP 2: add → const shown = PRODUCTS.filter(...)

  return (
    <main className="app">
      <h1>I built this myself</h1>

      {/* STEP 3: add input with value={query} onChange={...} */}

      {/* STEP 4: map over `shown` and show product.name in <li key={p.id}> */}
    </main>
  );
}

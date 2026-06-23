import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/format";
import "../App.css";

/**
 * EXERCISE 1 — 75 min
 * GOAL: Product grid + search + category filter + price sort
 *
 * TODO:
 * 1. query state + filter by name OR sku (case-insensitive)
 * 2. category state — "All" or one category
 * 3. sort: "price-asc" | "price-desc" | "name"
 * 4. useMemo for filtered list
 * 5. Empty state when no matches
 * 6. Show: name, sku, category, price, MOQ, out-of-stock badge
 */
export default function Ex1_ProductSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, category, sort]);

  return (
    <main className="app">
      <h1>Exercise 1: Product Search</h1>

      <div className="toolbar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or SKU..."
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="name">Name A–Z</option>
          <option value="price-asc">Price low–high</option>
          <option value="price-desc">Price high–low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul className="product-grid">
          {filtered.map((p) => (
            <li key={p.id} className="product-card">
              <h2>{p.name}</h2>
              <p className="muted">{p.sku}</p>
              <p>{p.category}</p>
              <p className="price">{formatPrice(p.price)}</p>
              <p className="muted">MOQ: {p.moq}</p>
              {!p.inStock && <span className="badge">Out of stock</span>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

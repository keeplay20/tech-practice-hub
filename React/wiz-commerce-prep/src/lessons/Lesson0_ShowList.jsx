import { PRODUCTS } from "../data/products";
import "../App.css";

/**
 * LESSON 0 — Just look. Don't change anything yet.
 *
 * React = show stuff on screen.
 * PRODUCTS is a list of toys (products). We loop and show each one.
 */
export default function Lesson0_ShowList() {
  return (
    <main className="app">
      <h1>Lesson 0: Show a list</h1>
      <p>We have {PRODUCTS.length} products. React draws them below.</p>

      {/* <ul className="product-grid">
        {PRODUCTS.map((product) => (
          <li key={product.id} className="product-card">
            <h2>{product.name}</h2>
          </li>
        ))}
      </ul> */}

      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id} className="prod_card">
            <h2>{prod.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}

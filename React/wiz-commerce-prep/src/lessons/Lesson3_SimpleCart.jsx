import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/format";
import "../App.css";

/**
 * LESSON 3 — Cart = a notebook that says "how many of each toy"
 *
 * cart looks like: { "1": 2, "3": 1 }
 *   meaning: 2 of product id "1", 1 of product id "3"
 */
export default function Lesson3_SimpleCart() {
  const [cart, setCart] = useState({});

  function addOne(productId) {
    setCart((oldCart) => ({
      ...oldCart,
      [productId]: (oldCart[productId] || 0) + 1,
    }));
  }

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <main className="app">
      <h1>Lesson 3: Simple cart</h1>
      <p>Items in cart: <strong>{totalItems}</strong></p>

      <ul className="product-grid">
        {PRODUCTS.slice(0, 4).map((p) => (
          <li key={p.id} className="product-card">
            <h2>{p.name}</h2>
            <p>{formatPrice(p.price)}</p>
            <p>In cart: {cart[p.id] || 0}</p>
            <button type="button" onClick={() => addOne(p.id)}>
              Add 1
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { formatPrice } from "../utils/format";
import "../App.css";

/**
 * EXERCISE 2 — 90 min
 * GOAL: Add to cart, qty controls, MOQ enforcement, line total + cart total
 *
 * Cart shape: { [productId]: quantity }
 *
 * TODO:
 * 1. addToCart(id) — start at MOQ if first add
 * 2. increment(id) — +1 each click
 * 3. decrement(id) — don't go below MOQ; remove item if would go below MOQ
 * 4. removeFromCart(id)
 * 5. cartItems useMemo — [{ product, qty, lineTotal }]
 * 6. cartTotal useMemo
 * 7. Disable "Add" when out of stock
 * 8. Show MOQ warning if qty === moq on decrement boundary
 */
export default function Ex2_Cart() {
  const [cart, setCart] = useState({});

  const cartItems = useMemo(() => {
    // TODO: map cart entries to { product, qty, lineTotal }
    return [];
  }, [cart]);

  const cartTotal = useMemo(() => {
    // TODO: sum line totals
    return 0;
  }, [cartItems]);

  const addToCart = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : product.moq,
    }));
  };

  const decrement = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    setCart((prev) => {
      const next = prev[id] - 1;
      if (next < product.moq) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <main className="app">
      <h1>Exercise 2: B2B Cart</h1>

      <section>
        <h2>Products</h2>
        <ul className="product-grid">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="product-card">
              <h3>{p.name}</h3>
              <p className="price">{formatPrice(p.price)}</p>
              <p className="muted">MOQ: {p.moq}</p>
              <button
                type="button"
                disabled={!p.inStock}
                onClick={() => addToCart(p.id)}
              >
                {p.inStock ? "Add to cart" : "Unavailable"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="cart-panel">
        <h2>Cart ({cartItems.length} lines)</h2>
        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="cart-row">
                  <span>{product.name}</span>
                  <div className="qty-controls">
                    <button type="button" onClick={() => decrement(product.id)}>
                      −
                    </button>
                    <span>{qty}</span>
                    <button type="button" onClick={() => increment(product.id)}>
                      +
                    </button>
                  </div>
                  <span>{formatPrice(lineTotal)}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="cart-total">
              <strong>Total: {formatPrice(cartTotal)}</strong>
            </p>
          </>
        )}
      </section>
    </main>
  );
}

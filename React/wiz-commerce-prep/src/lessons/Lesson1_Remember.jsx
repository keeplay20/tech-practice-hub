import { useState } from "react";
import "../App.css";

/**
 * LESSON 1 — useState = React remembers a number for you.
 *
 * Think of a sticky note on the fridge:
 *   - count = what's written on the note
 *   - setCount = you erase and write a new number
 *   - When the note changes, React redraws the screen.
 */
export default function Lesson1_Remember() {
  const [count, setCount] = useState(0);

  return (
    <main className="app">
      <h1>Lesson 1: React remembers</h1>
      <p>You clicked: <strong>{count}</strong> times</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Click me +1
      </button>
    </main>
  );
}

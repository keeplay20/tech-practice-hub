import { useState, useEffect, useRef, useMemo } from "react";

const SECTIONS = {
  home: { icon: "◈", label: "Home" },
  javascript: { icon: "⟐", label: "JavaScript" },
  typescript: { icon: "⊡", label: "TypeScript" },
  react: { icon: "⟡", label: "React" },
  reactnative: { icon: "◎", label: "React Native" },
  dsa: { icon: "⬡", label: "DSA" },
  systemdesign: { icon: "⊞", label: "System Design" },
  r3f: { icon: "△", label: "R3F / 3D Web" },
  ai: { icon: "◇", label: "AI / ML" },
};

/* ─── CONTENT DATA ─── */
const CONTENT = {
  javascript: {
    title: "JavaScript",
    subtitle:
      "The language of the web — from fundamentals to engine-level mastery",
    timeline: "12–16 weeks to advanced proficiency",
    phases: [
      {
        name: "Phase 1 — Core language",
        time: "Week 1–3",
        color: "#c084fc",
        topics: [
          {
            title: "Variables & Types",
            time: "Day 1–2",
            content: `JavaScript has 8 types: string, number, bigint, boolean, undefined, null, symbol, object. Everything else (arrays, functions, dates) is an object.

**let vs const vs var:**
- \`const\` = can't reassign. Use by default.
- \`let\` = can reassign. Use in loops and when value changes.
- \`var\` = old way. Function-scoped, hoisted. Never use in modern code.

\`\`\`js
const name = "Arjun"    // string, can't reassign
let score = 0           // number, will change
let active = true       // boolean

// Type coercion (JS converts types silently — know these!)
"5" + 3    // "53" (string wins with +)
"5" - 3    // 2   (math wins with -)
"" == false // true  (loose equality, avoid this)
"" === false // false (strict equality, always use this)
\`\`\`

**Rule:** Always use \`===\` instead of \`==\`. Always use \`const\` unless you need \`let\`.`,
            resources: ["MDN: JavaScript data types", "javascript.info/types"],
            questions: [
              "What's the difference between null and undefined?",
              "Why does typeof null return 'object'?",
              "What happens with let in a for loop vs var?",
            ],
          },
          {
            title: "Functions & Closures",
            time: "Day 3–5",
            content: `Functions are first-class citizens — they can be stored in variables, passed as arguments, and returned from other functions. This is the foundation of everything in JS.

**Three ways to declare:**
\`\`\`js
// 1. Function declaration (hoisted — can call before declaration)
function greet(name) { return "Hi " + name }

// 2. Function expression (NOT hoisted)
const greet = function(name) { return "Hi " + name }

// 3. Arrow function (shortest, no own 'this')
const greet = (name) => "Hi " + name
\`\`\`

**Closures — the most important concept:**
A closure is a function that remembers the variables from where it was created, even after that outer function has finished.

\`\`\`js
function makeCounter() {
  let count = 0              // this variable is "closed over"
  return function() {
    count++                  // inner function remembers count
    return count
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
// count is private — no one can access it directly
\`\`\`

**Why closures matter:** React hooks (useState, useEffect) are built on closures. Event handlers use closures. Module patterns use closures. If you don't understand closures, you don't understand JavaScript.`,
            resources: ["javascript.info/closure", "MDN: Closures"],
            questions: [
              "What will a setTimeout inside a for loop with var print? Why?",
              "How do closures relate to React's useState?",
              "Create a function that generates unique IDs using closure",
            ],
          },
          {
            title: "this, bind, call, apply",
            time: "Day 6–7",
            content: `\`this\` refers to the object that's calling the function. It's NOT the object where the function is defined — it's the object at the CALL SITE.

\`\`\`js
const user = {
  name: "Arjun",
  greet() { console.log("Hi, " + this.name) }
}

user.greet()          // "Hi, Arjun" — this = user
const fn = user.greet
fn()                  // "Hi, undefined" — this = window (lost context!)

// Fix with bind:
const bound = user.greet.bind(user)
bound()               // "Hi, Arjun"

// Arrow functions don't have their own this — they inherit from parent
const user2 = {
  name: "Priya",
  greet: () => console.log(this.name)  // this = outer scope, NOT user2!
}
\`\`\`

**call vs apply vs bind:**
- \`call(thisArg, arg1, arg2)\` — calls immediately with args
- \`apply(thisArg, [args])\` — calls immediately with array of args
- \`bind(thisArg)\` — returns a NEW function with fixed this

**In React:** Arrow functions in class components auto-bind \`this\`. In functional components with hooks, \`this\` is irrelevant — another reason hooks won.`,
            resources: ["javascript.info/object-methods", "MDN: this"],
            questions: [
              "What does 'this' refer to inside a setTimeout callback?",
              "Why do arrow functions not have their own 'this'?",
              "How does bind() work internally? Can you implement it?",
            ],
          },
          {
            title: "Prototypes & Inheritance",
            time: "Day 8–9",
            content: `JavaScript doesn't have traditional classes — \`class\` is syntax sugar over prototypes. Every object has a hidden [[Prototype]] link to another object.

\`\`\`js
// When you access a property, JS looks up the prototype chain:
const animal = { eats: true }
const rabbit = Object.create(animal)
rabbit.jumps = true

rabbit.jumps  // true (own property)
rabbit.eats   // true (found on prototype — animal)
rabbit.flies  // undefined (not found anywhere in chain)
\`\`\`

**class syntax (what you'll actually use):**
\`\`\`js
class Animal {
  constructor(name) { this.name = name }
  speak() { return this.name + " makes a sound" }
}

class Dog extends Animal {
  speak() { return this.name + " barks" }  // override
}

const d = new Dog("Rex")
d.speak()  // "Rex barks"
d instanceof Animal  // true
\`\`\`

**For interviews:** Know that \`class\` is sugar over prototypes. Know the prototype chain lookup. Know \`Object.create()\`, \`instanceof\`, and \`hasOwnProperty()\`.`,
            resources: [
              "javascript.info/prototypes",
              "MDN: Inheritance and prototype chain",
            ],
            questions: [
              "What's the difference between __proto__ and prototype?",
              "How does instanceof work internally?",
              "Implement your own new keyword",
            ],
          },
          {
            title: "Async: Promises, async/await",
            time: "Day 10–14",
            content: `JavaScript is single-threaded but non-blocking. It uses an event loop to handle async operations.

**The evolution:**
1. Callbacks → 2. Promises → 3. async/await

\`\`\`js
// Callbacks (old way — leads to "callback hell")
fetchUser(id, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      // deeply nested, hard to read
    })
  })
})

// Promises (better)
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err))

// async/await (best — reads like synchronous code)
async function loadData(id) {
  try {
    const user = await fetchUser(id)
    const posts = await fetchPosts(user.id)
    const comments = await fetchComments(posts[0].id)
    return comments
  } catch (err) {
    console.error(err)
  }
}
\`\`\`

**Promise combinators you must know:**
\`\`\`js
Promise.all([p1, p2, p3])      // wait for ALL, fail if ANY fails
Promise.allSettled([p1, p2])    // wait for ALL, never fails
Promise.race([p1, p2])          // first to settle (resolve or reject)
Promise.any([p1, p2])           // first to RESOLVE (ignores rejections)
\`\`\`

**Event loop:** Call stack → Microtask queue (promises) → Macrotask queue (setTimeout). Microtasks always run before macrotasks.`,
            resources: [
              "javascript.info/async",
              "JSConf: What the heck is the event loop (video)",
            ],
            questions: [
              "In what order do console.log, setTimeout(0), and Promise.resolve() execute?",
              "Implement Promise.all from scratch",
              "What is a microtask vs macrotask?",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Advanced patterns",
        time: "Week 4–8",
        color: "#818cf8",
        topics: [
          {
            title: "ES6+ Features Deep Dive",
            time: "Week 4",
            content: `Master destructuring, spread/rest, modules, iterators, generators, symbols, Proxy/Reflect, WeakMap/WeakSet, optional chaining (?.), nullish coalescing (??), and private class fields (#).

\`\`\`js
// Destructuring (use everywhere)
const { name, age, address: { city } } = user
const [first, ...rest] = items

// Optional chaining (safe deep access)
const zip = user?.address?.zipCode  // undefined if any part is missing

// Nullish coalescing (default only for null/undefined)
const port = config.port ?? 3000  // 0 and "" are NOT replaced
\`\`\``,
            resources: ["ES6 features overview: es6-features.org"],
            questions: [
              "Difference between ?? and ||?",
              "When would you use WeakMap over Map?",
            ],
          },
          {
            title: "Event Loop, Microtasks & Performance",
            time: "Week 5",
            content: `Understand the JS runtime deeply: heap, call stack, Web APIs, callback queue, microtask queue, requestAnimationFrame timing, and how browsers schedule rendering.

**Performance patterns:** debounce, throttle, requestIdleCallback, Web Workers for CPU-heavy work, memory leaks from closures/event listeners/detached DOM nodes.`,
            resources: [
              "Jake Archibald: In The Loop (video)",
              "web.dev: Optimize JS execution",
            ],
            questions: [
              "Implement debounce and throttle from scratch",
              "When does rAF fire relative to microtasks?",
            ],
          },
          {
            title: "Design Patterns in JS",
            time: "Week 6–7",
            content: `Module, Singleton, Observer, Pub/Sub, Factory, Strategy, Decorator, Proxy, Iterator, Mediator. Know when to use each.

\`\`\`js
// Observer pattern (used in Redux, EventEmitter, RxJS)
class EventBus {
  #listeners = {}
  on(event, fn) { (this.#listeners[event] ??= []).push(fn) }
  emit(event, data) { this.#listeners[event]?.forEach(fn => fn(data)) }
  off(event, fn) { this.#listeners[event] = this.#listeners[event]?.filter(f => f !== fn) }
}
\`\`\``,
            resources: [
              "Patterns.dev",
              "Addy Osmani: Learning JS Design Patterns (free book)",
            ],
            questions: [
              "Implement a pub/sub system",
              "Where is the Observer pattern used in React?",
            ],
          },
          {
            title: "Functional Programming",
            time: "Week 8",
            content: `Pure functions, immutability, higher-order functions, currying, composition, monads (Promise is a monad). This is the paradigm React embraces.

\`\`\`js
// Composition: small functions → complex behavior
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const transform = pipe(trim, lowercase, slugify)
transform("  Hello World  ") // "hello-world"
\`\`\``,
            resources: [
              "Mostly Adequate Guide to FP (free book)",
              "Fun Fun Function YouTube series",
            ],
            questions: [
              "Implement curry() that works for any number of arguments",
              "What makes a function pure?",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — Engine-level knowledge",
        time: "Week 9–12",
        color: "#6366f1",
        topics: [
          {
            title: "V8 Internals & Memory",
            time: "Week 9–10",
            content: `How V8 compiles JS: parsing → AST → Ignition (bytecode interpreter) → TurboFan (optimizing compiler). Hidden classes, inline caches, garbage collection (generational GC, Mark-Sweep-Compact). Know how to write code that the JIT compiler can optimize.`,
            resources: [
              "V8 blog: v8.dev/blog",
              "Mathias Bynens: V8 internals talks",
            ],
            questions: [
              "What causes de-optimization in V8?",
              "How does hidden class transition work?",
            ],
          },
          {
            title: "Security & Browser APIs",
            time: "Week 11–12",
            content: `XSS, CSRF, CSP, CORS, SRI, secure cookies, JWT, OAuth 2.0 flows. Browser APIs: IntersectionObserver, ResizeObserver, MutationObserver, Web Workers, SharedArrayBuffer, WebSockets, WebRTC, Service Workers, Cache API, IndexedDB.`,
            resources: ["OWASP Top 10", "web.dev/learn"],
            questions: [
              "How would you prevent XSS in a React app?",
              "Explain CORS to a junior developer",
            ],
          },
        ],
      },
    ],
  },

  typescript: {
    title: "TypeScript",
    subtitle: "Type safety at scale — from annotations to advanced generics",
    timeline: "8–10 weeks to production proficiency",
    phases: [
      {
        name: "Phase 1 — Type fundamentals",
        time: "Week 1–3",
        color: "#38bdf8",
        topics: [
          {
            title: "Basic Types & Interfaces",
            time: "Week 1",
            content: `TypeScript adds a type system on top of JavaScript. Think of types as contracts — they describe the shape of data.

\`\`\`ts
// Primitives
let name: string = "Arjun"
let age: number = 25
let active: boolean = true

// Arrays & Tuples
let scores: number[] = [90, 85, 92]
let pair: [string, number] = ["age", 25]

// Object shapes with interface
interface User {
  id: number
  name: string
  email: string
  avatar?: string       // optional (may be undefined)
  readonly createdAt: Date  // can't modify after creation
}

// Function types
function greet(user: User): string {
  return "Hi " + user.name
}

// Type vs Interface (use interface for objects, type for unions/intersects)
type Status = "active" | "inactive" | "banned"  // union type
type Point = { x: number; y: number }
\`\`\`

**Rule of thumb:** Use \`interface\` for object shapes (they're extendable). Use \`type\` for unions, intersections, and aliases.`,
            resources: [
              "TypeScript Handbook: typescriptlang.org/docs",
              "Total TypeScript by Matt Pocock",
            ],
            questions: [
              "When would you use type vs interface?",
              "What does readonly do vs const?",
            ],
          },
          {
            title: "Generics",
            time: "Week 2–3",
            content: `Generics let you write reusable code that works with multiple types while keeping type safety. Think of \`<T>\` as a "type variable."

\`\`\`ts
// Without generics: you'd need a separate function for each type
function firstNumber(arr: number[]): number { return arr[0] }
function firstString(arr: string[]): string { return arr[0] }

// With generics: one function handles ALL types
function first<T>(arr: T[]): T { return arr[0] }
first([1, 2, 3])       // T inferred as number, returns number
first(["a", "b"])       // T inferred as string, returns string

// Constrained generics
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}
getLength("hello")     // 5
getLength([1, 2, 3])   // 3
getLength(123)          // Error! number has no .length
\`\`\``,
            resources: [
              "TypeScript Handbook: Generics",
              "Matt Pocock YouTube: Generics",
            ],
            questions: [
              "Build a generic Stack<T> class",
              "What does T extends infer U mean?",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Advanced types",
        time: "Week 4–7",
        color: "#0ea5e9",
        topics: [
          {
            title: "Utility Types & Conditional Types",
            time: "Week 4–5",
            content: `Built-in utilities: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Exclude, Extract, ReturnType, Parameters, Awaited.

Conditional types: \`T extends U ? X : Y\` — like a ternary for types. Combined with infer: \`T extends Promise<infer U> ? U : T\` unwraps a Promise type.

Mapped types: transform every property in a type — \`{ [K in keyof T]: boolean }\``,
            resources: [
              "TypeScript Handbook: Utility Types",
              "type-challenges GitHub repo",
            ],
            questions: [
              "Implement Partial<T> from scratch",
              "Build a DeepReadonly<T> type",
            ],
          },
          {
            title: "Template Literal Types & Discriminated Unions",
            time: "Week 6–7",
            content: `Template literals at the type level: \`type Route = \`/api/\${string}\`\`

Discriminated unions: pattern matching with a shared "tag" field.
\`\`\`ts
type Action =
  | { type: "increment"; amount: number }
  | { type: "reset" }

function reducer(action: Action) {
  switch (action.type) {
    case "increment": return action.amount  // TS knows amount exists here
    case "reset": return 0
  }
}
\`\`\``,
            resources: [
              "Total TypeScript: Advanced Patterns",
              "Type-level TypeScript course",
            ],
            questions: [
              "Build a type-safe event emitter",
              "Create route params extractor type",
            ],
          },
        ],
      },
    ],
  },

  react: {
    title: "React",
    subtitle:
      "Component architecture, hooks, patterns, and performance at scale",
    timeline: "12–16 weeks to senior-level proficiency",
    phases: [
      {
        name: "Phase 1 — Core concepts",
        time: "Week 1–4",
        color: "#22d3ee",
        topics: [
          {
            title: "Components, JSX & Props",
            time: "Week 1",
            content: `React = UI as a function of state. Components are functions that return JSX (a syntax extension that looks like HTML but compiles to function calls).

\`\`\`jsx
// A component is just a function that returns JSX
function Welcome({ name, role = "member" }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Role: {role}</p>
    </div>
  )
}

// Usage — props are like function arguments
<Welcome name="Arjun" role="admin" />

// Children prop — content between tags
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

<Card title="Settings">
  <p>Any content goes here</p>
</Card>
\`\`\`

**Mental model:** props flow DOWN (parent → child). Never modify props. If a child needs to communicate up, the parent passes a callback function as a prop.`,
            resources: [
              "react.dev (official docs — best resource)",
              "React Visualized by Lydia Hallie",
            ],
            questions: [
              "What happens if you mutate a prop?",
              "When would you use children vs a named prop?",
            ],
          },
          {
            title: "Hooks Deep Dive",
            time: "Week 2–3",
            content: `Hooks let function components have state and side effects. The rules: only call at the top level, only call in React functions.

\`\`\`jsx
// useState — state that triggers re-renders
const [count, setCount] = useState(0)
setCount(prev => prev + 1)  // always use updater for derived state

// useEffect — side effects (API calls, subscriptions, DOM manipulation)
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)  // cleanup on unmount or re-run
}, [dependency])  // only re-run when dependency changes

// useRef — mutable value that doesn't trigger re-renders
const inputRef = useRef(null)
inputRef.current.focus()  // direct DOM access

// useMemo — cache expensive computation
const sorted = useMemo(() => items.sort(compare), [items])

// useCallback — cache a function reference
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])

// useReducer — complex state logic
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: "increment" })
\`\`\`

**When to use what:**
- Simple value → useState
- Complex object with multiple related updates → useReducer
- Side effects → useEffect
- DOM access or per-frame values → useRef
- Expensive computation → useMemo
- Stable function reference → useCallback`,
            resources: [
              "react.dev/reference/react/hooks",
              "Dan Abramov: A Complete Guide to useEffect",
            ],
            questions: [
              "Why does useEffect cleanup run before the next effect?",
              "Build a custom useLocalStorage hook",
              "When does useMemo actually help vs hurt?",
            ],
          },
          {
            title: "State Management Patterns",
            time: "Week 4",
            content: `**Levels of state:**
1. Local state (useState) — belongs to one component
2. Lifted state — shared between siblings, lives in parent
3. Context — shared across a subtree without prop drilling
4. Global state (Zustand/Redux) — shared across entire app

\`\`\`jsx
// Context for medium complexity
const ThemeContext = createContext("light")

function App() {
  const [theme, setTheme] = useState("dark")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  )
}

// Zustand for complex apps (recommended over Redux)
import { create } from 'zustand'
const useStore = create((set) => ({
  items: [],
  addItem: (item) => set(s => ({ items: [...s.items, item] })),
}))
\`\`\`

**Rule:** Start with local state. Lift only when needed. Use Context for theme/auth. Use Zustand for complex global state.`,
            resources: [
              "Zustand docs",
              "Redux Toolkit docs",
              "Jotai for atomic state",
            ],
            questions: [
              "When is Context a bad choice? Why?",
              "Compare Redux vs Zustand architecture",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Advanced patterns",
        time: "Week 5–10",
        color: "#06b6d4",
        topics: [
          {
            title: "Performance Optimization",
            time: "Week 5–6",
            content: `React re-renders when state changes. Optimization = preventing unnecessary re-renders and reducing work per render.

**Tools:** React.memo, useMemo, useCallback, lazy/Suspense, virtualization (react-window), React DevTools Profiler.

**Key insight:** Don't optimize prematurely. Profile first, then fix the actual bottleneck.`,
            resources: [
              "react.dev/learn/render-and-commit",
              "Kent C. Dodds: When to useMemo and useCallback",
            ],
            questions: [
              "What triggers a re-render?",
              "Does React.memo do deep comparison?",
            ],
          },
          {
            title: "Custom Hooks & Composition",
            time: "Week 7–8",
            content: `Custom hooks extract reusable stateful logic. They're the primary code-reuse pattern in modern React — replacing HOCs and render props.

Build these: useDebounce, usePrevious, useMediaQuery, useOnClickOutside, useIntersectionObserver, useFetch with caching.`,
            resources: ["usehooks.com", "ahooks library source code"],
            questions: [
              "Build useDebounce that cancels on unmount",
              "Build useAsync with loading/error/data states",
            ],
          },
          {
            title: "Server Components & Next.js",
            time: "Week 9–10",
            content: `React Server Components (RSC) run on the server and send HTML, not JS. Client Components run in the browser. Next.js App Router is the primary RSC implementation.

Know: 'use client' directive, server actions, streaming with Suspense, caching strategies, ISR, SSG, SSR tradeoffs.`,
            resources: [
              "nextjs.org/docs",
              "react.dev/blog/2023/03/22/react-labs",
            ],
            questions: [
              "When should a component be server vs client?",
              "How does streaming SSR work?",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — Architecture",
        time: "Week 11–16",
        color: "#0891b2",
        topics: [
          {
            title: "Testing Strategy",
            time: "Week 11–12",
            content: `Unit tests (Vitest/Jest), component tests (React Testing Library), integration tests, E2E tests (Playwright/Cypress). Test behavior, not implementation.`,
            resources: [
              "Testing Library docs",
              "Kent C. Dodds: Testing Trophy",
            ],
            questions: [
              "Why 'test behavior not implementation'?",
              "When to use E2E vs integration?",
            ],
          },
          {
            title: "React at Scale — Architecture",
            time: "Week 13–16",
            content: `Feature-based folder structure, barrel exports, monorepo with Turborepo, shared component library, design system (Storybook), error boundaries, logging/monitoring, CI/CD pipeline, code splitting strategy.`,
            resources: [
              "Bulletproof React (GitHub)",
              "Vercel architecture guides",
            ],
            questions: [
              "Design the architecture for a 50-developer React app",
              "How would you split a monolith frontend into micro-frontends?",
            ],
          },
        ],
      },
    ],
  },

  reactnative: {
    title: "React Native",
    subtitle: "Cross-platform mobile from core concepts to production apps",
    timeline: "10–14 weeks",
    phases: [
      {
        name: "Phase 1 — Fundamentals",
        time: "Week 1–4",
        color: "#a78bfa",
        topics: [
          {
            title: "Core Components & Navigation",
            time: "Week 1–2",
            content: `React Native maps React components to native views. No DOM — instead: View (div), Text (p/span), Image, ScrollView, FlatList, TextInput, TouchableOpacity/Pressable.

**Key difference from web:** No CSS cascade. Every component uses StyleSheet or inline styles. Flexbox is the layout system (column direction by default, not row).

\`\`\`jsx
import { View, Text, StyleSheet, FlatList } from 'react-native'

function UserList({ users }) {
  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  )
}
\`\`\`

**Navigation:** React Navigation (stack, tab, drawer navigators). Expo Router for file-based routing.`,
            resources: [
              "reactnative.dev/docs/getting-started",
              "React Navigation docs",
            ],
            questions: [
              "FlatList vs ScrollView — when to use which?",
              "How does the bridge architecture work?",
            ],
          },
          {
            title: "Styling, Animation & Gestures",
            time: "Week 3–4",
            content: `Styling: StyleSheet.create, dynamic styles, platform-specific (Platform.OS). Animation: Animated API for basic, Reanimated 2/3 for performance (runs on UI thread). Gestures: react-native-gesture-handler.

**Reanimated is essential** — the Animated API runs on the JS thread and janks. Reanimated runs on the UI thread at 60fps.

\`\`\`jsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

function Box() {
  const offset = useSharedValue(0)
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offset.value) }]
  }))
  return <Animated.View style={[styles.box, style]} />
}
\`\`\``,
            resources: [
              "Reanimated docs",
              "William Candillon YouTube (gesture + animation)",
            ],
            questions: [
              "Why is Reanimated faster than Animated?",
              "Implement a swipe-to-delete gesture",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Production skills",
        time: "Week 5–10",
        color: "#8b5cf6",
        topics: [
          {
            title: "State, Storage & Networking",
            time: "Week 5–6",
            content: `State: Zustand or Redux Toolkit. Storage: AsyncStorage (small data), MMKV (fast key-value), SQLite/WatermelonDB (complex queries). Networking: fetch/axios + React Query/TanStack Query for caching, offline support, background refresh.`,
            resources: ["TanStack Query docs", "MMKV docs"],
            questions: [
              "Implement offline-first data sync",
              "When to use SQLite vs AsyncStorage?",
            ],
          },
          {
            title: "Native Modules & Performance",
            time: "Week 7–8",
            content: `New Architecture: Fabric (new renderer), TurboModules (faster native modules), JSI (direct JS-to-native calls without bridge). Performance: Hermes engine, Flipper profiling, avoid bridge bottlenecks, optimize FlatList (getItemLayout, windowSize, removeClippedSubviews).`,
            resources: [
              "reactnative.dev/docs/new-architecture",
              "Callstack: The Ultimate Guide to RN Performance",
            ],
            questions: [
              "Explain the New Architecture vs old bridge",
              "How does Hermes improve startup time?",
            ],
          },
          {
            title: "Build, Deploy & OTA Updates",
            time: "Week 9–10",
            content: `Expo EAS Build, CodePush/EAS Update for OTA. App Store/Play Store submission. CI/CD with GitHub Actions. Crash reporting (Sentry), analytics (Mixpanel/Amplitude), deep linking, push notifications (FCM/APNs).`,
            resources: ["Expo docs: eas.dev", "Fastlane docs"],
            questions: [
              "When can you use OTA vs when do you need a store update?",
              "Design a CI/CD pipeline for RN",
            ],
          },
        ],
      },
    ],
  },

  dsa: {
    title: "DSA",
    subtitle:
      "Data structures & algorithms — the foundation for technical interviews and scalable code",
    timeline: "16–20 weeks of focused practice",
    phases: [
      {
        name: "Phase 1 — Foundations",
        time: "Week 1–4",
        color: "#f472b6",
        topics: [
          {
            title: "Big-O, Arrays & Strings",
            time: "Week 1–2",
            content: `**Big-O** measures how runtime grows with input size. Not the exact time — the growth rate.

O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)

\`\`\`js
// O(1) — constant
arr[0]

// O(n) — linear
arr.forEach(x => ...)

// O(n²) — quadratic (nested loops)
for (i) { for (j) { ... } }

// O(log n) — binary search
while (lo < hi) { mid = (lo+hi)/2; ... }
\`\`\`

**Array patterns:** Two pointers, sliding window, prefix sum, kadane's algorithm. These solve 70% of array problems.

\`\`\`js
// Two pointers: find pair that sums to target (sorted array)
function twoSum(arr, target) {
  let l = 0, r = arr.length - 1
  while (l < r) {
    const sum = arr[l] + arr[r]
    if (sum === target) return [l, r]
    sum < target ? l++ : r--
  }
}
\`\`\``,
            resources: ["NeetCode.io roadmap", "LeetCode: Top Interview 150"],
            questions: [
              "LC #1: Two Sum",
              "LC #3: Longest Substring Without Repeating Characters",
              "LC #53: Maximum Subarray (Kadane's)",
              "LC #238: Product of Array Except Self",
            ],
          },
          {
            title: "Hash Maps & Sets",
            time: "Week 2",
            content: `Hash maps give O(1) average lookup. Use them to trade space for time — the most common optimization in DSA.

\`\`\`js
// Frequency counter pattern
function isAnagram(s, t) {
  if (s.length !== t.length) return false
  const freq = {}
  for (const c of s) freq[c] = (freq[c] || 0) + 1
  for (const c of t) {
    if (!freq[c]) return false
    freq[c]--
  }
  return true
}
\`\`\``,
            resources: ["NeetCode: Hashing section"],
            questions: [
              "LC #49: Group Anagrams",
              "LC #128: Longest Consecutive Sequence",
              "LC #347: Top K Frequent Elements",
            ],
          },
          {
            title: "Linked Lists, Stacks & Queues",
            time: "Week 3–4",
            content: `Linked lists: singly/doubly linked. Master the pointer manipulation — draw diagrams on paper.

Stacks (LIFO): use for matching brackets, undo/redo, DFS, monotonic problems.
Queues (FIFO): use for BFS, scheduling, sliding window max.

\`\`\`js
// Reverse a linked list (the classic)
function reverse(head) {
  let prev = null, curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}
\`\`\``,
            resources: ["Visualgo.net (visual algorithm animations)"],
            questions: [
              "LC #206: Reverse Linked List",
              "LC #20: Valid Parentheses",
              "LC #155: Min Stack",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Core algorithms",
        time: "Week 5–10",
        color: "#ec4899",
        topics: [
          {
            title: "Trees & Graphs",
            time: "Week 5–7",
            content: `Binary trees: DFS (inorder, preorder, postorder) and BFS (level order). BST operations. Graphs: adjacency list, DFS, BFS, topological sort, union-find.

**Pattern:** Most tree problems are solved with recursion. Think: "What does this node need to do, assuming its children have already been solved?"

\`\`\`js
// Max depth of binary tree (classic recursion)
function maxDepth(node) {
  if (!node) return 0
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right))
}
\`\`\``,
            resources: ["NeetCode: Trees & Graphs playlist"],
            questions: [
              "LC #104: Maximum Depth",
              "LC #200: Number of Islands",
              "LC #207: Course Schedule",
            ],
          },
          {
            title: "Dynamic Programming",
            time: "Week 8–10",
            content: `DP = recursion + memoization. If a problem has overlapping subproblems and optimal substructure, use DP.

**Framework:** 1) Define the state. 2) Write the recurrence. 3) Identify base cases. 4) Decide top-down (memo) or bottom-up (tabulation).

\`\`\`js
// Fibonacci (bottom-up DP)
function fib(n) {
  if (n <= 1) return n
  let a = 0, b = 1
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b]
  return b
}

// Coin change (classic DP)
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++)
    for (const coin of coins)
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1)
  return dp[amount] === Infinity ? -1 : dp[amount]
}
\`\`\``,
            resources: [
              "NeetCode: DP playlist",
              "MIT OCW: Dynamic Programming lectures",
            ],
            questions: [
              "LC #70: Climbing Stairs",
              "LC #322: Coin Change",
              "LC #1143: Longest Common Subsequence",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — Advanced & interview mastery",
        time: "Week 11–16+",
        color: "#db2777",
        topics: [
          {
            title: "Heaps, Tries & Advanced Graphs",
            time: "Week 11–13",
            content: `Priority queues (min/max heap), trie for prefix search, Dijkstra's shortest path, Bellman-Ford, A* search, minimum spanning tree (Kruskal's, Prim's).`,
            resources: [
              "NeetCode: Advanced Graphs",
              "William Fiset: Graph theory playlist",
            ],
            questions: [
              "LC #208: Implement Trie",
              "LC #295: Find Median from Data Stream",
              "LC #743: Network Delay Time",
            ],
          },
          {
            title: "Patterns & Mock Interviews",
            time: "Week 14–16",
            content: `Master the meta-patterns: sliding window, two pointers, fast/slow pointers, merge intervals, cyclic sort, BFS/DFS, backtracking, greedy, bit manipulation. Do 3 mock interviews per week.`,
            resources: [
              "Grokking the Coding Interview (patterns)",
              "Pramp.com for mock interviews",
            ],
            questions: [
              "Solve 3 medium LeetCode problems daily",
              "Time yourself: 25 min per medium, 40 per hard",
            ],
          },
        ],
      },
    ],
  },

  systemdesign: {
    title: "System Design",
    subtitle:
      "Designing scalable, reliable systems — from fundamentals to principal-level thinking",
    timeline: "12–16 weeks",
    phases: [
      {
        name: "Phase 1 — Building blocks",
        time: "Week 1–4",
        color: "#fb923c",
        topics: [
          {
            title: "Networking, APIs & Databases",
            time: "Week 1–2",
            content: `**Networking:** HTTP/HTTPS, TCP/UDP, DNS resolution, CDNs, load balancers (L4 vs L7), reverse proxies.

**APIs:** REST (resources + HTTP verbs), GraphQL (client-specified queries), gRPC (binary, fast, typed). WebSockets for real-time. Rate limiting, API versioning, pagination.

**Databases:** SQL (PostgreSQL) for structured relational data + ACID transactions. NoSQL for specific needs: MongoDB (documents), Redis (cache/sessions), Cassandra (write-heavy), Neo4j (graphs). Know when to pick what.

**CAP Theorem:** You can only have 2 of 3: Consistency, Availability, Partition tolerance. In reality, P is guaranteed (networks fail), so you choose between CP and AP.`,
            resources: [
              "Designing Data-Intensive Applications (DDIA) by Martin Kleppmann",
              "ByteByteGo YouTube",
            ],
            questions: [
              "SQL vs NoSQL — how do you decide?",
              "Explain CAP theorem with real examples",
            ],
          },
          {
            title: "Caching, Queues & Storage",
            time: "Week 3–4",
            content: `**Caching:** Browser cache, CDN, application cache (Redis/Memcached), database query cache. Strategies: cache-aside, write-through, write-behind. Invalidation is the hard part.

**Message queues:** Kafka (event streaming, high throughput), RabbitMQ (traditional message broker), SQS (managed). Use for: decoupling services, async processing, event sourcing.

**Storage:** Block (EBS), object (S3), file (EFS). Blob storage for images/videos. Choose based on access pattern.`,
            resources: ["DDIA chapters 5-6", "AWS Architecture Center"],
            questions: [
              "Design a caching strategy for a social media feed",
              "When would you use Kafka vs RabbitMQ?",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Design practice",
        time: "Week 5–10",
        color: "#f97316",
        topics: [
          {
            title: "Classic System Designs",
            time: "Week 5–8",
            content: `Practice these designs using the framework: Requirements → Estimation → High-level design → Deep dive → Bottlenecks.

**Must-practice designs:**
1. URL shortener (TinyURL) — hashing, base62 encoding, database sharding
2. Twitter/X feed — fan-out on write vs read, timeline service, caching
3. Chat system (WhatsApp) — WebSockets, message queues, presence service
4. YouTube — video upload pipeline, transcoding, CDN, recommendation
5. Instagram — photo storage, feed generation, stories, notifications
6. Uber/Ola — geospatial indexing (QuadTree/Geohash), matching, real-time tracking
7. Google Docs — operational transformation (OT) or CRDTs, WebSocket collaboration
8. Notification system — multi-channel (push/email/SMS), priority, dedup, rate limiting`,
            resources: [
              "System Design Interview (Alex Xu) Vol 1 & 2",
              "ByteByteGo: system-design-101 GitHub",
            ],
            questions: [
              "Design each system above in 45 minutes",
              "Identify the single biggest bottleneck in your design",
            ],
          },
          {
            title: "Distributed Systems Concepts",
            time: "Week 9–10",
            content: `Consensus (Raft, Paxos), consistent hashing, leader election, distributed transactions (2PC, Saga), event sourcing, CQRS, idempotency, circuit breakers, service mesh, observability (metrics, logs, traces).`,
            resources: [
              "DDIA chapters 7-12",
              "Martin Fowler: Microservices articles",
            ],
            questions: [
              "Explain consistent hashing with virtual nodes",
              "Design a distributed lock service",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — Principal-level thinking",
        time: "Week 11–16",
        color: "#ea580c",
        topics: [
          {
            title: "Organizational & Cost Design",
            time: "Week 11–16",
            content: `At the engineering head level, system design isn't just technical — it's organizational. Team topology (platform teams, stream-aligned teams), build vs buy decisions, cost optimization (FinOps), migration strategies (strangler fig pattern), technical debt quantification, SLAs/SLOs/SLIs, incident management, on-call design, capacity planning.`,
            resources: [
              "Team Topologies (book)",
              "Google SRE book (free online)",
            ],
            questions: [
              "How would you migrate a monolith to microservices without downtime?",
              "Design the org structure for a 100-engineer platform team",
            ],
          },
        ],
      },
    ],
  },

  r3f: {
    title: "React Three Fiber & 3D Web",
    subtitle: "From first cube to premium creative development",
    timeline: "12–16 weeks to intermediate, ongoing to expert",
    phases: [
      {
        name: "Phase 1 — 3D fundamentals",
        time: "Week 1–4",
        color: "#34d399",
        topics: [
          {
            title: "Scene, Mesh, Lights, Camera",
            time: "Week 1",
            content: `Canvas creates renderer + scene + camera. Mesh = geometry + material. Lights illuminate. OrbitControls let you navigate. Every Three.js class maps to a camelCase JSX element.

\`\`\`jsx
<Canvas camera={{ position: [3, 3, 5], fov: 50 }}>
  <ambientLight intensity={0.4} />
  <directionalLight position={[5, 8, 5]} />
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
  <OrbitControls />
</Canvas>
\`\`\``,
            resources: [
              "docs.pmnd.rs/react-three-fiber",
              "Three.js Journey by Bruno Simon",
            ],
            questions: [
              "What does each boxGeometry arg control?",
              "Why does meshBasicMaterial ignore lights?",
            ],
          },
          {
            title: "useFrame, useRef & Animation",
            time: "Week 2",
            content: `useRef for per-frame mutation (rotation, position). useState for user-driven changes (color, visibility). useFrame runs every frame (~60fps). Never setState inside useFrame.

\`\`\`jsx
function Spinner() {
  const ref = useRef()
  useFrame((_, delta) => { ref.current.rotation.y += delta })
  return <mesh ref={ref}><boxGeometry /><meshStandardMaterial /></mesh>
}
\`\`\``,
            resources: ["R3F docs: useFrame", "Wawa Sensei YouTube"],
            questions: [
              "What happens if you use useState inside useFrame?",
              "What is delta and why use it?",
            ],
          },
          {
            title: "Loading Models & Textures",
            time: "Week 3–4",
            content: `useGLTF for 3D models (.glb), useTexture for images. Wrap in Suspense for loading fallback. Use gltf.pmnd.rs to auto-generate React components from .glb files.`,
            resources: ["Drei docs: useGLTF", "gltf.pmnd.rs"],
            questions: [
              "How does Suspense work with asset loading in R3F?",
              "What is Draco compression?",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Creative skills",
        time: "Week 5–10",
        color: "#10b981",
        topics: [
          {
            title: "Shaders (GLSL)",
            time: "Week 5–7",
            content: `Vertex shader: controls position of each vertex. Fragment shader: controls color of each pixel. Uniforms pass data from JS. Varyings pass data from vertex to fragment.

Start with thebookofshaders.com (chapters 1–7), then Shadertoy, then shaderMaterial in R3F.`,
            resources: ["thebookofshaders.com", "Shadertoy.com"],
            questions: [
              "Write a shader that creates a gradient based on UV coordinates",
              "What is a uniform vs varying?",
            ],
          },
          {
            title: "GSAP + Physics + Post-processing",
            time: "Week 8–10",
            content: `GSAP for timeline-based animation on Three.js refs. @react-three/rapier for physics. @react-three/postprocessing for bloom, vignette, SSAO.

Build: scroll-driven 3D story, physics playground, product viewer with post-processing.`,
            resources: ["gsap.com", "Rapier docs", "pmndrs/postprocessing"],
            questions: [
              "Animate a Three.js ref with GSAP",
              "When to use GSAP vs useFrame for animation?",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — Expert level",
        time: "Week 11–16+",
        color: "#059669",
        topics: [
          {
            title: "Advanced: Particles, Portals, Performance",
            time: "Week 11–16",
            content: `Buffer geometry particle systems, render targets (scene-to-texture), instanced meshes (10k+ objects), custom materials with lighting, WebXR with @react-three/xr. Blender pipeline: model → export .glb → gltf.pmnd.rs → R3F component.

**Earning:** Product configurators, interactive portfolios, creative agency work, selling templates, courses. R3F developers charge $50–$150/hr internationally.`,
            resources: [
              "Three.js Journey advanced sections",
              "Codrops R3F tutorials",
            ],
            questions: [
              "Build a portal effect with render targets",
              "Optimize a scene from 15fps to 60fps",
            ],
          },
        ],
      },
    ],
  },

  ai: {
    title: "AI & Machine Learning",
    subtitle: "From fundamentals to building production AI systems",
    timeline: "16–24 weeks",
    phases: [
      {
        name: "Phase 1 — Foundations",
        time: "Week 1–6",
        color: "#fbbf24",
        topics: [
          {
            title: "Python, Math & ML Basics",
            time: "Week 1–3",
            content: `**Python:** NumPy, Pandas, Matplotlib — your data manipulation toolkit. If you know JS, Python syntax is easy; the ecosystem is the learning curve.

**Math you need:** Linear algebra (vectors, matrices, dot product — 3Blue1Brown Essence series), calculus (derivatives, chain rule — for understanding backprop), probability (Bayes' theorem, distributions), statistics (mean, variance, hypothesis testing).

**ML fundamentals:** Supervised (labeled data → prediction) vs unsupervised (find patterns). Regression (predict number) vs classification (predict category). Train/validation/test split. Overfitting vs underfitting. Bias-variance tradeoff.`,
            resources: [
              "Andrew Ng: Machine Learning Specialization (Coursera)",
              "3Blue1Brown: Neural Networks series",
            ],
            questions: [
              "Explain bias-variance tradeoff to a non-technical person",
              "What is gradient descent?",
            ],
          },
          {
            title: "Core ML Algorithms",
            time: "Week 4–6",
            content: `**Know these well:**
- Linear/Logistic Regression — the baseline for everything
- Decision Trees & Random Forests — interpretable, good for tabular data
- SVMs — maximum margin classifiers
- K-Means, DBSCAN — clustering
- PCA — dimensionality reduction
- KNN — simplest classifier

**Evaluation:** Accuracy, precision, recall, F1, AUC-ROC, confusion matrix. Know when accuracy is misleading (imbalanced datasets).

Use scikit-learn for all of these. Build, train, evaluate on real datasets from Kaggle.`,
            resources: ["scikit-learn docs", "Kaggle Learn: Intro to ML"],
            questions: [
              "When would Random Forest beat a neural network?",
              "Explain precision vs recall with a medical diagnosis example",
            ],
          },
        ],
      },
      {
        name: "Phase 2 — Deep Learning",
        time: "Week 7–14",
        color: "#f59e0b",
        topics: [
          {
            title: "Neural Networks & PyTorch",
            time: "Week 7–9",
            content: `A neural network is layers of neurons: input → hidden layers → output. Each neuron: weighted sum → activation function → output. Training: forward pass → loss → backpropagation → update weights.

**PyTorch:** Define model as a class, training loop (zero_grad → forward → loss → backward → step). Understand tensors, autograd, DataLoader.

\`\`\`python
import torch.nn as nn

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)
\`\`\``,
            resources: [
              "Fast.ai Practical Deep Learning (free course)",
              "PyTorch docs: 60-minute blitz",
            ],
            questions: [
              "Implement a simple neural network from scratch (no frameworks)",
              "What is vanishing gradient and how do ReLU and residual connections help?",
            ],
          },
          {
            title: "CNNs, RNNs & Transformers",
            time: "Week 10–14",
            content: `**CNNs** (Convolutional Neural Networks): for images. Convolution layers detect features (edges → shapes → objects). Know: conv layers, pooling, ResNet, transfer learning.

**RNNs/LSTMs:** for sequences (text, time series). Mostly replaced by Transformers now.

**Transformers:** The architecture behind GPT, BERT, and all modern AI. Self-attention mechanism: every token attends to every other token. Know: attention mechanism, positional encoding, encoder-decoder architecture.

\`\`\`
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V
\`\`\`

This single equation is the foundation of modern AI.`,
            resources: [
              "Attention Is All You Need (paper)",
              "3Blue1Brown: Transformers",
              "Andrej Karpathy: Let's build GPT (YouTube)",
            ],
            questions: [
              "Explain self-attention to a 10-year-old",
              "Why did Transformers replace RNNs?",
            ],
          },
        ],
      },
      {
        name: "Phase 3 — LLMs & Production AI",
        time: "Week 15–24",
        color: "#d97706",
        topics: [
          {
            title: "LLM Applications & RAG",
            time: "Week 15–18",
            content: `**Prompt engineering:** System prompts, few-shot examples, chain-of-thought, structured output. **RAG (Retrieval-Augmented Generation):** Embed documents → vector DB (Pinecone, Weaviate, pgvector) → retrieve relevant chunks → feed to LLM. **Fine-tuning:** LoRA, QLoRA for efficient model adaptation. **Agents:** LLM + tools (function calling) + memory + planning.`,
            resources: [
              "Anthropic docs: prompt engineering",
              "LangChain docs",
              "LlamaIndex docs",
            ],
            questions: [
              "Design a RAG system for a company knowledge base",
              "When to use RAG vs fine-tuning?",
            ],
          },
          {
            title: "MLOps & Production Systems",
            time: "Week 19–24",
            content: `**Deployment:** Model serving (FastAPI, TorchServe, vLLM), containerization (Docker), orchestration (Kubernetes). **MLOps:** Experiment tracking (MLflow, W&B), data versioning (DVC), model registry, A/B testing, monitoring model drift, CI/CD for ML pipelines.

**Evaluation:** BLEU, ROUGE for text generation. Human evaluation frameworks. Guardrails for LLM safety. Cost optimization (caching, batching, model distillation).

**Ethics:** Bias in training data, fairness metrics, responsible disclosure, red teaming.`,
            resources: [
              "Made With ML (MLOps course)",
              "Chip Huyen: Designing ML Systems (book)",
            ],
            questions: [
              "Design an ML pipeline from data ingestion to production serving",
              "How would you detect and handle model drift?",
            ],
          },
        ],
      },
    ],
  },
};

/* ─── STYLES ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #1a1a24;
  --bg-card: #13131d;
  --bg-hover: #1e1e2a;
  --text-primary: #e8e6f0;
  --text-secondary: #9896a8;
  --text-tertiary: #5f5d6e;
  --border: #2a2a38;
  --border-hover: #3a3a4c;
  --accent-purple: #a78bfa;
  --accent-blue: #60a5fa;
  --accent-teal: #2dd4bf;
  --accent-pink: #f472b6;
  --accent-amber: #fbbf24;
  --accent-green: #34d399;
  --accent-orange: #fb923c;
  --accent-red: #f87171;
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius: 10px;
  --radius-lg: 14px;
}

* { margin:0; padding:0; box-sizing:border-box; }
html { font-size: 15px; }
body, #root { background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); min-height: 100vh; }

.app { display: flex; min-height: 100vh; }

/* ─── SIDEBAR ─── */
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 100;
  transition: transform 0.3s ease;
}
.sidebar-brand {
  padding: 0 1.25rem 1.25rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.75rem;
}
.sidebar-brand h1 {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-purple);
}
.sidebar-brand p {
  font-size: 0.7rem;
  color: var(--text-tertiary);
  margin-top: 4px;
  letter-spacing: 0.04em;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 1.25rem;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 400;
  transition: all 0.15s;
  border-left: 2px solid transparent;
}
.nav-item:hover { background: var(--bg-hover); color: var(--text-primary); }
.nav-item.active {
  background: var(--bg-hover);
  color: var(--text-primary);
  font-weight: 500;
  border-left-color: var(--accent-purple);
}
.nav-icon { font-size: 1rem; width: 20px; text-align: center; }

/* ─── MAIN ─── */
.main { margin-left: 220px; flex: 1; min-height: 100vh; }
.content { max-width: 840px; margin: 0 auto; padding: 2.5rem 2rem 4rem; }

/* ─── HOME ─── */
.home-hero {
  padding: 3rem 0 2rem;
}
.home-hero h1 {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.home-hero h1 span { color: var(--accent-purple); }
.home-hero p {
  margin-top: 1rem;
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
}
.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 2rem;
}
.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.section-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  background: var(--bg-hover);
}
.section-card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  display: block;
}
.section-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.section-card p {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
.section-card .timeline-tag {
  margin-top: 0.75rem;
  display: inline-block;
  font-size: 0.68rem;
  padding: 3px 10px;
  border-radius: 99px;
  font-family: var(--font-mono);
  font-weight: 500;
}

/* ─── TOPIC PAGE ─── */
.topic-header {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
}
.topic-header h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.topic-header .sub {
  color: var(--text-secondary);
  font-size: 0.92rem;
  margin-top: 0.4rem;
  line-height: 1.6;
}
.topic-header .timeline {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  padding: 4px 14px;
  border-radius: 99px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

/* ─── PHASE ─── */
.phase {
  margin-bottom: 2.5rem;
}
.phase-hdr {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0.6rem 0;
  user-select: none;
}
.phase-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.phase-name {
  font-size: 1.05rem;
  font-weight: 600;
}
.phase-time {
  margin-left: auto;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-tertiary);
}
.phase-arrow {
  font-size: 0.7rem;
  color: var(--text-tertiary);
  transition: transform 0.2s;
}
.phase-arrow.open { transform: rotate(90deg); }

/* ─── TOPIC CARD ─── */
.topic-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin: 0.75rem 0 0.75rem 20px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.topic-card:hover { border-color: var(--border-hover); }
.topic-card-hdr {
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
.topic-card-hdr h3 {
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;
}
.topic-time {
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--text-tertiary);
  white-space: nowrap;
}
.topic-toggle {
  font-size: 0.65rem;
  color: var(--text-tertiary);
  transition: transform 0.2s;
}
.topic-toggle.open { transform: rotate(90deg); }
.topic-body {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
}
.topic-content {
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-top: 1rem;
}
.topic-content strong { color: var(--text-primary); font-weight: 500; }
.topic-content code {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  background: var(--bg-tertiary);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--accent-purple);
}
.topic-content pre {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  margin: 0.75rem 0;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.65;
  color: var(--text-primary);
}
.topic-content pre code {
  background: none;
  padding: 0;
  color: inherit;
}

/* ─── RESOURCES & QUESTIONS ─── */
.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin: 1.25rem 0 0.5rem;
}
.resource-list, .question-list {
  list-style: none;
}
.resource-list li, .question-list li {
  font-size: 0.82rem;
  color: var(--text-secondary);
  padding: 4px 0;
  padding-left: 16px;
  position: relative;
  line-height: 1.6;
}
.resource-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent-teal);
}
.question-list li::before {
  content: "?";
  position: absolute;
  left: 0;
  color: var(--accent-amber);
  font-weight: 700;
  font-family: var(--font-mono);
}

/* ─── MOBILE ─── */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  z-index: 200;
  align-items: center;
  padding: 0 1rem;
}
.hamburger {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 4px 8px;
}
.mobile-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-purple);
  margin-left: 10px;
}
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 99;
}
.overlay.show { display: block; }

@media (max-width: 768px) {
  .mobile-nav { display: flex; }
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .main { margin-left: 0; padding-top: 52px; }
  .content { padding: 1.5rem 1rem 3rem; }
  .home-hero h1 { font-size: 1.6rem; }
  .section-grid { grid-template-columns: 1fr; }
}
`;

/* ─── TOPIC CARD ─── */
function TopicCard({ topic }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="topic-card">
      <div className="topic-card-hdr" onClick={() => setOpen(!open)}>
        <span className={`topic-toggle ${open ? "open" : ""}`}>▶</span>
        <h3>{topic.title}</h3>
        <span className="topic-time">{topic.time}</span>
      </div>
      {open && (
        <div className="topic-body">
          <div className="topic-content">
            <FormatContent text={topic.content} />
          </div>
          {topic.resources && (
            <>
              <div className="section-label">Resources</div>
              <ul className="resource-list">
                {topic.resources.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {topic.questions && (
            <>
              <div className="section-label">Practice questions</div>
              <ul className="question-list">
                {topic.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── TOPIC PAGE ─── */
function TopicPage({ id }) {
  const data = CONTENT[id];

  const [openPhases, setOpenPhases] = useState(() => {
    if (!data) return {};
    const m = {};
    data.phases.forEach((_, i) => (m[i] = true));
    return m;
  });

  const togglePhase = (i) => setOpenPhases((p) => ({ ...p, [i]: !p[i] }));

  if (!data) {
    return (
      <div className="content">
        <p>Coming soon.</p>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="topic-header">
        <h1>{data.title}</h1>
        <p className="sub">{data.subtitle}</p>
        <span className="timeline">{data.timeline}</span>
      </div>

      {data.phases.map((phase, pi) => (
        <div className="phase" key={pi}>
          <div className="phase-hdr" onClick={() => togglePhase(pi)}>
            <span className={`phase-arrow ${openPhases[pi] ? "open" : ""}`}>
              ▶
            </span>
            <span className="phase-dot" style={{ background: phase.color }} />
            <span className="phase-name">{phase.name}</span>
            <span className="phase-time">{phase.time}</span>
          </div>

          {openPhases[pi] &&
            phase.topics.map((topic, ti) => (
              <TopicCard key={ti} topic={topic} />
            ))}
        </div>
      ))}
    </div>
  );
}

/* ─── HOME ─── */
const CARD_COLORS = {
  javascript: {
    bg: "#a78bfa15",
    border: "#a78bfa40",
    tag: "#a78bfa",
    text: "12–16 weeks",
  },
  typescript: {
    bg: "#38bdf815",
    border: "#38bdf840",
    tag: "#38bdf8",
    text: "8–10 weeks",
  },
  react: {
    bg: "#22d3ee15",
    border: "#22d3ee40",
    tag: "#22d3ee",
    text: "12–16 weeks",
  },
  reactnative: {
    bg: "#a78bfa15",
    border: "#a78bfa40",
    tag: "#a78bfa",
    text: "10–14 weeks",
  },
  dsa: {
    bg: "#f472b615",
    border: "#f472b640",
    tag: "#f472b6",
    text: "16–20 weeks",
  },
  systemdesign: {
    bg: "#fb923c15",
    border: "#fb923c40",
    tag: "#fb923c",
    text: "12–16 weeks",
  },
  r3f: {
    bg: "#34d39915",
    border: "#34d39940",
    tag: "#34d399",
    text: "12–16 weeks",
  },
  ai: {
    bg: "#fbbf2415",
    border: "#fbbf2440",
    tag: "#fbbf24",
    text: "16–24 weeks",
  },
};

const CARD_DESCS = {
  javascript: "Variables to V8 internals — the language that powers everything",
  typescript: "Type annotations to advanced generics and conditional types",
  react: "Components and hooks to server components and architecture at scale",
  reactnative:
    "Core components to production apps with Reanimated and native modules",
  dsa: "Arrays to dynamic programming — the interview and problem-solving backbone",
  systemdesign:
    "APIs and databases to distributed systems and org-level architecture",
  r3f: "First cube to shaders, physics, and premium creative development",
  ai: "ML basics to transformers, LLMs, RAG, and production MLOps",
};

function HomePage({ navigate }) {
  return (
    <div className="content">
      <div className="home-hero">
        <h1>
          Master the craft of
          <br />
          <span>engineering leadership</span>
        </h1>
        <p>
          A structured, deeply detailed learning system covering every skill
          from junior developer to engineering head. Every topic broken down to
          its simplest form with timelines, code examples, resources, and
          practice questions.
        </p>
      </div>
      <div className="section-grid">
        {Object.entries(SECTIONS)
          .filter(([k]) => k !== "home")
          .map(([key, sec]) => {
            const c = CARD_COLORS[key];
            return (
              <div
                key={key}
                className="section-card"
                style={{ borderColor: c.border, background: c.bg }}
                onClick={() => navigate(key)}
              >
                <span className="section-card-icon">{sec.icon}</span>
                <h3>{sec.label}</h3>
                <p>{CARD_DESCS[key]}</p>
                <span
                  className="timeline-tag"
                  style={{
                    background: c.tag + "18",
                    color: c.tag,
                    border: `1px solid ${c.tag}40`,
                  }}
                >
                  {c.text}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (p) => {
    setPage(p);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Mobile nav */}
        <div className="mobile-nav">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <span className="mobile-title">Engineering Mastery</span>
        </div>
        <div
          className={`overlay ${sidebarOpen ? "show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-brand">
            <h1>Engineering Mastery</h1>
            <p>Zero to engineering head</p>
          </div>
          {Object.entries(SECTIONS).map(([key, sec]) => (
            <div
              key={key}
              className={`nav-item ${page === key ? "active" : ""}`}
              onClick={() => navigate(key)}
            >
              <span className="nav-icon">{sec.icon}</span>
              {sec.label}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className="main">
          {page === "home" ? (
            <HomePage navigate={navigate} />
          ) : (
            <TopicPage id={page} />
          )}
        </main>
      </div>
    </>
  );
}

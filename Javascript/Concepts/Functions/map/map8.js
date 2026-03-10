// ⃣ Convert Users to JSX-like Structure

const users = ["Rahul", "Amit", "Neha"];

console.log(users.map((user) => <li key={user}>{user}</li>));

const users = [
  { id: 1, name: "Mandar" },
  { id: 2, name: "Rahul" },
];

users.map((user) => `<li key=${user.id}>${user.name}</li>`);

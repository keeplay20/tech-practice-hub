// Double the numbers
const numbers = [2, 4, 6, 8];

console.log("Double the numbers are : " + numbers.map((num) => num * 2));

// Extract only names
const users = [
  { id: 1, name: "Rahul", age: 25 },
  { id: 2, name: "Priya", age: 30 },
  { id: 3, name: "Amit", age: 28 },
];

console.log("The name of users are " + users.map((user) => user.name));



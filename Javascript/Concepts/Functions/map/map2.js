//  Create new array with fullname
const users = [
  { firstName: "Virat", lastName: "Kohli" },
  { firstName: "Rohit", lastName: "Sharma" },
];

console.log(users.map((user) => user.firstName + " " + user.lastName));

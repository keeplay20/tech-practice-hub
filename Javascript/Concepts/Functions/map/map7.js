//  Add index to each fruit
const fruits = ["apple", "banana", "mango"];

console.log(
  fruits.map((fruit, index) => ({
    id: index,
    name: fruit,
  })),
);

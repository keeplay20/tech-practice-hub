// Extract product titles

const products = [
  { id: 1, title: "Laptop", price: 50000 },
  { id: 2, title: "Phone", price: 20000 },
  { id: 3, title: "Tablet", price: 30000 },
];

console.log(products.map((product) => product.title));

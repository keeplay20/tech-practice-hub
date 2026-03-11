const products = [
  { id: 1, name: "Phone", price: 20000 },
  { id: 2, name: "Laptop", price: 80000 },
];

console.log(
  products.map((product) => ({
    label: product.name,
    value: product.id,
  })),
);

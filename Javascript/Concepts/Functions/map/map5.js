// Add 10% discounted price

const products = [
  { name: "Shoes", price: 2000 },
  { name: "Watch", price: 5000 },
];

console.log(
  products.map((product) => ({
    ...product,
    discountedPrice: product.price - (product.price * 10) / 100,
  })),
);

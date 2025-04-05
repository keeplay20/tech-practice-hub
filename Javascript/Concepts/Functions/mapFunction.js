const users = [
  { firstName: "Grill", lastName: "Sandwich", age: 28 },
  { firstName: "Ham", lastName: "Burger", age: 25 },
  { firstName: "Gulab", lastName: "Jamun", age: 32 },
];

const transformedData = users.map(
  (user) => `${user.firstName} ${user.lastName} (${user.age} years old)`
);

console.log(transformedData);

const products = [
  { name: "Laptop", price: 1200, inStock: true, details: { brand: "Dell" } },
  { name: "Phone", price: 800, inStock: false, details: { brand: "Samsung" } },
  { name: "Headphones", price: 100, inStock: true, details: { brand: "Sony" } },
];

const productDetails = products.map((product) => {
  return `${product.name} by ${product.details.brand} - $${product.price} ${
    product.inStock ? "✅" : "❌"
  }`;
});

console.log(productDetails);

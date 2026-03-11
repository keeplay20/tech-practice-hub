const categories = [
  {
    name: "Fruits",
    items: ["Apple", "Banana"],
  },
  {
    name: "Vegetables",
    items: ["Carrot", "Spinach"],
  },
];

console.log(
  categories.map((cat) => ({
    name: cat.name,
    items: cat.items.map((item) => item),
  })),
);

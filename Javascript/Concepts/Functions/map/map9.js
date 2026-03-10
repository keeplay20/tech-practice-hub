// Format orders

const orders = [
  { id: 1, amount: 200 },
  { id: 2, amount: 500 },
  { id: 3, amount: 1000 },
];

console.log(orders.map((order) => `Orders #${order.id} - ₹ ${order.amount}`));

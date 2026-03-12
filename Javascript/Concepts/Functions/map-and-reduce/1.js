const orders = [{ amount: 100 }, { amount: 200 }, { amount: 300 }];

const total = orders
  .map((order) => order.amount * 1.1)
  .reduce((sum, val) => sum + val, 0);

console.log(total);

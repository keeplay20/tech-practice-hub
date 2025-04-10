function getAllFactorsOfNum(num) {
  let factors = [];
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return `Factors of ${num} are ${factors}`;
}

console.log(getAllFactorsOfNum(4));
console.log(getAllFactorsOfNum(10));
console.log(getAllFactorsOfNum(15));
console.log(getAllFactorsOfNum(20));

const calculateBaseExponent = (base, exponent) => {
  let result = 1;
  for (let i = 1; i <= exponent; i++) {
    result *= base;
  }
  return `${base} raised to the power of ${exponent} is :- ${result}`;
};

console.log(calculateBaseExponent(2, 3)); // Output: 8
console.log(calculateBaseExponent(5, 4)); // Output: 625
console.log(calculateBaseExponent(10, 2)); // Output: 100
console.log(calculateBaseExponent(7, 0)); // Output: 1
console.log(calculateBaseExponent(3, 5)); // Output: 243

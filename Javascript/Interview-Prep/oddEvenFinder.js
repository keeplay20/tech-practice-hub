function oddEvenFinder(num) {
  return num % 2 === 0
    ? `The number ${num} is even`
    : `The number ${num} is odd`;
}

console.log(oddEvenFinder(102)); // Output: "The number is even"
console.log(oddEvenFinder(529)); // Output: "The number is odd"

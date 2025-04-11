// Write a function that calculates the average of set of numbers.
// Input : Positive array of numbers
// Output : Average of the numbers in the array

function getAvgOfNumbers(numbers) {
  console.log(numbers);
  const numLegth = numbers.length;
  let sum = 0;
  for (let i = 0; i < numLegth; i++) {
    sum = numbers[i] + sum;
  }
  const avg = sum / numLegth;
  return avg;
}

console.log(getAvgOfNumbers([1, 2, 3, 4, 5])); // Output: 3
console.log(getAvgOfNumbers([1, 2, 3, 4, 5, 6])); // Output: 3.5

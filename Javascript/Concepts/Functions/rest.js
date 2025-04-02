function sum(...numbers) {
  console.log(numbers); // [1, 2, 3, 4, 5]
  return numbers.reduce((sum, number) => sum + number, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

function isPrimeNumber(number) {
  if (number <= 1) return false;

  for (let i = 2; i * i <= number; i++) {
    if (number % i === 0) return false;
  }
  return true;
}

console.log(isPrimeNumber(5)); // true
console.log(isPrimeNumber(10)); // false
console.log(isPrimeNumber(1)); // false
console.log(isPrimeNumber(2)); // true
console.log(isPrimeNumber(97)); // true

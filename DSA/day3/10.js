// Check if the number is Prime or not.

let number = Number(prompt("Enter number : "));
let isPrime = true;

if (number <= 1) {
  isPrime = false;
}

for (let i = 2; i < number; i++) {
  if (number % i === 0) {
    isPrime = false;
    break;
  }
}

if (isPrime) {
  console.log(`The number ${number} is a prime number`);
} else {
  console.log(`The number ${number} is a not prime number`);
}

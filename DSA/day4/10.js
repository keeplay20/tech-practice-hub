// Check if the number is Prime or not.

let number = Number(prompt("Enter number : "));

let i = 2;
let isPrime = true;

if (number <= 1) {
  isPrime = false;
} else {
  while (i <= number - 1) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
    i++;
  }
}

if (isPrime) {
  console.log(`${number} is Prime`);
} else {
  console.log(`${number} is not Prime`);
}

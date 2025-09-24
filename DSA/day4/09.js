// Print the sum of all factors of a number (Ex: 50 -> 1 + 2 + 5 + 10 + 25 = 43)

let number = Number(prompt("Enter number : "));

let i = 1;
let factors = 0;
while (i <= number) {
  if (number % i === 0) {
    factors = factors + i;
  }
  i++;
}

console.log(factors);


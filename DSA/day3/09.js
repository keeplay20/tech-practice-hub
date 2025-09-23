//  Print the sum of all factors of a number (Ex: 50 -> 1 + 2 + 5 + 10 + 25 = 43)

let number = Number(prompt("Enter number : "));

let sum = 0;
for (let i = 1; i <= number / 2; i++) {
  if (number % i === 0) {
    sum = sum + i;
  }
}

console.log(sum);

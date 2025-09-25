// Sum of digits of a number (Ex: 936 = 18) 2, 1)

let number = Number(prompt("Enter number : "));

let digit = 0;
let sum = 0;
while (number > 0) {
  digit = number % 10;

  sum = sum + digit;

  number = Math.floor(number / 10);
}

console.log(sum);

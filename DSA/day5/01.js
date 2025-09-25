// Separate each digit of a number and print it on a new line (Ex - 123 -> OP: 3, 2, 1)

let number = Number(prompt("Enter number : "));

let copy = number;
let digit = 0;

while (number > 0) {
  digit = number % 10;
  console.log(digit);
  number = Math.floor(number / 10);
}







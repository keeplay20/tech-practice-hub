// Automorphic number (Ex: 5 = 25 = 625 = 390625, 6=36, 76 = 5776)

let num = Number(prompt("Enter number: "));

let numLen = num.toString().length; // number of digits in original
let sqNum = num * num; // square of number

// last 'numLen' digits of square
let sqDigit = sqNum % Math.pow(10, numLen);

if (sqDigit === num) {
  console.log("The number is an Automorphic number");
} else {
  console.log("The number is not an Automorphic number");
}

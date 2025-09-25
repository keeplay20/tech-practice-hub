// Accept a number and check if it is a palindromic number (If number and its reverse are equal, Ex: 12321 - Reverse - 12321)

let num = Number(prompt("Enter Number : "));

let copy = num;
let digit;

let revNum = 0;

while (num > 0) {
  digit = num % 10;
  revNum = revNum * 10 + digit;
  num = Math.floor(num / 10);
}

if (copy === revNum) {
  console.log("The number is a palindromic number");
} else {
  console.log("The number is not a palindromic number");
}

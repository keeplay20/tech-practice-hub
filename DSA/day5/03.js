// Accept a number and print its reverse

let num = Number(prompt("Enter Number : "));

let digit;

let revNum = 0;

while (num > 0) {
  digit = num % 10;
  revNum = revNum * 10 + digit;
  num = Math.floor(num / 10);
}

console.log(revNum);

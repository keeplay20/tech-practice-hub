// Accept a number and check if it is a strong number or not (Sum of factorial of each digit, Ex: 145 = 1! + 4! + 5! = 145)
let num = Number(prompt("Enter number : "));

let original = num;
let sum = 0;

while (num > 0) {
  let digit = num % 10;
  let fact = 1;
  for (let i = 1; i <= digit; i++) {
    fact = fact * i;
  }
  sum = sum + fact;
  num = Math.floor(num / 10);
}

if (sum === original) {
  console.log("Strong number");
} else {
  console.log("Not a strong number");
}

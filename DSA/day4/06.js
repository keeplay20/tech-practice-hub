// Factorial of a number

let number = Number(prompt("Enter number : "));

let i = 1;
let num = 1;
while (i <= number) {
  num = num * i;
  i++;
}

console.log(num);

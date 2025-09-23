// Factorial of a number

let num = Number(prompt("Enter number : "));

let fact = 1;
for (let i = 1; i <= num; i++) {
  fact = fact * i;
}
console.log(`The factorial of the number is : ${fact}`);

// Accept three numbers and print the greatest among them

let num1 = Number(prompt("Enter number 1 : "));
let num2 = Number(prompt("Enter number 2 : "));
let num3 = Number(prompt("Enter number 3 : "));

if (num1 >= num2 && num1 >= num3) {
  console.log(`${num1} is greatest among all`);
} else if (num2 >= num1 && num2 >= num3) {
  console.log(`${num2} is greatest among all`);
} else {
  console.log(`${num3} is greatest among all`);
}

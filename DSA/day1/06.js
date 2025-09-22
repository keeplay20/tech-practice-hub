// Accept two numbers from user and swap their values (Part 2 - Swap without using third variable)

let a = Number(prompt("Enter number a : "));
let b = Number(prompt("Enter number b : "));
console.log(`Inital value of a = ${a} & b = ${b}`);

a = a + b;
b = a - b;
a = a - b;

console.log(`Swapped value of a = ${a} & b = ${b}`);

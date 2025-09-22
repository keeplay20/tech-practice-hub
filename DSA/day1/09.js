// Accept the three sides of triangle and calculate the area using Heron's formula

// Area=s(s−a)(s−b)(s−c)

let a = Number(prompt("Enter side 1 of triangle : "));
let b = Number(prompt("Enter side 2 of triangle : "));
let c = Number(prompt("Enter side 3 of triangle : "));

let s = (a + b + c) / 2;

let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

console.log(`Area of triangle is : ${area}`);

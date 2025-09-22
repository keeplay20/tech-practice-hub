// Accept the parameters and calculate the Compound Interest & print it on STDOUT (Use Math class methods)

// CI=P×(1+R/100​)^T −P

let P = Number(prompt("Enter the Principal amount : "));
let R = Number(prompt("Enter the Rate of interest : "));
let T = Number(prompt("Enter the time duration : "));

let CI = P * Math.pow(1 + R / 100, T) - P;

console.log(`The compound interest is : ${CI}`);

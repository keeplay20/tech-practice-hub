// Make a choice based calculator using do while

let choice = Number(
  prompt("Enter choice : 1 for add or 2 for sub or 3 for mul or 4 for div :")
);

do {
  if (choice === 1) {
    let a = Number(prompt("Enter first number : "));
    let b = Number(prompt("Enter second number : "));
    console.log(`The sum of ${a} and ${b} is ${a + b}`);
  } else if (choice === 2) {
    let a = Number(prompt("Enter first number : "));
    let b = Number(prompt("Enter second number : "));
    console.log(`The difference of ${a} and ${b} is ${a - b}`);
  } else if (choice === 3) {
    let a = Number(prompt("Enter first number : "));
    let b = Number(prompt("Enter second number : "));
    console.log(`The product of ${a} and ${b} is ${a * b}`);
  } else if (choice === 4) {
    let a = Number(prompt("Enter first number : "));
    let b = Number(prompt("Enter second number : "));
    console.log(`The quotient of ${a} and ${b} is ${a / b}`);
  } else {
    console.log("Invalid choice");
  }
} while (choice !== 5);

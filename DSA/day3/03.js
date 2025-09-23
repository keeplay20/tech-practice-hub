// Print natural number up to n. Reverse for loop. Print n to 1.

let num = Number(prompt("Enter number : "));

if (num <= 0) {
  console.log("Not a natural number");
} else {
  console.log(`The natural numbers are`);
  for (let i = num; i >= 1; i--) {
    console.log(i);
  }
}

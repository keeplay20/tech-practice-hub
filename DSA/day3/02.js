// Print natural number up to n.

let num = Number(prompt("Enter number : "));

if (num <= 0) {
  console.log("Not a natural number");
} else {
  console.log(`The natural numbers are`);
  for (let i = 1; i <= num; i++) {
    console.log(i);
  }
}

// Accept an integer and check whether it is an even number or odd.

let num = Number(prompt("Enter number : "));

if (num % 2 === 0) {
  console.log("The number is even");
} else if (num % 2 !== 0) {
  console.log("The number is odd");
} else {
  console.log("Invalid number");
}

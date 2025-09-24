// Print the sum of all even & odd numbers in a range separately.

let number = Number(prompt("Enter number : "));

let i = 1;
let evenSum = 0;
let oddSum = 0;
while (i <= number) {
  if (i % 2 === 0) {
    evenSum = evenSum + i;
  } else {
    oddSum = oddSum + i;
  }
  i++;
}

console.log(evenSum + " " + oddSum);
